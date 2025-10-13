import { MdAccessTime, MdLink, MdCheckCircle, MdErrorOutline } from 'react-icons/md';

/**
 * স্ট্যাটাস অনুযায়ী Tailwind CSS ক্লাস নির্ধারণ করে
 * @param {string} status - 'Posted', 'Pending', 'Failed'
 */
const getStatusClasses = (status) => {
    switch (status) {
        case 'Posted':
            return 'bg-emerald-600 text-white';
        case 'Pending':
            return 'bg-yellow-500 text-gray-900';
        case 'Failed':
            return 'bg-red-600 text-white';
        default:
            return 'bg-slate-500 text-white';
    }
};

export default function ImageCard({ post }) {
    const statusClass = getStatusClasses(post.status);
    const time = post.hour ? post.hour.toString().padStart(2, '0') + ':00 UTC' : 'N/A';
    
    // Base64 ইমেজ ডাটা ডিসপ্লে (মক)
    const imageUrl = post.image_base64 && post.image_base64 !== 'placeholder' 
        ? `data:image/png;base64,${post.image_base64}` 
        : `https://placehold.co/400x400/1E293B/A8A8B3?text=${encodeURIComponent(post.category)}`;

    return (
        <div className="card-bg rounded-xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-indigo-500/50">
            <div className="relative h-48 w-full">
                <img 
                    src={imageUrl} 
                    alt={`AI Art: ${post.category}`}
                    className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2 right-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${statusClass}`}>
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
                    {post.fbPostId && post.status === 'Posted' && (
                        <a 
                            href={`https://facebook.com/${post.fbPostId}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center"
                            title="View on Facebook"
                        >
                            <MdLink className="mr-1" /> View Post
                        </a>
                    )}
                </div>
                
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    ক্যাপশন: {post.caption || post.prompt}
                </p>
            </div>
        </div>
    );
}