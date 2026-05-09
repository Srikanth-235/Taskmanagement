# TaskManager — Modern Team Productivity Platform

A high-performance, full-stack task management application built for speed and reliability.

## 🚀 Key Features
- **Role-Based Access**: Specialized views for Admins (Global overview) and Members (Assigned tasks).
- **Near-Instant Rendering**: Implements "Stale-While-Revalidate" caching for lightning-fast page transitions.
- **Smart Dashboard**: Real-time aggregated statistics for projects, tasks, and team workloads.
- **Project Workflows**: Create projects, assign members, and manage tasks through a beautiful Kanban-style interface.
- **Mobile First**: Fully responsive design with a dynamic sidebar and touch-optimized components.

## 🛠 Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, Firebase Admin SDK.
- **Database**: Google Firestore.
- **Authentication**: Firebase Authentication.
- **Deployment**: Dockerized services on Railway.

## 📦 Deployment Configuration

### Frontend Environment Variables (Railway)
| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Client API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_API_URL` | URL of the Backend API (e.g., `https://backend.up.railway.app/api`) |

### Backend Environment Variables (Railway)
| Variable | Description |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | **Critical**: Minified (one-line) JSON string of your Firebase Service Account key. |
| `FRONTEND_URL` | URL of your deployed frontend. |
| `RAILWAY_PUBLIC_DOMAIN` | Your backend domain (for the keep-alive self-ping feature). |
| `NODE_ENV` | Set to `production`. |

## 🏗 Setup & Installation

### Local Development
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Srikanth-235/Taskmanagement.git
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Add your TaskManagerFirebase.json to the config folder
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   # Create a .env file with your VITE_FIREBASE variables
   npm run dev
   ```

## 🔒 Security
The application uses **Firebase ID Token verification** on every API request. Each request is authenticated in the backend, ensuring users can only access data they are authorized to see based on their Firestore role.


