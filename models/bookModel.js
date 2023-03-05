const mongoose=require('mongoose');
var bookSchema = new mongoose.Schema({
    name: {
     type: String,
     allowNull:false
    },
    author: {
      type: String
       
    },
    publishedYear: {
      type:String,
      allowNull:false
    }
  }, 

  
  
  {timestamps: true});
  
  module.exports= mongoose.model('Book', bookSchema);