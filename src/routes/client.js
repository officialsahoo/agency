const express = require('express');
const router = express();
router.use(express.urlencoded({extended:true})); 
router.use(express.json());

const multer  = require('multer')
// const dest = multer({ dest: 'uploads/' })

const clientController = require('../controllers/ClientController');
const authenticate = require('../middleware/authenticate');


router.get('/client', authenticate, clientController.getclients);

router.get('/client/:id', authenticate, clientController.editclient);

router.post('/client', authenticate, clientController.updateclient);


// router.post('/client',(req,res,next)=>{
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, './uploads')
//         },
//         filename: function (req, file, cb) {
//             var temp_file_arr = file.originalname.split('.');
//             var temp_file_name = temp_file_arr[0];
//             var temp_ext_name = temp_file_arr[1];

//             cb(null, temp_file_name + '-' + Date.now() + '.' + temp_ext_name);
//         }
//       })
      
//       const upload = multer({ storage: storage }).single('Photo');

//       upload(req,res,function(err){
//         if(err){
//             return res.end('Error');
//         } else {
//             return res.end('Success');
//         }
//       })
// })

// 1.Upload using middleware start 
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, 'uploads')
//         },
//         filename: function (req, file, cb) {
//           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//           cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
//         }
//       })
// }).single("Photo");

// router.post('/client', upload, function (req, res) {
//     console.log(req.file, req.body)
// });
// 1.Upload using middleware end

module.exports = router;