'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    // After 3 seconds, redirect to the pricing page
    const timer = setTimeout(() => {
      router.push('/pricing');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <div className="bg-red-500/10 p-4 rounded-full">
              <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">Payment Cancelled</h1>
          <p className="text-gray-400">
            Your payment was cancelled. No charges were made to your account.
          </p>
          
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting you back to pricing...
          </div>

          <Link 
            href="/pricing"
            className="block w-full bg-[#f97316] text-black py-3 rounded-lg font-medium hover:bg-[#ea580c] transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
} 