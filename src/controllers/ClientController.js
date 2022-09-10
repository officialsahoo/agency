
const clientModel = require('../models/Client');



const getclients = async (req,res)=>{
    try{
        const clientList = await clientModel.find({},{Password:0, __v:0 });
        res.render('dashboard',{List:clientList});
    }catch(err){
        res.send(err)
    }
}


module.exports={
    getclients
}