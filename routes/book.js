const express =require ('express')
const regBook=require('../controller/bookController');





const book=express.Router()

book.post('/book', regBook.registerBook)
book.get('/listAll',regBook.getBooks)
book.get('/listAll/:bookId',regBook.oneBook)
book.delete('/delete/:bookId',regBook.deleteBook)



// rending book


book.post('/rend',regBook.registerRender)

module.exports= book