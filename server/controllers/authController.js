const User = require('../models/users.js'); //mongoose model
const jwt = require('jsonwebtoken');
const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(email => email.trim().toLowerCase()) || [];

//generate client token

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role, name: user.name, teamId: user.teamId}, process.env.JWT_SECRET,{
        expiresIn: '7d', 
    }); 
};

//registerUser takes in the name email and password and first cheks if the email is in allowedEmails then if the user already exists, and if it does not then create user
const registerUser = async (req, res) => {

    try {
        const {name, email, password, role, teamId} = req.body;
        if(!allowedEmails.includes(email.toLowerCase())){
            return res.status(403).json({message: 'Email is not authorized'});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({name, email, password, role, teamId});

        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                teamId: user.teamId,
                token: generateToken(user),
            }
        );
    }catch(err){
        console.error("Error in registerUser:", err);
        res.status(500).json({message: "Server error"})
    }
};

const loginUser = async(req, res) => {
        try{
            const{email, password} = req.body;

            if (!email || !password) {
                return res.status(401).json({ message: 'Please provide email or password' });
            }

            const user = await User.findOne({email});
            if(!user){
                return res.status(401).json({message: "Email is not found"});
            }

            if (user){
                const isMatch = await user.matchPassword(password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid Password' });
                  }
            }
            
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                teamId: user.teamId,
                token: generateToken(user),
              });

        }catch(err){
            res.status(500).json({message: "Server error"})

        }
}
module.exports = { registerUser, loginUser};