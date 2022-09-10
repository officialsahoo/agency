const bcrypt = require('bcryptjs');
const clientModel = require('../models/Client');


const signup = async(req,res)=>{
    try{
        let hashpass = await bcrypt.hash(req.body.Password,10);
        console.log(hashpass);

        let client = new clientModel({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: hashpass
        });

        const addclient = await client.save();
        if(addclient){
            res.status(200).render('signup',{msg : "Client Added Successfully. Login in continue", type:'success'})
        }

    }catch(err){
        console.log(err);
        res.status(201).render('signup',{msg:'An error occoured!', type:'danger'});
    }
}


const login = async (req,res)=>{
    try{
        let email = req.body.Email
        let password = req.body.Password
        let result = await clientModel.findOne({ Email:email });
        
        const isMatch = await bcrypt.compare(password, result.Password);

        if(isMatch){
            const token = await result.generateToken();
            res.cookie("jwt",token,{
                expires: new Date(Date.now()+600000) //1000=1sec
                    // httpOnly:true,
                    // secure:true //for production. Only https request will work
            });
            res.status(201).redirect('home');
        } else{
            res.status(400).render('login',{msg:'Email/Password does not match', type:'warning'});
        }
    } catch(err){
        res.status(400).render('login',{msg:'No client found!', type:'danger'});
    }
}



// login using promise and then
// const login = (req,res)=>{
//     let email = req.body.Email
//     let password = req.body.Password

//     clientModel.findOne({ Email:req.body.Email })
//     .then(client =>{
//         if(client){
//             bcrypt.compare(password, client.Password, function(err,result){
//                 if(err){
//                     res.json({
//                         error:err
//                     })
//                 }
//                 if(result){
//                     let token = jwt.sign({name:client.Name},process.env.SECRET_KEY,{expiresIn:'2h'})
//                     res.cookie("jwt",token,{
//                         expires: new Date(Date.now()+600000) //1000=1sec
//                         // httpOnly:true,
//                         // secure:true //for production. Only https request will work
//                     });
//                     res.redirect('/home');
//                     // res.json({ message:'Login Successfull',token })
//                 } else {
//                     res.render('login',{msg:'Email/Password does not match', type:'warning'});
//                     // res.json({message:'Password does not matched!'})
//                 }
//             })
//         } else {
//             res.render('login',{msg:'No client found!', type:'danger'});
//             // res.json({message:'No client found!'})
//         }
//     })

// }

module.exports = {
    signup, login
}