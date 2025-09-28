# 🚀 SnipCove - Developer Code Snippets Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

<div align="center">
  <h3>A community-driven platform for developers to save, share, and discover clean, reusable code snippets</h3>
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://snippet-cove.vercel.app)
  [![GitHub Stars](https://img.shields.io/github/stars/drockparashar/snippetCove?style=for-the-badge)](https://github.com/drockparashar/snippetCove)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📡 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [🔐 Authentication](#-authentication)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔥 Core Features

- **📝 Snippet Management**: Create, edit, and organize code snippets with syntax highlighting
- **🔍 Advanced Search**: Search snippets by title, tags, language, or content
- **⭐ Community Engagement**: Upvote/downvote system for quality content curation
- **💾 Personal Collections**: Save and organize favorite snippets
- **👥 User Profiles**: Comprehensive profiles with activity tracking and statistics

### 🌟 Advanced Features

- **📊 Analytics Dashboard**: Personal dashboard with detailed statistics and insights
- **🏷️ Smart Tagging**: Organize snippets with custom tags for easy discovery
- **📱 Responsive Design**: Fully responsive UI that works on all devices
- **🌙 Dark/Light Theme**: Built-in theme switcher with system preference detection
- **⚡ Real-time Updates**: Live updates for votes and interactions
- **🔒 Secure Authentication**: GitHub OAuth integration with JWT tokens

### 👤 Profile Features

- **📈 Activity Tracking**: Track snippet creation, upvotes, and community engagement
- **📊 Language Statistics**: Visual breakdown of programming languages used
- **🌟 Achievement System**: Display total upvotes, followers, and contribution metrics
- **🔗 Social Links**: Integration with GitHub, Twitter, and personal websites
- **📸 Custom Avatars**: Cloudinary-powered image uploads for profile pictures

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js 15    │    │   Express.js    │    │    MongoDB      │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│                 │    │                 │    │                 │
│ • React 19      │    │ • JWT Auth      │    │ • User Model    │
│ • TypeScript    │    │ • GitHub OAuth  │    │ • Snippet Model │
│ • Tailwind CSS  │    │ • Rate Limiting │    │ • Relationships │
│ • Shadcn/ui     │    │ • Validation    │    │ • Indexing      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloudinary    │    │   Vercel        │    │   Render        │
│   Image Storage │    │   Frontend      │    │   Backend       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📁 Project Structure

```
snippetCove/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router (Next.js 13+)
│   │   │   ├── (auth)/       # Auth route group
│   │   │   ├── dashboard/    # User dashboard
│   │   │   ├── snippets/     # Snippet pages
│   │   │   ├── submit/       # Snippet submission
│   │   │   └── users/        # User profiles
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/          # Shadcn/ui components
│   │   │   ├── profile/     # Profile components
│   │   │   └── public-profile/ # Public profile views
│   │   ├── lib/             # Utilities and configurations
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
└── server/                   # Express.js Backend
    ├── controllers/         # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API endpoints
    ├── middlewares/        # Custom middleware
    └── config/             # Database configuration
```

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + Shadcn/ui components
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations
- **Deployment**: Vercel

### Backend

- **Runtime**: Node.js with Express.js 5
- **Language**: JavaScript (ES6+ modules)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Passport.js (GitHub OAuth)
- **File Upload**: Multer + Cloudinary
- **Security**: bcryptjs, express-rate-limit, sanitize-html
- **Deployment**: Render

### Key Libraries & Tools

#### Frontend Dependencies

```json
{
  "@radix-ui/react-*": "Latest", // Accessible UI primitives
  "@vercel/analytics": "^1.5.0", // Analytics tracking
  "react-syntax-highlighter": "^15.6.1", // Code highlighting
  "react-hot-toast": "^2.5.2", // Toast notifications
  "next-themes": "^0.4.6", // Theme management
  "class-variance-authority": "^0.7.1" // Component variants
}
```

#### Backend Dependencies

```json
{
  "mongoose": "^8.15.0", // MongoDB ODM
  "jsonwebtoken": "^9.0.2", // JWT authentication
  "passport-github2": "^0.1.12", // GitHub OAuth
  "cloudinary": "^2.7.0", // Image management
  "express-validator": "^7.2.1", // Input validation
  "express-rate-limit": "^7.5.0" // Rate limiting
}
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or cloud)
- GitHub OAuth App credentials
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/drockparashar/snippetCove.git
cd snippetCove
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/snippetcove

# JWT
JWT_SECRET=your_super_secret_jwt_key

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Server Port
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env.local` file in client directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📡 API Documentation

### Authentication Endpoints

```http
POST   /api/auth/signup              # User registration
POST   /api/auth/login               # User login
GET    /api/auth/me                  # Get current user
GET    /api/auth/github              # GitHub OAuth login
GET    /api/auth/github/callback     # GitHub OAuth callback
GET    /api/auth/check               # Check auth status
POST   /api/auth/save-snippet        # Save snippet to user
POST   /api/auth/unsave-snippet      # Remove saved snippet
PUT    /api/auth/update-profile      # Update user profile
```

### Snippet Endpoints

```http
GET    /api/snippets                 # Get all snippets (paginated)
POST   /api/snippets                 # Create new snippet (auth required)
GET    /api/snippets/:id             # Get snippet by ID
GET    /api/snippets/search?q=query  # Search snippets
GET    /api/snippets/user/:id/upvotes # Get user's total upvotes
POST   /api/snippets/upvote          # Upvote a snippet
POST   /api/snippets/upvote/remove   # Remove upvote
```

### User Endpoints

```http
GET    /api/users/id/:id             # Get user profile by ID
POST   /api/users/follow             # Follow a user
POST   /api/users/unfollow           # Unfollow a user
POST   /api/users/upload             # Upload avatar
```

### Request/Response Examples

#### Create Snippet

```http
POST /api/snippets
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "React useEffect Hook",
  "code": "useEffect(() => {\n  // Effect logic\n}, [dependencies]);",
  "language": "javascript",
  "tags": ["react", "hooks", "useEffect"]
}
```

#### Search Snippets

```http
GET /api/snippets/search?q=react

Response:
[
  {
    "_id": "64f...",
    "title": "React useState Hook",
    "code": "const [state, setState] = useState(initialValue);",
    "language": "javascript",
    "tags": ["react", "hooks"],
    "author": {
      "_id": "64e...",
      "name": "John Doe"
    },
    "upvotes": 15,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

---

## 🎨 UI Components

### Design System

Built with **Shadcn/ui** components and **Tailwind CSS** for consistent, accessible design:

- **🎨 Theme System**: Automatic dark/light mode switching
- **📱 Responsive Design**: Mobile-first approach with breakpoint utilities
- **♿ Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **🎭 Component Library**: Pre-built, customizable components

### Key UI Components

- **CodeBlock**: Syntax-highlighted code display with copy functionality
- **SnippetCard**: Reusable snippet preview cards
- **ProfileSection**: User profile information and statistics
- **DashboardHeader**: Navigation and user controls
- **SearchBar**: Advanced search with filters
- **ThemeToggle**: Dark/light theme switcher

### Custom Animations

```css
/* Custom animations in globals.css */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.glow {
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
}
```

---

## 🔐 Authentication

### GitHub OAuth Flow

1. **User clicks "Login with GitHub"**
2. **Redirect to GitHub OAuth**
3. **GitHub redirects to callback**
4. **Server generates JWT token**
5. **Frontend receives token**
6. **Token stored in localStorage**
7. **User authenticated for API calls**

### JWT Token Structure

```javascript
{
  "id": "user_mongodb_id",
  "email": "user@example.com",
  "iat": 1640995200,
  "exp": 1641600000
}
```

### Protected Routes

- Frontend: `/dashboard`, `/submit`, `/settings`
- Backend: All POST/PUT/DELETE operations

### Security Features

- **Rate Limiting**: 10 snippets per hour per IP
- **Input Sanitization**: HTML sanitization for all user inputs
- **JWT Expiration**: 7-day token expiry
- **CORS Configuration**: Restricted to allowed origins

---

## 🌐 Deployment

### Frontend (Vercel)

```bash
# Automatic deployment from GitHub
# Environment variables required:
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### Backend (Render)

```bash
# Build command: npm install
# Start command: npm start
# Environment variables: (see .env example above)
```

### MongoDB (Atlas)

- **Database**: MongoDB Atlas cloud database
- **Connection**: Secure connection string with authentication
- **Indexing**: Optimized indexes for search and queries

### Cloudinary Setup

1. Create Cloudinary account
2. Get cloud name, API key, and secret
3. Configure environment variables
4. Images automatically optimized and delivered via CDN

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Coding Standards

- **Frontend**: ESLint + TypeScript strict mode
- **Backend**: ES6+ modules with consistent formatting
- **Commits**: Conventional commit messages
- **Testing**: Write tests for new features

### Areas for Contribution

- 🐛 Bug fixes and performance improvements
- ✨ New features (snippet sharing, code execution, etc.)
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage expansion

---

## 📊 Project Statistics

- **🏗️ Architecture**: Full-stack TypeScript application
- **📦 Components**: 25+ reusable UI components
- **🛡️ Security**: JWT authentication with OAuth integration
- **📱 Responsive**: Mobile-first design approach
- **⚡ Performance**: Optimized with Next.js 15 and modern React
- **🌍 Global**: CDN-delivered assets via Vercel and Cloudinary

---

## 🙏 Acknowledgments

- **[Shadcn/ui](https://ui.shadcn.com/)** for the beautiful component library
- **[Vercel](https://vercel.com/)** for seamless frontend deployment
- **[Render](https://render.com/)** for reliable backend hosting
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** for cloud database
- **[Cloudinary](https://cloudinary.com/)** for image management

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Pranshu Parashar** - [@drockparashar](https://github.com/drockparashar)

- 🌐 **Portfolio**: [Pranshu Parashar](https://pranshuparashar.vercel.app/)
- 📧 **Email**: [pranshu007parashar@gmail.com]
- 🐦 **Twitter**: [@PranshuParasha4]

---

<div align="center">
  <h3>⭐ Star this repository if you found it helpful!</h3>
  <p>Made with ❤️ by developers, for developers</p>
  
  [![GitHub Stars](https://img.shields.io/github/stars/drockparashar/snippetCove?style=social)](https://github.com/drockparashar/snippetCove)
  [![GitHub Forks](https://img.shields.io/github/forks/drockparashar/snippetCove?style=social)](https://github.com/drockparashar/snippetCove/fork)
</div>
