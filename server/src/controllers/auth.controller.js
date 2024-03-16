
const User = require("../models/user.model")
const bcrypt = require('bcrypt'); 
const { generateTokenAndSetCookie } = require("../utils/generateToken");
const saltRounds = 10;

const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ fullName, email, password: hashedPassword });
        if (newUser) {
            await newUser.save();
            res.status(201).json(newUser)
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }

    } catch (error) {
        console.error(error, 'error');
        res.status(500).send('Internal Server Error');
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // If the user and password are valid

        // generate jwt token
        generateTokenAndSetCookie(email, res)


        res.status(201).json({ message: "Login successful", user:{
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        } });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Export the controller functions
module.exports = {
    signup,
    login
};