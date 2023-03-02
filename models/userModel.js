const mongoose=require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: String,
    phone: String,
  }, 
  
  {timestamps: true});
  
  module.exports= mongoose.model('User', UserSchema);