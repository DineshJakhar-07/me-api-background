import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Import Profile model
const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  avatar: String,
  education: [{
    institution: String,
    degree: String,
    field: String,
    duration: String,
    gpa: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    links: [String],
    skills: [String],
    image: String
  }],
  work: [{
    company: String,
    position: String,
    duration: String,
    description: String,
    skills: [String]
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String
  }
}, { timestamps: true }));

const sampleProfile = {
  name: "Dinesh Jakhar",
  email: "dineshjakhar182@gmil.com",
  bio: "Passionate Full-Stack Developer with expertise in building AI-powered platforms and dynamic web applications using modern technologies like Next.js, React, TypeScript, and Tailwind CSS. Experienced in integrating AI tools such as Gemini AI, GPT, and Cloudinary AI for voice, resume, and image-based applications. Skilled in full-stack development, real-time data handling with Firebase, secure authentication, serverless architectures, and cloud-based storage. Proven track record of delivering innovative, user-centric solutions in AI-powered interview, resume analysis, and image transformation platforms. Adept at designing scalable, responsive, and maintainable applications with a focus on performance, accessibility, and seamless user experience.",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  education: [
    {
      institution: "Manipal University Jaipur",
      degree: "Bachelor of Technology",
      field: "Information Technology",
      duration: "2022 - 2026",
      gpa: "8.3/10"
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", 
    "Firebase", "MongoDB", "Git", "REST APIs", "shadcn/ui",
    "Vapi Voice API", "Gemini AI", "Puter.js", "GPT", "Claude", 
    "OCR", "Clerk", "Cloudinary AI", "React Router", "Zustand"
  ],
  projects: [
    {
      title: "Prepwise",
      description: "AI-Powered Voice Interview Platform - Developed a full-stack AI voice interview platform with secure authentication, real-time data handling using Firebase, and dynamic routing powered by Next.js. Integrated Vapi Voice API to deliver lifelike mock interviews with real-time, personalized AI-generated voice questions. Built a natural language chat interface for generating domain-specific interview sessions on demand using Gemini AI. Designed an intelligent feedback system that analyzes user responses and provides targeted improvement tips.",
      links: ["https://github.com/yourusername/prepwise", "https://prepwise-demo.vercel.app"],
      skills: ["Next.js", "Tailwind CSS", "TypeScript", "Firebase", "Vapi Voice API", "Gemini AI", "shadcn/ui"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
    },
    {
      title: "Resumind",
      description: "AI Resume Analyzer - Built a full-stack AI-powered Resume Analyzer using React, React Router, and Zustand, integrating dynamic routing, state management, and modular components for scalable UI. Implemented cloud-based storage and authentication via Puter.js, enabling secure serverless file handling, real-time auth state, and GPT-driven resume analysis directly in the browser. Engineered an AI-enhanced resume scoring system that delivers ATS-matching feedback based on job listings using serverless LLMs (GPT, Claude) and OCR tools from Puter. Designed and deployed a responsive, mobile-friendly interface using Tailwind CSS and TypeScript, ensuring accessibility, reusability, and maintainable design across all devices.",
      links: ["https://github.com/yourusername/resumind", "https://resumind-demo.vercel.app"],
      skills: ["React", "React Router", "Puter.js", "TypeScript", "Tailwind CSS", "GPT", "Claude", "OCR"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop"
    },
    {
      title: "Imaginify",
      description: "AI-Powered Image Transformation Platform - Developed a full-stack platform enabling users to explore and create advanced AI-based image transformations within a community-driven interface. Implemented secure user authentication using Clerk, allowing users to access features like uploading, editing, and downloading enhanced images. Built five core AI-powered tools: Image Restore, Generative Fill, Object Removal, Object Recolor, and Background Removal. Integrated Cloudinary AI for image processing and optimization, with seamless upload, transformation, and storage workflows.",
      links: ["https://github.com/yourusername/imaginify", "https://imaginify-demo.vercel.app"],
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Clerk", "MongoDB", "Cloudinary AI"],
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop"
    }
  ],
  work: [],
  links: {
    github: "https://github.com/DineshJakhar-07",
    linkedin: "https://www.linkedin.com/in/dinesh-jakhar-0848a9291/",
    portfolio: "https://dinesh-portfolio.vercel.app",
    resume: "https://drive.google.com/file/d/1Gh8GEQd6urEkj4kxmKXcKKGh6jRYxMQb/view?usp=drive_link"
  }
};

async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing profiles
    await Profile.deleteMany({});
    
    // Create new profile
    const profile = new Profile(sampleProfile);
    await profile.save();
    
    console.log('✅ Database seeded successfully!');
    console.log('📊 Profile created with:');
    console.log(`   - Name: ${profile.name}`);
    console.log(`   - Email: ${profile.email}`);
    console.log(`   - Skills: ${profile.skills.length} skills`);
    console.log(`   - Projects: ${profile.projects.length} projects`);
    console.log(`   - Work Experience: ${profile.work.length} positions`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
