import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
     try
     {
        if(!fullName || !email || !password)
        {
            return res.status(400).json({message: "All fields are required"})
        }
        //password validation
        if(password.length < 6)
        {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        //email validation
        const user = await User.findOne({email});

        if(user)    return res.status(400).json({ message: "Email already exists"});

        //hash password using bcrypt.js it is like using md5(message digest 5)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        });

        if(newUser)
        {
            //generate json web token here
            generateToken(newUser._id, res)
            await newUser.save();

            //status code of 201 something new have been created
            res.sendStatus(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }
        else
        {
            res.status(400).json({message:"Invalid user data"});
        }
     }
     catch(error)
     {
        console.log("Error in singup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
     }
};
export const login = async (req, res) => {

    const { email, password } = req.body;
    try
    {
        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect)
        {
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json(
            {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic:user.profilePic,
            });
    }
    catch(error)
    {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
};
export const logout = (req, res) => {
    res.send("Logout route");
};