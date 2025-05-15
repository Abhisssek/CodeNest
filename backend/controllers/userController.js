const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        if (!name || !userName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

    // performing validation
    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long"
        });
    }

    //check if password contains at least one uppercase letter, one lowercase letter, one number and one special character

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            name,
            userName,
            email,
            password: hashedPassword,
        
        });
        await user.save();



        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                
            }
        });
    } catch (error) {
        console.log("error in register controller")
        return res.status(500).json({          
            message: "Internal server error",
            error: error.message
        });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                
            }
        });
    }
    catch (error) {
        console.log("error in login controller")
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.log("error in logout controller")
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}