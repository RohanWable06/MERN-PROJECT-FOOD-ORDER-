const express=require('express')
const router=express.Router()

router.post("/foodData", (req,res)=>{
    try{
        res.status(200).send([global.food_items,global.food_category])
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
})

module.exports = router;