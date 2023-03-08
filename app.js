const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
require('dotenv/config');
const Database=require('./database/db')



// importing routes
const bookRoute=require('./routes/book')
const registerRout=require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(registerRout)
app.use(bookRoute)




const PORT = process.env.PORT ||4000;
Database.connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})



