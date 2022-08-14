const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const agencyModel = require('../models/agencys');
let clientModel = require('../models/clients');


//Default route
router.get('/',(req,res)=>{
    res.send("Welcome");
});

//For getting the token
router.get('/token',(req,res)=>{
    var token = jwt.sign({userType:"admin"},'mysecretkey_mysecretkey_mysecretkey', {expiresIn:"12h"}
    );

    res.send(token)
});


//Create agency and client
router.post('/agency', authenticate, async (req, res) => {
    try {
        let agency = new agencyModel(req.body);
        let newAgency = await agency.save();
        let last_id = newAgency['_id']
        
        try{
            let client = new clientModel(req.body.client);
            await client.save();
            res.status(201).send("Added Successfully.");
        } catch(err){
            await agencyModel.findOneAndDelete({_id:last_id});
            res.status(400).send(err);
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

// Update Client Detail
router.patch('/agency/:id', authenticate, async(req,res)=>{
    try{
        let _id = req.params.id;
        var updateClient = await clientModel.findByIdAndUpdate(_id, req.body,{ new:true });
        res.sendStatus(200);
    }catch(err){
        res.status(404).send(err);
    }
})

//Get agency and client details
router.get('/agency', authenticate, async(req,res)=>{

    let agency = await clientModel.aggregate([
        { $group: 
            { _id: "$AgencyId", AgencyId_TotalCount: { $sum: 1 }, 
            sum_TotalBill:{
                $sum:{ "$toInt":"$TotalBill" }
            } 
            } 
        },
        { $sort: {AgencyId_TotalCount:-1, sum_TotalBill:-1} },
        {
            "$limit":1
        }
    ]);
    
    let agencyObj = agency[0];
    const agency_id = Object.values(agencyObj)[0];

    let result = await agencyModel.aggregate([
        { "$match": { "AgencyId": agency_id } },
        { $lookup:
            {
                from:'clients',
                localField:'AgencyId',
                foreignField:'AgencyId',
                as:'maxBill_client',

                "pipeline": [
                    { $sort: 
                        { TotalBill: -1 }
                    },
                    { $limit: 1 }
                ],
            }
        },
        { $project:
            {  _id:0, Name:1, "maxBill_client.Name":1, "maxBill_client.TotalBill":1 }
        },
    ]);

    res.send(result);
})

//For token authentication
function authenticate(req,res,next){
    let header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        let bearer = header.split(" ");
        let token = bearer[1];

        jwt.verify(token, 'mysecretkey_mysecretkey_mysecretkey', function(err, decoded){
            if (err) {
                res.status(401).send(err);
            } else {
                next();
            }
        });

    } else {
        res.sendStatus(401);
    }
}


module.exports = router;