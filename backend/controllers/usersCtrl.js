const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require("bcryptjs");

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
};

module.exports = usersController;