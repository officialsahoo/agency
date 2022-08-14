const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
    AgencyId:{
        type:Number,
        required:true
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
        type:Number,
        required:true
    },
    TotalBill:{
        type:Number,
        required:true
    }
})

const Client = new mongoose.model('Client',clientSchema);
module.exports = Client;