
const clientModel = require('../models/Client');



const getclients = async (req,res)=>{
    try{
        const clientList = await clientModel.find({},{Password:0, __v:0 });
        res.render('clients',{List:clientList});
    }catch(err){
        res.send(err)
    }
}

const editclient = async(req,res)=>{
    try{
        let c_id = req.params.id;
        let client_details = await clientModel.findOne( {_id:c_id}, {Password:0} );
        res.render('editClient',{client_details}); 
    } catch(err){
        res.send(err);
    }
}

const updateclient = async(req,res)=>{
    try{

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, './uploads')
            },
            filename: function (req, file, cb) {
                var temp_file_arr = file.originalname.split('.');
                var temp_file_name = temp_file_arr[0];
                var temp_ext_name = temp_file_arr[1];
    
                cb(null, temp_file_name + '-' + Date.now() + '.' + temp_ext_name);
            }
          })
          
          const upload = multer({ storage: storage }).single('Photo');
    
          upload(req,res,function(err){
            if(err){
                return res.end('Error');
            } else {
                return res.end('Success');
            }
          })




          

        res.send(req.body);
        // let id = req.body.id;

        // let update = await clientModel.findByIdAndUpdate({_id:id},{Name:req.body.Name, PhoneNumber:req.body.PhoneNumber, TotalBill:req.body.TotalBill});
        // res.redirect('/client');
    }catch(err){
        res.send(err);
    }
}


module.exports={
    getclients, editclient, updateclient
}