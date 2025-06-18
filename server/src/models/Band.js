const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['leader', 'member', 'tech'],
      default: 'member'
    },
    instruments: [{
      type: String,
      trim: true
    }],
    joinDate: {
      type: Date,
      default: Date.now
    }
  }],
  settings: {
    defaultRehearsal: {
      duration: {
        type: Number,
        default: 120 // minutes
      },
      location: {
        type: String,
        default: ''
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Band', BandSchema);
