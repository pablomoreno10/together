const User = require('../models/users.js'); //mongoose model
const jwt = require('jsonwebtoken');
const allowedEmails = require('../utils/allowedEmails.js'); 

//generate client token

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: '7d', //Let's hope 7 days is fine
    }); 
};

//registerUser takes in the name email and password and first cheks if the email is in allowedEmails then if the user already exists, and if it does not then create user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if(!allowedEmails.includes(email.toLowerCase())){
            return res.status(403).json({message: 'Email is not authorized'});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({name, email, password});

        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            }
        );
    }catch(err){
        res.status(500).json({message: "Server error"})
    }
};

module.exports = { registerUser};