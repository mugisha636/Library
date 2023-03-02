const modelUser = require('../models/userModel')

const registerCont=async(req,res)=>{
  
   const post=new modelUser({
username:req.body.username,
email:req.body.email,
password:req.body.password,
status:req.body.status,
phone:req.body.phone

   })
   post.save()
   .then((data)=>{
    res.json(data)
   })
   .catch((err)=>{
    res.json({message:err})
   })
}

module.exports=registerCont