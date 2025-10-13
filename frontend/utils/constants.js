// ai-canvas/frontend/utils/constants.js

/**
 * অ্যাপ্লিকেশনের প্রধান ন্যাভিগেশন লিংকসমূহ।
 */
export const NAV_LINKS = [
    { name: 'Dashboard', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'History', path: '/history' },
    { name: 'Settings', path: '/settings' },
];

/**
 * দৈনিক পোস্টের ক্যাটাগরি, সময়সূচি এবং প্রম্পটের বিবরণ।
 * এই তালিকাটি frontend/pages/categories.js এ ব্যবহৃত হবে।
 */
export const POST_CATEGORIES = [
    { 
        id: 'nature', 
        name: 'Nature (প্রকৃতি)', 
        time: '10:00 UTC', 
        description: 'Breathtaking, realistic landscapes and natural wonders.' 
    },
    { 
        id: 'city', 
        name: 'City Life (শহুরে জীবন)', 
        time: '11:00 UTC', 
        description: 'Dynamic scenes of modern cities, architecture, and urban flow.' 
    },
    { 
        id: 'space', 
        name: 'Space & Universe (মহাকাশ)', 
        time: '12:00 UTC', 
        description: 'Majestic views of galaxies, nebulae, and cosmic events.' 
    },
    { 
        id: 'abstract', 
        name: 'Abstract Art (অ্যাবস্ট্রাক্ট আর্ট)', 
        time: '13:00 UTC', 
        description: 'Conceptual, non-representational art using form and color.' 
    },
    { 
        id: 'emotion', 
        name: 'Human Emotions (মানবিক অনুভূতি)', 
        time: '14:00 UTC', 
        description: 'Visual representations of complex human feelings.' 
    },
];

/**
 * অ্যাপ্লিকেশনের রং এবং স্টাইল কনফিগারেশন।
 */
export const THEME = {
    primary: 'indigo-500',
    secondary: 'gray-700',
    background: 'gray-900',
};

// এছাড়াও, FB পোস্ট আইডি থেকে লিংক তৈরি করার মতো সাধারণ helper ফাংশন
// আরেকটি ফাইল, যেমন 'helpers.js' এ থাকতে পারে।
