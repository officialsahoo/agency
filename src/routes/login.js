const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:true})); //Required for form data. If true then empty object will come along. Check the req.body in console for any post router for more info
router.use(express.json());

const AuthController = require('../controllers/AuthController');
const authenticate = require('../middleware/authenticate');

router.get('/',(req,res)=>{
    if(req.query.signup == 'Success'){
        res.render('login',{'cmsg': 'Signup Successfull. Login to continue'})
    } else {
        res.render('login');
    }
});

router.post('/',AuthController.login);

router.get('/logout',authenticate, (req,res)=>{
    try{
        res.clearCookie("jwt");
        // res.redirect('/');
        res.redirect('login',{msg:'You are logged out successfully', type:'success'});
    }catch(err){
        res.status(200).send(err);
    }
})

module.exports = router;