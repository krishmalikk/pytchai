'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const features = [
    {
      icon: "✨",
      title: "AI-Powered Website Generation",
      description: "Transform your startup idea into a professional website in seconds"
    },
    {
      icon: "🎨",
      title: "Multiple Design Templates",
      description: "Choose from various modern, professional templates that adapt to your brand"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "All generated websites are fully responsive and look great on any device"
    },
    {
      icon: "🚀",
      title: "Instant Preview",
      description: "See your website come to life instantly with real-time preview"
    },
    {
      icon: "🎯",
      title: "Industry-Specific Content",
      description: "Get tailored content suggestions based on your industry"
    },
    {
      icon: "💡",
      title: "Smart Features",
      description: "AI-optimized headlines, descriptions, and call-to-actions"
    }
  ];

  const handlePayment = async () => {
    // TODO: Implement Stripe payment
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.uid,
          email: user?.email,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center pt-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Start Creating Your
            <span className="text-orange-500"> Professional Website</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of startups who have transformed their ideas into stunning websites
          </p>

          {/* Pricing Card */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 transform hover:scale-105 transition-transform border border-gray-800">
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-5xl font-bold">$4</span>
              <span className="text-gray-400 ml-1">/month</span>
            </div>
            <p className="text-gray-400 mb-6">Generate unlimited previews. Pay only when you're satisfied.</p>
            <button
              onClick={handlePayment}
              className="w-full bg-orange-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-orange-700 transition-colors mb-6"
            >
              Get Started Now
            </button>
            <p className="text-sm text-gray-500">Secure payment powered by Stripe</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-left transform hover:scale-105 transition-transform border border-gray-800"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 