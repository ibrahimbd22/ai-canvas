import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCard from '../components/ImageCard'; // এটি পরে তৈরি করা হবে
import { useState, useEffect } from 'react';
import { MdTimeline, MdAccessTime, MdAutorenew } from 'react-icons/md';
import { loadHistory, POST_SCHEDULE } from '../../backend/scheduler'; // ডেমো ডাটা লোড করা

// স্ট্যাটিক ডেমো ডেটা: যেহেতু Next.js API Routes এ এটি পরিবর্তিত হবে
const initialHistory = loadHistory();
const todayDate = new Date().toISOString().split('T')[0];

const mockTodayPosts = POST_SCHEDULE.map(job => {
    const postedItem = initialHistory.find(
        p => p.date === todayDate && p.hour === job.hour
    );
    
    return postedItem || {
        id: job.hour,
        category: job.category,
        hour: job.hour,
        timestamp: null,
        status: 'Pending',
        prompt: `Looking for a stunning AI image for: ${job.category}.`,
        fbPostId: null,
        image_base64: 'placeholder'
    };
});


export default function Dashboard() {
    const [posts, setPosts] = useState(mockTodayPosts);
    const [loading, setLoading] = useState(false); // লোডিং স্টেট

    // বাস্তব ক্ষেত্রে, এখানে Next.js API Route (/api/dashboard-data) থেকে ডেটা লোড করা হবে
    const fetchDashboardData = async () => {
        setLoading(true);
        // মক ডেটা ব্যবহার করছি। বাস্তব ক্ষেত্রে:
        /*
        try {
            const response = await fetch('/api/dashboard-data');
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        }
        */
        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="dark-bg min-h-screen flex flex-col">
            <Head>
                <title>Dashboard | AI Canvas</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
            </Head>
            
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white">
                        Daily AI Canvas <span className="text-indigo-400">Dashboard</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        আজকের ৫টি স্বয়ংক্রিয় পোস্টের অবস্থা দেখুন।
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                    <DashboardMetric
                        icon={MdTimeline}
                        title="Today's Date (UTC)"
                        value={todayDate}
                    />
                    <DashboardMetric
                        icon={MdAccessTime}
                        title="Current UTC Hour"
                        value={new Date().getUTCHours().toString().padStart(2, '0') + ":00"}
                    />
                    <DashboardMetric
                        icon={MdAutorenew}
                        title="Completed Posts"
                        value={posts.filter(p => p.status === 'Posted').length}
                        color="text-emerald-400"
                    />
                </div>

                {/* Image Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {loading ? (
                        <p className="text-slate-500 col-span-5 text-center p-8">Loading posts...</p>
                    ) : (
                        posts.map((post) => (
                            <ImageCard key={post.id} post={post} />
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

// ছোট ড্যাশবোর্ড কার্ড কম্পোনেন্ট
const DashboardMetric = ({ icon: Icon, title, value, color = "text-indigo-400" }) => (
    <div className="card-bg p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <p className="text-xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);


// ডামি ImageCard - আসল কার্ডে Gemini Image দেখানো হবে
const ImageCard = ({ post }) => {
    const statusClass = post.status === 'Posted' ? 'status-posted' 
                      : post.status === 'Pending' ? 'status-pending' 
                      : 'status-failed';

    const time = post.hour.toString().padStart(2, '0') + ':00 UTC';
    
    return (
        <div className="card-bg rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-indigo-500/50">
            <div className="relative h-48 w-full bg-slate-700 flex items-center justify-center">
                {/* Image Placeholder. Real image will be loaded here */}
                <span className="text-slate-400 text-sm italic">
                    {post.image_base64 === 'placeholder' ? post.category : 'AI Generated Image'}
                </span>
                
                <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs shadow-md">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusClass}`}>
                        {post.status}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{post.category}</h3>
                <div className="flex justify-between items-center text-sm text-slate-400">
                    <div className="flex items-center">
                        <MdAccessTime className="mr-1" />
                        <span>{time}</span>
                    </div>
                </div>
                <p className="mt-2 text-xs text-slate-500 truncate">
                    Prompt: {post.prompt}
                </p>
                {post.fbPostId && post.status === 'Posted' && (
                    <p className="mt-2 text-xs text-indigo-400 truncate">
                        Post ID: {post.fbPostId}
                    </p>
                )}
            </div>
        </div>
    );
};