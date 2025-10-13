/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // আমরা যেহেতু কোনো এক্সটার্নাল ইমেজের URL ব্যবহার করছি না, তাই 'images' কনফিগ খালি রাখা হলো।
  // যদি কোনোদিন কোনো CDN থেকে ছবি লোড করতে হয়, তবে এখানে 'domains' যোগ করতে হবে।
  images: {
    unoptimized: true, // Vercel-এ ইমেজ অপটিমাইজেশন ব্যবহারের জন্য এটি false করা যায়, কিন্তু ফ্রিতে unoptimized রাখা সহজ
  },
  // Environment variables কে ফ্রন্টএন্ডে এক্সপোজ করার জন্য
  env: {
    // helpers.js এ Facebook পোস্ট লিঙ্ক তৈরি করার জন্য এটি প্রয়োজন
    NEXT_PUBLIC_FB_PAGE_ID: process.env.FB_PAGE_ID, 
  }
}

module.exports = nextConfig
