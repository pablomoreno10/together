const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    },
    notes: { 
        type: String 
    },
    teamId: { 
        type: String, 
        required: true    },
    attending: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }], 
    createdAt: { // Automatically set the creation date, not a good idea to set this manually...
         type: Date, 
         default: Date.now 
        }
    },
    {
    timestamps: true

});

module.exports = mongoose.model('Event', eventSchema);
  