import jwt from 'jsonwebtoken'
import { Userr } from '../Models/Userr.js';

export const Authenticate=async(req,res,next)=>{
    const token=req.header("Auth");
    console.log("this is token",token);

    if(!token) return res.status(400).json({message:"login first"})

    const decoded=jwt.verify(token,process.env.JWT_Secret);
    // console.log(decoded); 
    const id=decoded.userId;
    let user=await Userr.findById(id);

    if(!user) return res.json({message:"user not found"})
        req.user=user
    next()
}