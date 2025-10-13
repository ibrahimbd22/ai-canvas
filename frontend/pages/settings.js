import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { MdKey, MdVpnKey, MdSettings } from 'react-icons/md';

export default function Settings() {
    const [geminiKey, setGeminiKey] = useState('');
    const [pageId, setPageId] = useState('');
    const [pageAccessToken, setPageAccessToken] = useState('');
    const [message, setMessage] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    // MOCK: লোড করা
    useEffect(() => {
        setGeminiKey(localStorage.getItem('geminiKey') || 'sk-g-...');
        setPageId(localStorage.getItem('pageId') || '1234567890');
        setPageAccessToken(localStorage.getItem('pageAccessToken') || 'EAA...');
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        
        // MOCK: লোকাল স্টোরেজে সেভ করা (প্রোডাকশনে Vercel ENV-তে সেট করতে হবে)
        localStorage.setItem('geminiKey', geminiKey);
        localStorage.setItem('pageId', pageId);
        localStorage.setItem('pageAccessToken', pageAccessToken);
        
        setMessage('কনফিগারেশন সেভ করা হয়েছে! মনে রাখবেন: প্রোডাকশন কিগুলো Vercel Environment Variables-এ সেট করতে হবে।');
        setIsSaved(true);

        setTimeout(() => {
            setMessage('');
            setIsSaved(false);
        }, 5000);
    };

    const InputField = ({ label, value, setter, icon: Icon, type = "text" }) => (
        <div className="mb-6">
            <label className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                <input
                    type={type}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg card-bg border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-white placeholder-slate-500"
                    placeholder={`Enter ${label}`}
                    required
                />
            </div>
        </div>
    );

    return (
        <div className="dark-bg min-h-screen flex flex-col">
            <Head>
                <title>Settings | AI Canvas</title>
            </Head>
            
            <Navbar />

            <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white flex items-center">
                        <MdSettings className="mr-3 text-indigo-400" /> App <span className="text-indigo-400 ml-2">Settings</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Gemini AI এবং Facebook Graph API-এর জন্য প্রয়োজনীয় কনফিগারেশন সেট করুন।
                    </p>
                </header>

                <div className="card-bg p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSave}>
                        
                        <InputField
                            label="Gemini API Key"
                            value={geminiKey}
                            setter={setGeminiKey}
                            icon={MdKey}
                            type="password"
                        />
                        
                        <InputField
                            label="Facebook Page ID"
                            value={pageId}
                            setter={setPageId}
                            icon={MdVpnKey}
                        />

                        <InputField
                            label="Facebook Page Access Token"
                            value={pageAccessToken}
                            setter={setPageAccessToken}
                            icon={MdKey}
                            type="password"
                        />

                        {message && (
                            <div className={`p-4 mb-4 rounded-lg text-sm ${isSaved ? 'bg-emerald-900/50 text-emerald-300' : 'bg-red-900/50 text-red-300'}`}>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 mt-4 rounded-lg text-white font-bold text-lg bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 transition duration-300 shadow-lg shadow-indigo-500/30"
                        >
                            Save Configuration
                        </button>
                    </form>
                </div>
                
                <p className="mt-6 text-xs text-center text-slate-500">
                    <span className="font-bold text-yellow-500">গুরুত্বপূর্ণ:</span> এই ডেটা শুধু ব্রাউজারে সংরক্ষণ করা হয়েছে। স্বয়ংক্রিয় পোস্টিং-এর জন্য এই কীগুলো অবশ্যই Vercel-এর পরিবেশ ভ্যারিয়েবল (Environment Variables)-এ সেট করতে হবে।
                </p>
            </main>

            <Footer />
        </div>
    );
}