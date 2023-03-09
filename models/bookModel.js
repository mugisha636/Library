const { number } = require('joi');
const mongoose=require('mongoose');
var bookSchema = new mongoose.Schema({
   book_id:{
    type:mongoose.Schema.Types.ObjectId
   },
    name: {
     type: String,
     allowNull:false
    },
    author: {
      type: String
       
    },
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    
    
    publishedYear: {
      type:String,
      allowNull:false
    },
    
  }, 
  

  
  
  {timestamps: true});
  
  module.exports= mongoose.model('Book', bookSchema);