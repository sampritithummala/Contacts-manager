const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    try{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({message: "All fields are mandatory"});
        //throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400).json({message: "user already registered"});
        //throw new Error("User already registered")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user} `);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400).json({message: "User data is not valid"});
        //throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
    }catch(err){
        res.status(200).json({error:err});
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({message: "All fields are mandatory"});
    }
    const user = await User.findOne({email});
    //compare password with hashed password
    if(user &&(await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken});
    } else{
        res.status(401).json({message:"Password is not valid"});
    }
    
}catch(err){
    res.status(200).json({error:err});
}
});

//@desc Current user information
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});


module.exports = { registerUser, loginUser , currentUser};