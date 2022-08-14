const express = require('express');
const app = express();
const PORT = process.env.PORT || 3308;

const agentRoute = require('./routes/agency');
app.use(express.json());
app.use(agentRoute);

require('./db/connection');

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`${PORT} : Listening`);
})