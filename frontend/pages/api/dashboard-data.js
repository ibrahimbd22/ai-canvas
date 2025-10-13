// ai-canvas/frontend/pages/api/dashboard-data.js
import { db, POSTS_COLLECTION } from './db/firebase-admin';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const today = new Date().toISOString().split('T')[0];
        
        // Firestore থেকে আজকের পোস্টগুলো আনা
        const postsRef = db.collection(POSTS_COLLECTION);
        const snapshot = await postsRef
            .where('date', '==', today)
            .get();

        const todayPosts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return res.status(200).json({ 
            success: true, 
            posts: todayPosts 
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).json({ success: false, message: 'Failed to fetch dashboard data.' });
    }
}