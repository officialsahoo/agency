const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended:true}));
router.use(express.json());

const authenticate = require('../middleware/authenticate');
// const clientController = require('../controllers/ClientController');


router.get('/home', authenticate, (req,res)=>{
    res.render('home');
});




module.exports = router;