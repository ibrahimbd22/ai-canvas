// ai-canvas/frontend/pages/api/db/firebase-admin.js
// ✅ Firebase Admin SDK - Only for Serverless Environment (Next.js API Routes)

import admin from 'firebase-admin';

// --- ১. Firebase Service Account Configuration ---
// FIREBASE_SERVICE_ACCOUNT: Environment Variable (one-line JSON string from .env / Vercel)
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;

if (!serviceAccount) {
  console.error("❌ FIREBASE_SERVICE_ACCOUNT environment variable not found!");
}

// --- ২. Initialize Firebase App (only once) ---
if (!admin.apps.length && serviceAccount) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // databaseURL ঐচ্ছিক — Firestore এর জন্য প্রয়োজন হয় না
    });
    console.log("✅ Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("❌ Firebase Admin initialization error:", error);
  }
}

// --- ৩. Firestore instance ---
const db = admin.firestore();

// --- ৪. Collection Path ---
// 🔸 Firestore best practice: Root-level collections, not nested under documents.
// তোমার আগের path (artifacts/.../data/posts) document nesting হয়ে যাচ্ছিল, যা ideal নয়।
// নিচের মতো সরল ও কার্যকর নাম ব্যবহার করো:
const POSTS_COLLECTION = "ai_canvas_posts";

// --- ৫. Export objects ---
export { admin, db, POSTS_COLLECTION };