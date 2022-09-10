const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('./db/connection');

let ejs = require('ejs');
app.set('view engine','ejs'); //app.locals.settings["view engine"];
// // app.set('views','./views');//Optional. Required in case views file name is different

const loginRoute = require('./routes/login');
app.use(loginRoute);

const signupRoute = require('./routes/signup');
app.use(signupRoute);

const homeRoute = require('./routes/home');
app.use(homeRoute);


// const agentRoute = require('./routes/agency');
// app.use(express.urlencoded({extended:false})); //Required for form data
// app.use(express.json());// Required if sending json data check by postman or render a different page by sending a json data

// app.use(agentRoute);



app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`${PORT} : Listening`);
})