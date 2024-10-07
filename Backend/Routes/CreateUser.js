const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body,validationResult }=require('express-validator')


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

    try{
        await User.create({
            name:req.body.name,
            password:req.body.password,
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
    async(req,resp)=>{
    try{
        let email=req.body.email;
      let userData =  await User.findOne({email})
      if(!userData){
        return resp.status(400).json({error: "invalid Credentials"})
      }

      if(req.body.password != userData.password){
        return resp.status(400).json({error: "invalid Password"})
      }
      return resp.status(200).send(userData);

    }
    catch(error){
        resp.json({success:false})
    }
})


module.exports=router;
