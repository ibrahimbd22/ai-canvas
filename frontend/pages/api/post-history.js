// ai-canvas/frontend/pages/api/post-history.js
import { db, POSTS_COLLECTION } from './db/firebase-admin';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Firestore থেকে সমস্ত পোস্টের ইতিহাস আনা (সর্বশেষ পোস্টটি প্রথমে দেখানোর জন্য)
        const postsRef = db.collection(POSTS_COLLECTION);
        const snapshot = await postsRef
            // Firestore-এ orderBy ব্যবহার না করাই ভালো, কারণ এটি index মিসিং ত্রুটি দিতে পারে।
            // তাই আমরা অল্প ডেটা হলে ক্লায়েন্টে সর্ট করব, তবে এখানে উদাহরণ হিসেবে দিলাম:
            .orderBy('timestamp', 'desc') 
            .limit(100) // শুধু সর্বশেষ ১০০টি পোস্ট আনা
            .get();

        const history = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return res.status(200).json({ 
            success: true, 
            history: history 
        });

    } catch (error) {
        console.error("Error fetching post history:", error);
        return res.status(500).json({ success: false, message: 'Failed to fetch post history.' });
    }
}