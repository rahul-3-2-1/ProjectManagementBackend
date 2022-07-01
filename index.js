// const express = require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const app=require('./App');
const PORT=process.env.PORT;







mongoose.connect('mongodb://127.0.0.1:27017/project').then(()=>console.log("connected")).catch(err=>{
    console.log(err);
})
app.listen(PORT||5001,()=>console.log("server connected"));

















