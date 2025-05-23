const UserModel = require('../model/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, please log in.',
                success: false
            });
        }
        // console.log('user type:',typeof User);
        // console.log('User keys:', Object.keys(User));
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        
        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Signup error:", err);  // Detailed error log
        res.status(500).json({
            message: "Internal server error during signup",
            success: false
        });
    }
};

// Login function
  const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(403).json({
                message: "Authentication failed: incorrect email or password",
                success: false
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Authentication failed: incorrect email or password",
                success: false
            });
        }

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({
                message: "Internal server error: missing server configuration",
                success: false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
        console.log(user.name);
    } catch (err) {
        console.error("Login error:", err);  // Detailed error log
        res.status(500).json({
            message: "Internal server error during login",
            success: false
        });
    }
}

module.exports = {
signup,
login
}