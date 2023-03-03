const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

exports.postAddUser= async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phonenumber;
        const data= await User.create({name:name, email:email, phonenumber:phonenumber})
        res.status(201).json({newUserDetail:data})
    }
    catch(err){
        res.status(500).json({
            error:err
        })
    }
    
    
}

exports.getUsers= async (req,res,next)=>{
    try{
        const users=await User.findAll();
        res.status(200).json({allUsers:users})
    }
    catch(error){
        console.log("Get user is failing",JSON.stringify(error));
        res.status(500).json({
            error:error
        })
    }
    
}

exports.deleteUser= async(req,res,next)=>{
    try{
        const uId=req.params.id;
        console.log(uId);
        await User.destroy({where:{id:uId}});
        
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}