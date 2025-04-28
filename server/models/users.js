const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        maxlength: 10  
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@(rutgers\.edu|scarletmail\.rutgers\.edu)$/, 'Must be a valid Rutgers email'],
    }, 
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: 6
    },
    role: { 
        type: String, 
        enum: ['player', 'captain'], 
        default: 'player' 
    },
    teamId: { 
        type: String,
        required: true,
        default: 'mens-soccer',
        enum: ['mens-soccer'] //Will add more later on
    }
});

/*Logic for secure authentication, runs automatically before saving new user to DB
-hashes password using bcrypt before saving
*/

userSchema.pre('save', async function(next){
    try{
        if (!this.isModified('password')) 
            return next();
    const salt = await bcrypt.genSalt(10); //Salt and hash password
    this.password = await bcrypt.hash(this.password, salt);
    next(); //Save
  } catch(err) {
    next(err); //Pass errors to the next middleware
  }
});

//Compared entered password with hashed one in DB

userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);  //Compare entered password with stored hash
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  };

module.exports = mongoose.model('User', userSchema);