'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // After 3 seconds, redirect to the generation page
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="bg-green-500/10 p-4 rounded-full">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-gray-400">
            Thank you for your purchase. You can now generate your website and pitch deck.
          </p>
          
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting you in a few seconds...
          </div>

          <Link 
            href="/"
            className="block w-full bg-[#f97316] text-black py-3 rounded-lg font-medium hover:bg-[#ea580c] transition-colors"
          >
            Generate Now
          </Link>
        </div>
      </div>
    </main>
  );
} 