const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String
  },
  instruments: [{
    type: String,
    trim: true
  }],
  role: {
    type: String,
    enum: ['admin', 'member', 'tech'],
    default: 'member'
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  preferences: {
    notificationPreferences: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      reminderTiming: {
        type: Number,
        default: 24 // hours before event
      }
    },
    calendarSync: {
      google: {
        type: Boolean,
        default: false
      },
      apple: {
        type: Boolean,
        default: false
      }
    },
    displaySettings: {
      type: Map,
      of: String
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  
  if (!user.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
