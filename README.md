# Me-API Playground 🚀

A full-stack developer portfolio and API playground built with Next.js, MongoDB Atlas, and Tailwind CSS. This project demonstrates modern web development practices with a beautiful, responsive UI and comprehensive API endpoints.

## ✨ Features

- **Profile Management**: Complete CRUD operations for developer profiles
- **Project Showcase**: Display and filter projects by skills
- **Skills Analytics**: Visual representation of skill usage and frequency
- **Advanced Search**: Search across all profile data including projects, skills, and work experience
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Real-time API**: RESTful API endpoints with proper error handling
- **Database Integration**: MongoDB Atlas with optimized schemas and indexes

## 🏗️ Architecture

```
me-api-playground/
├── app/
│   ├── api/                    # API Routes
│   │   ├── health/            # Health check endpoint
│   │   ├── profile/           # Profile CRUD operations
│   │   ├── projects/          # Project filtering by skills
│   │   ├── skills/top/        # Top skills analytics
│   │   └── search/            # Global search functionality
│   ├── components/            # React Components
│   │   ├── Navigation.js      # Tab navigation
│   │   ├── Profile.js         # Profile display
│   │   ├── Projects.js        # Projects showcase
│   │   ├── Skills.js          # Skills analytics
│   │   └── Search.js          # Search interface
│   └── page.js               # Main application page
├── lib/
│   └── mongodb.js            # MongoDB connection utility
├── models/
│   └── Profile.js            # Mongoose schema and model
├── scripts/
│   └── seed.js              # Database seeding script
└── public/                  # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, MongoDB Atlas, Mongoose
- **Database**: MongoDB Atlas (Cloud-hosted)
- **Styling**: Tailwind CSS with custom gradients and animations
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/me-api-playground.git
cd me-api-playground
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster (free tier works fine)
3. Create a database user with read/write permissions
4. Get your connection string from the cluster

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/me-api-playground?retryWrites=true&w=majority
```

Replace with your actual MongoDB Atlas connection string.

### 5. Seed the Database

```bash
npm run seed
```

This will populate your database with sample profile data.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Me-API Playground is running successfully!"
}
```

#### Profile Operations

**Get Profile**
```http
GET /api/profile
```

**Create Profile**
```http
POST /api/profile
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your.email@example.com",
  "bio": "Your bio",
  "skills": ["JavaScript", "React", "Node.js"],
  "projects": [...],
  "work": [...],
  "education": [...],
  "links": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  }
}
```

**Update Profile**
```http
PUT /api/profile
Content-Type: application/json

{
  // Updated profile data
}
```

#### Projects

**Get All Projects**
```http
GET /api/projects
```

**Filter Projects by Skill**
```http
GET /api/projects?skill=React
```

#### Skills Analytics

**Get Top Skills**
```http
GET /api/skills/top
```

**Response:**
```json
{
  "topSkills": [
    { "skill": "React", "count": 5 },
    { "skill": "JavaScript", "count": 4 },
    { "skill": "Node.js", "count": 3 }
  ]
}
```

#### Search

**Global Search**
```http
GET /api/search?q=React
```

**Response:**
```json
{
  "profile": null,
  "projects": [...],
  "skills": [...],
  "work": [...]
}
```

## 🗄️ Database Schema

### Profile Collection

```javascript
{
  name: String (required),
  email: String (required, unique),
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
  },
  timestamps: true
}
```

### Indexes
- `skills`: For efficient skill-based queries
- `projects.skills`: For project filtering
- `projects.title, projects.description`: Text search index

## 🎨 Frontend Features

### Components

1. **Navigation**: Tab-based navigation between sections
2. **Profile**: Complete profile display with social links
3. **Projects**: Grid layout with skill filtering
4. **Skills**: Visual charts and analytics
5. **Search**: Real-time search with categorized results

### Design Highlights

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Glassmorphism effects and gradients
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Skeleton loaders and spinners

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
MONGODB_URI=your_production_mongodb_connection_string
```

## 📝 Sample cURL Commands

```bash
# Health check
curl http://localhost:3000/api/health

# Get profile
curl http://localhost:3000/api/profile

# Get projects filtered by skill
curl "http://localhost:3000/api/projects?skill=React"

# Get top skills
curl http://localhost:3000/api/skills/top

# Search for "React"
curl "http://localhost:3000/api/search?q=React"

# Create profile (POST)
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## 🧪 Testing

```bash
# Run the development server
npm run dev

# Test API endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/profile
```

## 📊 Performance Optimizations

- **Database Indexes**: Optimized for common queries
- **Connection Pooling**: Efficient MongoDB connections
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic component-level code splitting
- **Caching**: Browser and CDN caching strategies

## 🔧 Customization

### Update Profile Data

1. Modify `scripts/seed.js` with your information
2. Run `npm run seed` to update the database

### Styling

- Edit Tailwind classes in components
- Modify color schemes in `tailwind.config.js`
- Add custom CSS in `app/globals.css`

### API Endpoints

- Add new endpoints in `app/api/`
- Extend the Profile model in `models/Profile.js`
- Update frontend components to use new endpoints

## 🐛 Known Limitations

- Single profile per database (can be extended for multiple users)
- No authentication (can be added with NextAuth.js)
- No image upload (can be added with cloud storage)
- No real-time updates (can be added with WebSockets)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dinesh Jakhar**


