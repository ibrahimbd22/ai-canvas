import { MdMailOutline } from 'react-icons/md';
import { FaWhatsapp, FaFacebookSquare } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="card-bg mt-12 border-t border-slate-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
                    
                    {/* Branding and Credit */}
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} AI Canvas. All rights reserved. 
                        <span className="block mt-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                            Powered by Gemini AI
                        </span>
                    </div>

                    {/* Contact Icons */}
                    <div className="flex space-x-6 text-2xl">
                        {/* WhatsApp (01836204769) */}
                        <a 
                            href="https://wa.me/8801836204769" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-whatsapp transition duration-200"
                            style={{ '--whatsapp': '#25D366' }}
                            title="WhatsApp"
                        >
                            <FaWhatsapp />
                        </a>
                        
                        {/* Email (mdibrahimbd795@gmail.com) */}
                        <a 
                            href="mailto:mdibrahimbd795@gmail.com" 
                            className="hover:text-red-400 transition duration-200"
                            title="Email"
                        >
                            <MdMailOutline />
                        </a>
                        
                        {/* Facebook (https://facebook.com/lalnishannd) */}
                        <a 
                            href="https://facebook.com/lalnishannd" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition duration-200"
                            title="Follow on Facebook"
                        >
                            <FaFacebookSquare />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}