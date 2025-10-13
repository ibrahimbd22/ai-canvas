// ai-canvas/frontend/utils/helpers.js
// সাধারণ ইউটিলিটি ফাংশন যা ডেটা ফরম্যাটিং এবং লিংক তৈরির জন্য ব্যবহৃত হয়।

/**
 * Firebase Firestore Timestamp বা Date অবজেক্টকে স্থানীয় তারিখ ও সময়ে ফরম্যাট করে।
 * @param {object | string | number} timestamp - Firestore Timestamp object বা Date string/number.
 * @returns {string} স্থানীয়ভাবে ফরম্যাট করা তারিখ ও সময় (যেমন: "14/01/2024 at 10:00 AM").
 */
export const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Firestore Timestamp অবজেক্ট পরিচালনা (যদি এটি .toDate() মেথড সমর্থন করে)
    let date;
    if (timestamp.toDate) {
        date = timestamp.toDate();
    } else {
        date = new Date(timestamp);
    }
    
    // ISO স্ট্রিং ইনপুট পরিচালনা
    if (isNaN(date)) {
        date = new Date(timestamp);
    }

    // টাইমজোন ও স্থানীয় ফরম্যাট ব্যবহার করা
    return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
    });
};

/**
 * Facebook Post ID ব্যবহার করে পোস্টের সম্পূর্ণ URL তৈরি করে।
 * @param {string} fbPostId - পোস্ট আইডি (যেমন: 1234567890_0987654321).
 * @returns {string} Facebook পোস্টের লিঙ্ক অথবা স্ট্যাটাস টেক্সট।
 */
export const getFbPostUrl = (fbPostId) => {
    if (fbPostId.startsWith('ERROR') || fbPostId.startsWith('MOCK')) {
        return 'Post Failed / Mocked (No Live Link)';
    }

    // Facebook Post ID-এর ফরম্যাট সাধারণত PageID_PostID
    // আমরা ধরে নিচ্ছি যে ID-টি পোস্টের সাথে সম্পর্কিত।
    const parts = fbPostId.split('_');
    const postId = parts.length > 1 ? parts[1] : fbPostId;

    // আপনার অ্যাপের সেটিংস থেকে FB_PAGE_ID বা FB_USER_ID ব্যবহার করে ইউআরএল তৈরি করা উচিত।
    // সরলতার জন্য, আমরা সরাসরি পোস্টের লিঙ্ক তৈরি করছি।
    return `https://www.facebook.com/permalink.php?story_fbid=${postId}&id=${process.env.NEXT_PUBLIC_FB_PAGE_ID || 'PAGE_ID'}`;
};

/**
 * স্ট্রিং-এর প্রথম few ক্যারেক্টার দেখিয়ে... দ্বারা শেষ করে।
 * @param {string} text - টেক্সট।
 * @param {number} length - প্রদর্শিত অক্ষরের সংখ্যা।
 * @returns {string} সংক্ষেপিত টেক্সট।
 */
export const truncateText = (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
};
