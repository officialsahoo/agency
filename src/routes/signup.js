const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:true})); //Required for form data. If true then empty object will come along. Check the req.body in console for any post router for more info
router.use(express.json());

const authController = require('../controllers/AuthController');



//Routes Start
router.get('/signup',(req,res)=>{ res.render('signup'); });

router.post('/signup',authController.signup);
//Routes End


module.exports = router;