const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const joi= require('joi')
var UserSchema = new mongoose.Schema({
    username: {
     type: String,
     allowNull:false
    },
    email: {
      type: String
       
    },
    password: {
      type:String,
      allowNull:false
    },
    status: String,
    phone: {
      type:String,
      allowNull:false
     
    },
  }, 

  
  
  {timestamps: true});
  
  module.exports= mongoose.model('User', UserSchema);