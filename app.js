const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
require('dotenv/config');


// importing routes

const registerRout=require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(registerRout)






if(mongoose.connect(process.env.DB_CONNECT)){
    console.log('database connected');
}

else{
    console.log('database error');
}


app.listen(8080,()=>{
    console.log('running on 8000');
})