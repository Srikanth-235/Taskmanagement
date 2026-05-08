require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173", "http://localhost:5174", "http://localhost:3000",
  "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:3000"
];

if (process.env.FRONTEND_URL) {
  let url = process.env.FRONTEND_URL.trim();
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  allowedOrigins.push(url);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      const sanitizedOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some(authOrigin => 
        authOrigin.replace(/\/$/, "") === sanitizedOrigin
      );

      if (isAllowed || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        console.error(`[CORS Blocked] Origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Health Check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).send("TaskManager API is Online.");
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "TaskManager API is running.", timestamp: new Date().toISOString() });
});

// ── API Routes ──────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global Error Handler ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error.",
  });
});

// ── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n TaskManager API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);

  // ── Keep-Alive Ping (prevents Railway free tier cold starts) ──────────────
  if (process.env.NODE_ENV === "production") {
    const https = require("https");
    const http  = require("http");
    const SELF_URL = process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api/health`
      : null;

    if (SELF_URL) {
      setInterval(() => {
        const client = SELF_URL.startsWith("https") ? https : http;
        client.get(SELF_URL, (res) => {
          console.log(`[Keep-Alive] Pinged ${SELF_URL} → ${res.statusCode}`);
        }).on("error", (err) => {
          console.warn(`[Keep-Alive] Ping failed: ${err.message}`);
        });
      }, 10 * 60 * 1000); // every 10 minutes
      console.log(`[Keep-Alive] Self-ping enabled → ${SELF_URL}`);
    }
  }
});
