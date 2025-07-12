const mongoose = require('mongoose');
const { Types } = mongoose;

//this schema is used to log the complation of todos by users to be able to display graph on the app

const completionLogSchema = new mongoose.Schema(
  {
    todoId: {
      type: Types.ObjectId,
      ref: 'Todo',
      required: true
    },
    completedBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: String, // or Types.ObjectId if team is a separate collection
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('CompletionLog', completionLogSchema);
