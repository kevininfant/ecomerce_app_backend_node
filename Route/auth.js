const express = require('express');
const authRouter = express.Router();
const User = require('../Models/user.js');

authRouter.post("/api/signup",async(req,res)=>{
    const { name ,email,password} = req.body;
    const exitingUsers = await User.findOne({email});
    if (exitingUsers) {
        return res.status(400).json({msg:"Users with same email already exits!"})
        
    }
    let user = new User({
        name,
        email,
        password
      
    })
    user = await user.save();
    res.json(user);
 
});

module.exports = authRouter;