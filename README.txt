TASKMANAGER - MODERN TEAM PRODUCTIVITY PLATFORM

A high-performance, full-stack task management application built for speed and reliability.

1. KEY FEATURES
----------------
* Role-Based Access: Specialized views for Admins and Members.
* Near-Instant Rendering: Caching system for lightning-fast page transitions.
* Smart Dashboard: Real-time aggregated statistics for projects and tasks.
* Project Workflows: Beautiful Kanban-style interface for project and task management.
* Mobile First: Fully responsive design with a dynamic sidebar.

2. TECH STACK
--------------
* Frontend: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
* Backend: Node.js, Express, Firebase Admin SDK.
* Database: Google Firestore.
* Authentication: Firebase Authentication.
* Deployment: Dockerized services on Railway.

3. DEPLOYMENT CONFIGURATION (RAILWAY)
--------------------------------------

FRONTEND VARIABLES:
- VITE_FIREBASE_API_KEY: Your Firebase API Key
- VITE_FIREBASE_AUTH_DOMAIN: Your Firebase Auth Domain
- VITE_FIREBASE_PROJECT_ID: Your Firebase Project ID
- VITE_API_URL: Your Backend API URL (e.g., https://backend.up.railway.app/api)

BACKEND VARIABLES:
- FIREBASE_SERVICE_ACCOUNT: Minified (one-line) JSON string of your Firebase Service Account key.
- FRONTEND_URL: URL of your deployed frontend.
- RAILWAY_PUBLIC_DOMAIN: Your backend domain (e.g., backend.up.railway.app)
- NODE_ENV: production

4. SETUP & INSTALLATION
------------------------

LOCAL DEVELOPMENT:
1. Clone the repository: git clone https://github.com/Srikanth-235/Taskmanagement.git
2. Backend:
   - cd backend
   - npm install
   - Add TaskManagerFirebase.json to config folder
   - npm start
3. Frontend:
   - cd frontend
   - npm install
   - Create .env with VITE_FIREBASE variables
   - npm run dev

5. SECURITY
------------
The application uses Firebase ID Token verification on every API request. Each request is authenticated in the backend, ensuring users can only access data they are authorized to see based on their Firestore role.


