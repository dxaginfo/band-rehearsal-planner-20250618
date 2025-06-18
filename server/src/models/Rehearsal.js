const mongoose = require('mongoose');

const RehearsalSchema = new mongoose.Schema({
  bandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Band',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  location: {
    name: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    interval: {
      type: Number,
      default: 1
    },
    endDate: Date
  },
  setlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setlist'
  },
  attendees: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'declined', 'pending'],
      default: 'pending'
    },
    responseTime: Date,
    checkedIn: {
      type: Boolean,
      default: false
    },
    checkedInTime: Date
  }],
  notes: {
    type: String,
    trim: true
  },
  files: [{
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    type: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadTime: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Rehearsal', RehearsalSchema);
