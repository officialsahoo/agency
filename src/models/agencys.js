const mongoose = require('mongoose');
const validator = require('validator');

// Agents Schema
const agencySchema = new mongoose.Schema({
    AgencyId:{
        type:Number,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Address1:{
        type:String,
        required:true
    },
    Address2:{
        type:String
    },
    State:{
        type:String,
        required:true,
        trim:true
    },
    City:{
        type:String,
        required:true,
        trim:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    }
})

const Agency = new mongoose.model('Agency',agencySchema);
module.exports = Agency;