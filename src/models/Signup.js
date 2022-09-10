// const mongoose = require('mongoose');
// const validator = require('validator');

// let clinetSchema = new mongoose.Schema({
//     AgencyId:{
//         type:Number
//     },
//     Name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     Email:{
//         type:String,
//         required:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Invalid Email!");
//             }
//         }
//     },
//     PhoneNumber:{
//         type:Number
//     },
//     TotalBill:{
//         type:Number
//     },
//     Password:{
//         type:String,
//         required:true
//     }
// });

// const client = new mongoose.model('Client',clinetSchema);
// module.exports = client