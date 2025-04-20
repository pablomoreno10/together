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
        default: null 
    },
    attending: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }], 
    createdAt: {
         type: Date, 
         default: Date.now 
        }
    },
    {
    timestamps: true

});

module.exports = mongoose.model('Event', eventSchema);
  