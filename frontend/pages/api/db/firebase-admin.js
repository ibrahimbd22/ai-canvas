// ai-canvas/frontend/pages/api/db/firebase-admin.js
// Firebase Admin SDK শুধুমাত্র Serverless Environment-এ চলবে (Next.js API Routes-এ)

import * as admin from 'firebase-admin';

// Vercel Environment Variables থেকে Service Account Key লোড করা হবে
// বাস্তবক্ষেত্রে, আপনাকে একটি JSON Service Account File থেকে এটিকে এনকোড করে 
// Vercel-এর Environment Variable-এ (FIREBASE_SERVICE_ACCOUNT) রাখতে হবে।
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// শুধুমাত্র একবার Firebase অ্যাপ শুরু করা
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
  } catch (error) {
    console.error("Firebase Admin initialization error", error.stack);
  }
}

// Firestore ইনস্ট্যান্স এক্সপোর্ট করা
const db = admin.firestore();

/**
 * পোস্ট ডেটা সংরক্ষণের জন্য Firestore Collection Path.
 * আমরা 'artifacts/{appId}' সিকিউরিটি রুল ব্যবহার করব।
 */
const POSTS_COLLECTION = `artifacts/ai-canvas-scheduler/public/data/posts`; 

export { db, POSTS_COLLECTION };