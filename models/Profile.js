import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  links: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const workSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  gpa: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const linksSchema = new mongoose.Schema({
  github: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  resume: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  bio: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  },
  education: [educationSchema],
  skills: [{
    type: String,
    trim: true
  }],
  projects: [projectSchema],
  work: [workSchema],
  links: linksSchema
}, {
  timestamps: true
});

// Create indexes for better query performance
profileSchema.index({ 'skills': 1 });
profileSchema.index({ 'projects.skills': 1 });
profileSchema.index({ 'projects.title': 'text', 'projects.description': 'text' });

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema);
