const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! User Registration

const usersController = {
    //! Register
    register:  asyncHandler(async(req, res)=>{
        const {username, email, password } = req.body;
        console.log(req.body);
        //! Validate
        if(!username || !email || !password){
            throw new Error("please all fields are required");
        }

        //! Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists) {
            throw new Error("User already exists");
        }

        //! Hash the user password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //! Create the user and save into DB
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        //! Send the response
        res.json({
            message: "Register",
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
        
        });
    }), 


    //!Login
    login: asyncHandler(async(req, res) => {
        //! Get the user data
        const {email,password} = req.body;
        //! if email is correct
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Invalid Login Credentials')
        }
        //!Compare the user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid Login Credentials')
        }
        //! Generate a token
        const token = jwt.sign({id: user._id}, 'mykeytest', {
            expiresIn: "30d",
        });
        //!Send the response
        res.json({
            message: "Login Success",
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })
    })
};

module.exports = usersController;