import { Userr } from "../Models/Userr.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
//register user
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (name == ' ' || email == ' ' || password == ' ') return res.status(400).json({ message: "all field are required" })
    let user = await Userr.findOne({ email })
    if (user) return res.json({ message: "user already exist" })

    const hashPass = await bcrypt.hash(password, 10)
    user = await Userr.create({
        name, email, password: hashPass,
    });
    res.json({ message: "user register succesfully", user })
}

//login user

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (email == ' ' || password == ' ') return res.status(400).json({ message: "all field are required" })
    const user = await Userr.findOne({ email });
    if (!user) return res.json({ message: "user not found" });

    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) return res.json({ message: "wrong password" })
    
    const token=jwt.sign({userId:user._id},process.env.JWT_Secret,{expiresIn:'1d'})
    res.json({ message: `welcome ${user.name}`,token });
}