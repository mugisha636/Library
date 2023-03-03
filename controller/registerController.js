const modelUser = require('../models/userModel')


// get users

const getUsers= async(req,res)=>{
    
   try{
     const posts=await modelUser.find()
      res.json(posts)
   }
   catch(err){
      res.json({message:err})
   }
   
   }
// register user
const registerUser=async(req,res)=>{
  
   const post=new modelUser({
username:req.body.username,
email:req.body.email,
password:req.body.password,
status:req.body.status,
phone:req.body.phone

   })
   try{
  const savepost= await post.save()
   res.json(savepost)
   }
   catch(err){
    res.json({message:err})
   }
}



// get specific user
const oneUser=async(req,res)=>{
   try{
      const getone=await modelUser.findById(req.params.userId)
      res.json(getone) 

   }
   catch(err){
      res.json({message:err})
   }
   
}

// delete user

const deleteUser=async(req,res)=>{
   try{
  const removeUser=await modelUser.remove({_id:params.userId})
  res.send(removeUser)

   }
   catch(err){

      res.json({message:err})
   }
}


module.exports={registerUser,getUsers,oneUser,deleteUser}

// module.exports=deleteUser