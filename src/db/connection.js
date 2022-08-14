const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log("DB connection successful");
}).catch((e)=>{
    console.log(e)
    console.log("DB connection error!");
});