const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body,validationResult }=require('express-validator')
const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecrete = "abcabcabcbabcabcb";
router.post("/createuser",
    [
        body('email',"Please enter valid email").isEmail(),
        body('name').isLength({ min:3 }),
        body('password','Password length should be morw than 5').isLength({ min:5 })
    ],
    async(req,resp)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return resp.status(400).json({errors: errors.array()})
        }


    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location
        })
        resp.json({success:true})
    }
    catch(error){
        console.log(error)
        resp.json({success:false})
    }
})



router.post("/loginuser",
    [
        body('email',"Please enter valid email").isEmail(),
        body('password','Incorrect Password').isLength({ min:5 })
    ],
    async(req,resp)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return resp.status(400).json({errors: errors.array()})
        }
    try{
        let email=req.body.email;
      let userData =  await User.findOne({email})
      if(!userData){
        return resp.status(400).json({error: "invalid Credentials"})
      }

      const pwdCompare= await bcrypt.compare(req.body.password,userData.password)
      if(!pwdCompare){
        return resp.status(400).json({error: "invalid Password"})
      }
      const data = {
        user:{
            id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecrete)
      return resp.status(200).json({success : true, authToken : authToken});

    }
    catch(error){
        resp.json({success:false})
    }
})


module.exports=router;
