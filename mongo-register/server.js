const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();

const mongoose=require('mongoose');
const port=5000;
app.use(bodyParser.json());

app.use(cors());

const url='mongodb://localhost:27017/login';

mongoose.connect(url)
.then(()=>{
    console.log("CONNECTED TO THE SERVER");

})
.catch((err)=>console.log(err));

var Users=require('./routes/Users');

app.use('/users',Users);

app.listen(port,()=>{
    console.log('Server is running on :'+port);
});


