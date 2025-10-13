import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MdCategory, MdAccessTime, MdWbSunny, MdApartment, MdPublic, MdFormatPaint, MdSentimentSatisfiedAlt } from 'react-icons/md';
import { POST_SCHEDULE } from '../../backend/scheduler';

// ক্যাটাগরি আইকন ম্যাপ
const CATEGORY_ICONS = {
    "Nature": MdWbSunny,
    "City Life": MdApartment,
    "Space & Universe": MdPublic,
    "Abstract Art": MdFormatPaint,
    "Human Emotions": MdSentimentSatisfiedAlt
};

export default function Categories() {
    return (
        <div className="dark-bg min-h-screen flex flex-col">
            <Head>
                <title>Categories | AI Canvas</title>
            </Head>
            
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white flex items-center">
                        <MdCategory className="mr-3 text-indigo-400" /> Daily Post <span className="text-indigo-400 ml-2">Categories</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        প্রতিদিনের স্বয়ংক্রিয় ইমেজ জেনারেশনের জন্য নির্ধারিত ৫টি ক্যাটাগরি এবং তাদের UTC সময়সূচি।
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {POST_SCHEDULE.map((job, index) => {
                        const Icon = CATEGORY_ICONS[job.category] || MdCategory;
                        
                        return (
                            <div key={index} className="card-bg p-6 rounded-2xl shadow-2xl transition duration-300 hover:scale-[1.02] hover:shadow-sky-500/30">
                                <div className="flex items-center space-x-4">
                                    <Icon className="w-10 h-10 text-indigo-400 bg-indigo-500/10 p-2 rounded-full" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{job.category}</h3>
                                        <p className="text-sm text-slate-400">AI Prompt Focus</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="flex items-center text-sm text-slate-300">
                                        <MdAccessTime className="mr-2 text-sky-400" />
                                        <span className="font-semibold text-lg">{job.hour.toString().padStart(2, '0')}:00 UTC</span>
                                    </div>
                                    <p className="text-xs mt-2 text-slate-500 italic line-clamp-2">
                                        {job.prompt_prefix}...
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}