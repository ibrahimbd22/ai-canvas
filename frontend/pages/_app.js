import '../styles/globals.css';
import Head from 'next/head';

/**
 * Next.js অ্যাপ্লিকেশনের কাস্টম অ্যাপ কম্পোনেন্ট।
 * সমস্ত পেজ এই কম্পোনেন্টের মধ্যে রেন্ডার হয়।
 */
export default function App({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        {/*
          'Inter' ফন্ট লোড করার জন্য Google Fonts লিংক।
          Tailwind CSS-এ font-sans হিসেবে এটি ব্যবহার করা হবে।
        */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        {/* ভিউপোর্ট মেটা ট্যাগ, যা মোবাইল এবং ডেস্কটপ রেসপনসিভনেস নিশ্চিত করে */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Component হল বর্তমান পেজ (যেমন: index.js, history.js)।
        pageProps হল সার্ভার থেকে আসা ডেটা।
        আমরা এখানে কোনো কাস্টম প্রোভাইডার (যেমন: থিম বা অথেন্টিকেশন) ব্যবহার করছি না, 
        তাই সরাসরি কম্পোনেন্ট রেন্ডার করছি।
      */}
      <Component {...pageProps} />
    </>
  );
}