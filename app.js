const express=require('express')
const app=express()
const mongoose=require('mongoose')
require('dotenv/config')

if(mongoose.connect(process.env.DB_CONNECT)){
    console.log('database connected');
}

else{
    console.log('database error');
}


app.listen(5000,()=>{
    console.log('running on 5000');
})