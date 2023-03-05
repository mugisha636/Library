const modelUser = require('../models/userModel')
// const joi=require('joi')
const bcrypt = require('bcrypt');
const { post } = require('../routes/register');
const jwt=require('jsonwebtoken')
require('dotenv/config')

// get users

const getUsers= async(req,res)=>{
    
   try{
     const posts=await modelUser.find()
     if(posts.length<1){

      return  res.status(200).json({message:'empty database'})
      }
      res.json(posts)
   }
   catch(err){
      res.json({message:err})
   }
   
   }
// register user
const registerUser = async (req, res) => {
   try {
      const data = req.body
     const existingUser = await modelUser.findOne({
       $or: [{ email: data.email }, { phone: data.phone }]
     }).exec();
 
     if (existingUser) {
       return res.status(409).json({ message: 'email or mobile already exists' });
     }
 
     // check password validation
     if(data.password.length < 8 ){
      return res.status(400).json({message: 'Password must be 8 and above digit'})
     }
     const hashedPassword = await bcrypt.hash(data.password, 10);
 
     const newUser = new modelUser({
       username: data.username,
       email: data.email,
       status: data.status,
       phone: data.phone,
       password: hashedPassword
     });
 
     await newUser.save();
 
     return res.status(201).json({ message: 'user created' });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: error.message });
   }
 };
 



// login

const login=(req,res)=>{
   modelUser.find({email:req.body.email})
            .exec()
            .then(response=>{
               if (response.length < 1) {
                  return res.status(401).json({
                     message:"user doesn't exist"
                  })
               }
               bcrypt.compare(req.body.password,response[0].password,(_err,result)=>{
                     
                  if (!result) {
                   return res.status(401).json({
                      message:'password matching fail'
                   })
                   
                  }
                  if (result) {
                     const payload={
                        username:response[0].username,
                        phone:response[0].phone,
                        status:response[0].status,
                        email:response[0].email
                     }
                   const token=jwt.sign(payload, process.env.SECRET_KEY, {
                      expiresIn:'1h'
                   }
                   );
                   return res.status(200).json({
                      email: response[0].email,
                     //  username:response[0].username,
                     //  phone:response[0].phone,
                     //  status:response[0].status,
                      token:token
                   })
                  }
                   })
            })
            .catch(err=>{
               res.status(500).json({
                  error:err
               })
            })
}





// get specific user
const oneUser=async(req,res)=>{
   try{
      const getone=await modelUser.findById(req.params.userId)
      if(getone){
         return res.json(getone) 
      }
      return res.json({message: 'cteate that user'}) 

   }
   catch(err){
      res.json({message:err})
   }
   
}

// delete user

const deleteUser=async(req,res)=>{
   
  modelUser.deleteOne({_id: req.params.userId})
   .then(result=>{
      res.status(200).json({message:'user deleted'})
         })
   .catch(err=>{
      res.status(500).json({error:err})
   })

   }


   // update user

const updateUser=async(req,res)=>{
   
   modelUser.updateOne({_id: req.params.userId},
      {$set:{
         email:req.body.email,
         username:req.body.username,
         status:req.body.status,
         phone:req.body.phone
      }})
    .then(()=>{
 res.status(200).json({message:'user updated'})
    })
    .catch(err=>{
       console.log('err');
       res.status(500).json({error:err})
    })
 
    }
   




module.exports={registerUser,getUsers,oneUser,deleteUser,updateUser,login}
