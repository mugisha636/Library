const bookModel=require('../models/bookModel')
const rendBook=require('../models/renderModel')
const mongoose=require('mongoose')
const renderModel = require('../models/renderModel')

// get users

const getBooks= async(req,res)=>{
    
    try{
      const bookFind=await bookModel.find()
      if(bookFind.length<1){
 
       return  res.status(200).json({message:'empty database'})
       }
       res.json(bookFind)
    }
    catch(err){
       res.json({message:err})
    }
    
    }


// register book
const registerBook = async (req, res) => {
    try {
       const data = req.body
      const existingBook = await bookModel.findOne({
        $or: [{name: data.name },{author:data.author}]
      }).exec();
  
      if (existingBook) {
        return res.status(409).json({ message: 'book already exists' });
      }
  
  
      const newBook = new bookModel({
         book_id:new mongoose.Types.ObjectId(),
        name: data.name,
        author: data.author,
        publishedYear: data.publishedYear,
       owner:req.body.owner
       
      
      });
  
      await newBook.save();
  
      return res.status(201).json({ message: 'book added' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  // get specific book
const oneBook=async(req,res)=>{
    try{
       const getOneBook=await bookModel.findById(req.params.bookId)
       if(getOneBook){
          return res.json(getOneBook) 
       }
       return res.json({message: "we don't have that book"}) 
 
    }
    catch(err){
       res.json({message:err.message})
    }
    
 }

 // delete user

const deleteBook=async(req,res)=>{
   
    bookModel.deleteOne({_id: req.params.bookId})
     .then(()=>{
        res.status(200).json({message:'book deleted'})
           })
     .catch(err=>{
        res.status(500).json({error:err})
     })
  
     }




   //  =================== render book controller==============


   // rendder register
const registerRender = async (req, res) => {
   try {
      const data = req.body
     const rendered = await renderModel.findOne({
       $or: [{render: data.render },{book: data.book }]
     }).exec();
 
     if (rendered) {
       return res.status(409).json({ message: 'book taken' });
     }
 
 
     const newRender = new renderModel({
      render_id:new mongoose.Types.ObjectId(),
        render:req.body.render,
        book: data.book,
        renderedTime: data.renderedTime,
        TimeToBorrow: data.TimeToBorrow,
      
      
     
     });
 
     await newRender.save();
 
     return res.status(201).json({ message: 'take book' });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error:error });
   }
 };




   //  ======================== end render======================

  module.exports = {registerBook,getBooks,oneBook,deleteBook,registerRender}