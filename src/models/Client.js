const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const clientSchema = new mongoose.Schema({
    AgencyId:{
        type:String
    },
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!");
            }
        }
    },
    PhoneNumber:{
        type:Number
    },
    TotalBill:{
        type:Number
    },
    Password:{
        type:String,
        required:true
    }
});

clientSchema.methods.generateToken = async function(req,res){
    try{
        let ntoken = jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:'2h'});
        return ntoken;
    } catch(err){
        res.send(err);
    }
}


const Client = new mongoose.model('Client',clientSchema);
module.exports = Client;