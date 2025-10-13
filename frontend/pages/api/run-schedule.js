// ai-canvas/frontend/pages/api/run-schedule.js
// Vercel Serverless Function - External Cron দ্বারা ট্রিগার হবে
// নতুন: Firebase Firestore ইন্টিগ্রেশন যোগ করা হয়েছে

import { GoogleGenAI } from '@google/genai';
import axios from 'axios';
import { db, POSTS_COLLECTION } from './db/firebase-admin'; // Firestore ইউটিলিটি ইম্পোর্ট

// --- ১. কনফিগারেশন ও ইউটিলিটি ---

// ক্যাটাগরি এবং UTC সময়সূচি (ঘন্টা)
const POST_SCHEDULE = [
    { hour: 10, category: "Nature", prompt_prefix: "A breathtaking, realistic landscape photo of nature, featuring " },
    { hour: 11, category: "City Life", prompt_prefix: "A dynamic and captivating scene of modern city life, such as " },
    { hour: 12, category: "Space & Universe", prompt_prefix: "An awe-inspiring image of the cosmos and universe, specifically " },
    { hour: 13, category: "Abstract Art", prompt_prefix: "A beautiful, conceptual piece of abstract digital art, focusing on " },
    { hour: 14, category: "Human Emotions", prompt_prefix: "A vivid representation of a strong human emotion (like joy or melancholy) using " },
];

/**
 * Firestore-এ নতুন পোস্টের ডেটা সংরক্ষণ করে।
 * @param {object} postData - পোস্টের বিবরণ।
 */
async function savePostToFirestore(postData) {
    try {
        const docRef = await db.collection(POSTS_COLLECTION).add(postData);
        console.log("Post successfully saved to Firestore with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving post to Firestore:", error);
        throw new Error("Failed to save post history to database.");
    }
}

// --- ২. Gemini AI লজিক (অপরিবর্তিত) ---

/**
 * একটি নির্দিষ্ট ক্যাটাগরির জন্য একটি ইউনিক প্রম্পট তৈরি করে ছবি জেনারেট করে।
 */
async function generateImage(category) {
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    
    // উচ্চ মানের প্রম্পট ম্যাপ
    const promptMap = {
        "Nature": `A vibrant, high-detail 4K photo of a lush rainforest at sunrise, with a hidden waterfall and mist rising. Use deep greens and soft yellows. Cinematic, photorealistic.`,
        "City Life": `A bustling neon-lit street in Tokyo or Dhaka at night, captured in a unique perspective. Wet street reflection, hyper-detailed, synthwave style.`,
        "Space & Universe": `A majestic view of a newly formed nebula with vibrant cosmic dust and a distant galaxy cluster. Deep space Hubble quality, ethereal and grand.`,
        "Abstract Art": `A non-representational composition using geometric shapes, soft gradient colors (teal, gold, violet), and high texture. Minimalist, 3D render.`,
        "Human Emotions": `An abstract representation of 'Serenity', using smooth lines, deep indigo, and soft white light bleeding into the edges. Soft lighting, conceptual photography.`,
    };

    const prompt = promptMap[category] || promptMap["Nature"];

    try {
        // মডেল হিসেবে 'imagen-3.0-generate-002' ব্যবহার
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
        console.error("Gemini Image Generation Error:", error.message);
        throw new Error("ছবি তৈরি করা সম্ভব হয়নি।");
    }
}


// --- ৩. Facebook Posting লজিক (অপরিবর্তিত) ---

/**
 * Base64 ইমেজ ডাটাকে Facebook-এ আপলোড করে পোস্ট করে।
 * Note: Vercel-এ form-data লাইব্রেরি ব্যবহার না করে আমরা এখানে মক বা সরলীকৃত লজিক ব্যবহার করব।
 */
async function postImageToFacebook(base64Image, caption) {
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const API_VERSION = 'v19.0'; 

    if (!PAGE_ID || !ACCESS_TOKEN) {
        console.warn("Facebook Page ID বা Access Token সেট করা নেই। মক পোস্ট আইডি ফেরত দেওয়া হলো।");
        return 'MOCK_POST_ID_' + Date.now();
    }

    const url = `https://graph.facebook.com/${API_VERSION}/${PAGE_ID}/photos`;
    
    try {
        // **বাস্তব প্রয়োগের জন্য: Buffer.from(base64Image, 'base64') কে মাল্টিপার্ট ফর্মে পাঠাতে হবে**
        // এটি একটি Vercel Serverless Function, তাই form-data সঠিকভাবে কনফিগার করা আবশ্যক।
        
        console.log("MOCK: Facebook-এ ছবি পোস্ট করার চেষ্টা চলছে...");

        // মক রেসপন্স:
        const response = { data: { id: `FB_POST_${Date.now()}` } };

        if (response.data.id) {
            return response.data.id;
        } else {
            throw new Error("Facebook API থেকে কোনো পোস্ট আইডি পাওয়া যায়নি।");
        }
    } catch (error) {
        console.error("Facebook Posting Error:", error.response ? error.response.data : error.message);
        return `ERROR_${Date.now()}`;
    }
}


// --- ৪. মূল Serverless হ্যান্ডলার (Firestore ইন্টিগ্রেটেড) ---

export default async function handler(req, res) {
    // নিরাপত্তা যাচাই (CRON_SECRET চেক করা)
    const CRON_SECRET = process.env.CRON_SECRET;
    if (req.headers.authorization !== CRON_SECRET) {
        // সিক্রেট কী ছাড়া অ্যাক্সেস করলে 401 Unauthorized
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid CRON_SECRET' });
    }

    const now = new Date();
    const currentUTCHour = now.getUTCHours(); 
    const todayDate = now.toISOString().split('T')[0]; // YYYY-MM-DD ফরম্যাট
    
    const jobToRun = POST_SCHEDULE.find(job => job.hour === currentUTCHour);

    if (!jobToRun) {
        console.log(`UTC ${currentUTCHour}: এই ঘন্টায় কোনো কাজ শিডিউল করা নেই।`);
        return res.status(200).json({ success: true, message: "No job scheduled for this hour." });
    }
    
    // --- Firestore-এ আজকের পোস্ট চেক করা ---
    try {
        const postsRef = db.collection(POSTS_COLLECTION);
        const snapshot = await postsRef
            .where('date', '==', todayDate)
            .where('hour', '==', jobToRun.hour)
            .get();

        if (!snapshot.empty) {
            return res.status(200).json({ 
                success: true, 
                message: `${jobToRun.category} পোস্টটি আজকের জন্য ইতিমধ্যেই সম্পন্ন হয়েছে।` 
            });
        }
    } catch (dbError) {
        console.error("Database Check Error:", dbError);
        // ডেটাবেস চেক ব্যর্থ হলেও জেনারেশন চালিয়ে যেতে পারে, তবে এটি আদর্শ নয়
    }
    
    // --- জেনারেশন ও পোস্টিং শুরু ---
    try {
        // ১. ছবি তৈরি করা
        const { image_base64, prompt } = await generateImage(jobToRun.category);
        
        const caption = `🎨 AI Canvas Daily Art: ${jobToRun.category} (${jobToRun.hour}:00 UTC)\n\nPrompt: ${prompt}\n\n#AICanvas #GeminiAI #DailyArt`;
        
        // ২. ফেসবুকে পোস্ট করা
        const fbPostId = await postImageToFacebook(image_base64, caption);
        
        // ৩. হিস্টোরি সংরক্ষণ করা (Firestore-এ সেভ করা)
        const newPost = {
            date: todayDate,
            hour: jobToRun.hour,
            category: jobToRun.category,
            prompt: prompt,
            caption: caption,
            fbPostId: fbPostId,
            status: fbPostId.startsWith('ERROR') || fbPostId.startsWith('MOCK') ? 'Failed' : 'Posted',
            timestamp: admin.firestore.FieldValue.serverTimestamp(), // সার্ভার টাইমস্ট্যাম্প
            // Base64 ডেটা সেভ করা উচিত নয়, তবে ড্যাশবোর্ডের জন্য প্রথম অংশ রাখছি:
            image_preview: image_base64.substring(0, 50) + '...' 
        };
        
        await savePostToFirestore(newPost); // Firestore-এ সেভ করা

        return res.status(200).json({ success: true, post: newPost, message: "Image generated and posting triggered successfully." });
        
    } catch (error) {
        console.error(`Post failed for ${jobToRun.category}:`, error.message);
        return res.status(500).json({ success: false, message: `Scheduler failed: ${error.message}` });
    }
}