import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCard from '../components/ImageCard';
import { useState, useEffect } from 'react';
import { MdHistory, MdExpandMore } from 'react-icons/md';
import { loadHistory } from '../../backend/scheduler'; // ডেমো ডাটা লোড করা

export default function PostHistory() {
    // MOCK: লোড করা
    const allHistory = loadHistory();
    const [history, setHistory] = useState(allHistory.reverse());
    const [loading, setLoading] = useState(false);

    // বাস্তব ক্ষেত্রে, এখানে API Route (/api/post-history) থেকে ডেটা লোড করা হবে
    const fetchHistory = async () => {
        setLoading(true);
        // মক ডেটা ব্যবহার করছি। বাস্তব ক্ষেত্রে:
        /*
        try {
            const response = await fetch('/api/post-history');
            const data = await response.json();
            setHistory(data.history.reverse());
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
        */
        setLoading(false);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="dark-bg min-h-screen flex flex-col">
            <Head>
                <title>Post History | AI Canvas</title>
            </Head>
            
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white flex items-center">
                        <MdHistory className="mr-3 text-indigo-400" /> Post <span className="text-indigo-400 ml-2">History</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        জেনারেট করা এবং ফেসবুকে পোস্ট করা সমস্ত ছবির আর্কাইভ।
                    </p>
                </header>

                {loading ? (
                    <p className="text-slate-500 text-center p-12">ইতিহাস লোড হচ্ছে...</p>
                ) : history.length === 0 ? (
                    <div className="card-bg p-12 text-center rounded-xl text-slate-400">
                        <MdHistory className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                        <p>এখনও কোনো পোস্ট পাওয়া যায়নি। শিডিউলার চালু হওয়ার পর এখানে ডেটা দেখতে পাবেন।</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {history.map((post) => (
                            <ImageCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}