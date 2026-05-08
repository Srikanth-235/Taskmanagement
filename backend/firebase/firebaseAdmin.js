const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

// Load service account from environment variable (Production)
// or from local file (Development)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    // Railway sometimes double-escapes newlines in the private key (\\n vs \n)
    // We normalize the string before parsing to handle both cases
    let raw = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
    // If the string isn't already valid JSON, try fixing escaped newlines
    try {
      serviceAccount = JSON.parse(raw);
    } catch {
      raw = raw.replace(/\\n/g, "\n");
      serviceAccount = JSON.parse(raw);
    }
    console.log("[Firebase] Service account loaded from environment variable.");
  } catch (err) {
    console.error("[Firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT:", err.message);
    process.exit(1);
  }
} else {
  const serviceAccountPath = path.resolve(
    __dirname,
    "../../config/TaskManagerFirebase.json"
  );
  try {
    serviceAccount = require(serviceAccountPath);
    console.log("[Firebase] Service account loaded from local file.");
  } catch (err) {
    console.error("[Firebase] Service account file not found and FIREBASE_SERVICE_ACCOUNT env var not set.");
  }
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
