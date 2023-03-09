const { number } = require('joi');
const mongoose=require('mongoose');
var renderSchema = new mongoose.Schema({
    render_id:{
        type:mongoose.Schema.Types.ObjectId
       },
    renderedTime: {
     type: String,
     allowNull:false
    },
    TimeToBorrow: {
      type: String
       
    },
    render:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book', required:true},

    
    
   
    
  }, 
  

  
  
  {timestamps: true});
  
  module.exports= mongoose.model('Render',renderSchema);