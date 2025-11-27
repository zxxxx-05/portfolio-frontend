# Portfolio Frontend

A modern, elegant React-based portfolio website with blog functionality. Built with React, React Router, and styled with a sophisticated dark theme featuring gold accents.

## Live Demo

- **Frontend URL**: https://portfolio-frontend-p0m1ix0bl-wqeqweqweqweqs-projects.vercel.app
- **Backend API**: https://portfolio-backend-hgygo4lip-wqeqweqweqweqs-projects.vercel.app

## Features

- Responsive, elegant dark theme design
- Component-based architecture
- Client-side routing with React Router
- Protected routes for admin dashboard
- Global state management with Context API
- Full authentication flow (register, login, logout)
- CRUD operations for projects and blog posts
- Comment system for blog posts
- Contact form with API integration

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Custom CSS with CSS Variables

## Project Structure

```
portfolio-frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── BlogCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin.jsx
│   ├── context/           # React Context
│   │   └── AuthContext.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

## Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home/About page with hero section | Public |
| `/projects` | Projects gallery | Public |
| `/blog` | Blog posts list | Public |
| `/blog/:id` | Single blog post with comments | Public |
| `/contact` | Contact form | Public |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/admin` | Admin dashboard | Protected |

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Backend API running (see portfolio-backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zxxxx-05/portfolio-frontend.git
cd portfolio-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`

### Connecting to the Backend API

**For local development:**
1. Make sure the backend API is running locally at `http://localhost:5000`
2. Set the environment variable in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**For production:**
Update the `.env` file with the deployed API URL:
```env
VITE_API_URL=https://portfolio-backend-hgygo4lip-wqeqweqweqweqs-projects.vercel.app/api
```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Features Overview

### Authentication
- User registration with validation
- JWT-based login
- Persistent sessions using localStorage
- Auth-aware navigation

### Projects
- Display all projects in a grid layout
- Project cards with image, description, and tech stack
- Links to live demo and source code

### Blog
- List view with pagination-ready design
- Individual post view with full content
- Comment section for logged-in users

### Admin Dashboard
- Manage projects (create, edit, delete)
- Manage blog posts (create, edit, delete)
- View and manage contact messages

### Contact Form
- Form validation
- Success/error feedback
- Sends messages to backend API

## Styling

The application uses a custom CSS design system with:
- CSS Variables for theming
- Responsive breakpoints
- Elegant animations and transitions
- Dark theme with gold accents

Key CSS variables:
```css
--primary: #1a1a2e
--secondary: #16213e
--accent: #e94560
--gold: #d4af37
--bg-dark: #0f0f1a
```

## Deployment

This frontend is deployed on Vercel.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts and set environment variables:
   - `VITE_API_URL`: Your backend API URL

## License

ISC
