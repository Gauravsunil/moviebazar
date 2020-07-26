const express=require('express');
const users=express.Router();
const cors=require('cors');
const bcrypt=require('bcrypt');
const User=require('../models/User');
const Search=require('../models/Search');
users.use(cors());
process.env.SECRET_KEY='secret'
users.post('/register',(req,res)=>{
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
    }

    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash
                User.create(userData)
                .then(user=>{
                    res.json({
                        status:user.email+' registered!'
                    })
                })
                .catch(err=>{
                    res.send('error'+err);
                })
            })
        }else{
            res.json({
                error:'USER ALREADY EXISTS!'
            })
        }
    })
    .catch(err=>{
        res.send('error '+err);
    })
})

users.post('/search',(req,res)=>{

    const newSearch={
        movie:req.body.movie
    }

    Search.create(newSearch)
    .then((movie)=>{
        res.json({
            search:movie+" is searched"
        })
    }).catch((err)=>{
        res.send("error "+err)
    })
})


users.get('/profile',(req,res)=>{
    User.find({})
    .then(user=>{
        if(user){
            res.json(user);
        }else{
            res.send('USER DOESNT EXISTS!!');
        }
    }).catch(err=>{
        res.send('error: '+err);
    })
})

users.get('/search',(req,res)=>{
    Search.find({})
        .then(search=>{
            if(search){
                res.json(search);
            }else{
                res.send("NO SEARCHES EXISTS");
            }
        })
        .catch(err=>{
            res.send("ERROR "+err);
        })
})

module.exports=users