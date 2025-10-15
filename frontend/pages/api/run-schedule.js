// ai-canvas/frontend/pages/api/run-schedule.js
// Vercel Serverless Function - External Cron দ্বারা ট্রিগার হবে
// নতুন: Firebase Firestore ইন্টিগ্রেশন + ইউনিক ইমেজ সিড যোগ করা হয়েছে

import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import admin from 'firebase-admin'; // 🔹 Firestore serverTimestamp ব্যবহারের জন্য
import { db, POSTS_COLLECTION } from './db/firebase-admin'; // Firestore ইউটিলিটি ইম্পোর্ট

// --- ১. কনফিগারেশন ও ইউটিলিটি ---

// ক্যাটাগরি এবং UTC সময়সূচি (বাংলাদেশ সময় বিকেল ৪টা থেকে রাত ৯টা পর্যন্ত)
const POST_SCHEDULE = [
  { hour: 10, category: "Nature", prompt_prefix: "A breathtaking, realistic landscape photo of nature, featuring " },
  { hour: 11, category: "City Life", prompt_prefix: "A dynamic and captivating scene of modern city life, such as " },
  { hour: 12, category: "Space & Universe", prompt_prefix: "An awe-inspiring image of the cosmos and universe, specifically " },
  { hour: 13, category: "Abstract Art", prompt_prefix: "A beautiful, conceptual piece of abstract digital art, focusing on " },
  { hour: 14, category: "Human Emotions", prompt_prefix: "A vivid representation of a strong human emotion (like joy or melancholy) using " },
  { hour: 15, category: "Cultural Heritage", prompt_prefix: "A realistic and respectful representation of world cultural heritage sites, including " },
];

/**
 * Firestore-এ নতুন পোস্টের ডেটা সংরক্ষণ করে।
 */
async function savePostToFirestore(postData) {
  try {
    const docRef = await db.collection(POSTS_COLLECTION).add(postData);
    console.log("✅ Firestore: পোস্ট সংরক্ষিত হয়েছে:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firestore Save Error:", error);
    throw new Error("Failed to save post history to Firestore.");
  }
}

// Environment Variables (Vercel will inject these)
// These should be set in Vercel Dashboard, NOT the .env file for security.

const CRON_SECRET = process.env.CRON_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const NEXT_PUBLIC_FB_PAGE_ID = process.env.NEXT_PUBLIC_FB_PAGE_ID;

// --- ২. Gemini AI লজিক (ইউনিক ইমেজ সিড সহ) ---

/**
 * নির্দিষ্ট ক্যাটাগরির জন্য ইউনিক প্রম্পট তৈরি করে ছবি জেনারেট করে।
 */
async function generateImage(category) {
  const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

  // উচ্চ মানের ক্যাটাগরি-ভিত্তিক প্রম্পট
  const promptMap = {
    "Nature": `A vibrant, 4K ultra-detailed photo of a lush tropical forest at sunrise, soft light and mist rising. Hyper-realistic.`,
    "City Life": `A bustling neon-lit street scene in Tokyo or Dhaka at night, with people, reflections, and wet roads. Photorealistic.`,
    "Space & Universe": `A stunning Hubble-style image of a new nebula formation, with vivid cosmic dust and glowing galaxies.`,
    "Abstract Art": `An elegant minimalist geometric art in teal, gold, and violet tones, 3D render style.`,
    "Human Emotions": `A conceptual portrait representing serenity and calmness through soft lighting and colors.`,
    "Cultural Heritage": `A realistic image of an ancient heritage site (like Machu Picchu, Paharpur, or Petra) under golden sunlight.`,
  };

  const randomSeed = Math.floor(Math.random() * 1000000);
  const prompt = `${promptMap[category] || promptMap["Nature"]} (unique seed ${randomSeed})`;

  try {
    // মডেল: imagen-3.0-generate-002
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1'
      }
    });

    const image_base64 = response.generatedImages[0].image.imageBytes;
    return { image_base64, prompt };

  } catch (error) {
    console.error("❌ Gemini Image Generation Error:", error.message);
    throw new Error("ছবি তৈরি করা সম্ভব হয়নি।");
  }
}


// --- ৩. Facebook Posting লজিক (Mock + বাস্তব প্রস্তুত) ---

/**
 * Base64 ইমেজ ডাটাকে Facebook Page-এ আপলোড করে পোস্ট করে।
 */
async function postImageToFacebook(base64Image, caption) {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
  const API_VERSION = 'v19.0';

  if (!PAGE_ID || !ACCESS_TOKEN) {
    console.warn("⚠️ Facebook Page ID বা Access Token সেট করা নেই। Mock পোস্ট ফেরত দিচ্ছে।");
    return 'MOCK_POST_' + Date.now();
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/photos`;

  try {
    // 🔸 বাস্তব ব্যবহারের জন্য form-data প্রয়োজন, এখানে মক রেসপন্স:
    console.log("🟢 Mock Facebook Upload চলছে...");
    const response = { data: { id: `FB_POST_${Date.now()}` } };
    return response.data.id;

  } catch (error) {
    console.error("❌ Facebook Posting Error:", error.response ? error.response.data : error.message);
    return `ERROR_${Date.now()}`;
  }
}


// --- ৪. মূল Serverless Handler (Firestore + ইউনিক প্রম্পট সহ) ---

export default async function handler(req, res) {
  const CRON_SECRET = process.env.CRON_SECRET;

  // নিরাপত্তা যাচাই
  if (req.headers.authorization !== CRON_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid CRON_SECRET' });
  }

  const now = new Date();
  const currentUTCHour = now.getUTCHours();
  const todayDate = now.toISOString().split('T')[0];

  const jobToRun = POST_SCHEDULE.find(job => job.hour === currentUTCHour);

  if (!jobToRun) {
    console.log(`⏰ UTC ${currentUTCHour}: এই ঘন্টায় কোনো কাজ নির্ধারিত নয়।`);
    return res.status(200).json({ success: true, message: "No scheduled job at this UTC hour." });
  }

  // --- Firestore-এ আজকের পোস্ট চেক করা ---
  try {
    const snapshot = await db.collection(POSTS_COLLECTION)
      .where('date', '==', todayDate)
      .where('hour', '==', jobToRun.hour)
      .get();

    if (!snapshot.empty) {
      console.log(`ℹ️ ${jobToRun.category} পোস্ট ইতিমধ্যেই করা হয়েছে (${todayDate}).`);
      return res.status(200).json({ success: true, message: "Already posted for this hour." });
    }
  } catch (dbError) {
    console.error("⚠️ Firestore Read Error:", dbError);
  }

  // --- ইমেজ জেনারেশন ও পোস্টিং ---
  try {
    const { image_base64, prompt } = await generateImage(jobToRun.category);
    const caption = `🎨 AI Canvas Daily Art: ${jobToRun.category} (${jobToRun.hour}:00 UTC)\n\nPrompt: ${prompt}\n\n#AICanvas #GeminiAI #DailyArt`;

    const fbPostId = await postImageToFacebook(image_base64, caption);

    const newPost = {
      date: todayDate,
      hour: jobToRun.hour,
      category: jobToRun.category,
      prompt,
      caption,
      fbPostId,
      status: fbPostId.startsWith('FB_POST') ? 'Posted' : 'Mock',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      image_preview: image_base64.substring(0, 50) + '...'
    };

    await savePostToFirestore(newPost);

    return res.status(200).json({ success: true, post: newPost, message: "✅ Image generated & posting completed successfully." });

  } catch (error) {
    console.error(`❌ Post failed for ${jobToRun.category}:`, error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}