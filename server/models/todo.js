const mongoose = require('mongoose');
const { Types } = mongoose; //Types to access ObjectId

//To Do portion of the app schema

const toDoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: '',
    },
    completedBy: [{
      type: Types.ObjectId,
      ref: 'User',
    }],
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
    },
    teamId: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true, //createdAt & updatedAt
  }
);

module.exports = mongoose.model('Todo', toDoSchema);
