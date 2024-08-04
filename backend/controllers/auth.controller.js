import bcrypt from 'bcryptjs'
import User from "../models/user.model.js";
import generateToken from '../utils/generateToken.js';
export const login=async(req, res) => {
   try {
    const {username,password}=req.body;
    const user=await User.findOne({username})
    const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!user || !isPasswordCorrect){
         return res.status(401).json({error:"Invalid Username or Password"})
        }
        generateToken(user._id,res);
      return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })

   } catch (error) {
    console.log("Error in Login Controller",error.message);
   return res.status(500).json({error:"Internal Server Error"})
   }
  }
export const logout=(req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Looged Out Succesfully"})
        
        
    } catch (error) {
        console.log("Error in Logout Controller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
  }
export const signup=async(req, res) => {
    try {
        const {fullName,username,password,confirmPassword,gender,profilePic}=req.body;
    
        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords dont match"});

        }
        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists"});

        }
        // Hash Passord
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic
        })
    if(newUser)
      {    
        await newUser.save();
        //generate jwt token
        generateToken(newUser._id,res);

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic

        })
}
else{
    res.status(400).json({error:"Invalid User data"});

}
    } catch (error) {
        console.log("Error in Signup cxontroller",error.message);
        res.status(500).json({error:"Internal Server Error"})

    }
  }
