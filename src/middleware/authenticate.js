const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        req.token = token;
        next();
    } catch(err) {
        // res.status(200).send(err);
        next();
    }
}

module.exports = authenticate;