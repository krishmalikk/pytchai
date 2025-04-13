'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomTemplate, templates, type TemplateProps } from '@/components/templates';
import React from 'react';
import { auth, hasUserPaid } from '@/lib/firebase';
import { User } from 'firebase/auth';
import AuthModal from '@/components/AuthModal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Sparkles, ArrowRight, CheckCircle, Shield, Zap, Lock } from 'lucide-react';
import { PreviewWindow } from '@/components/PreviewWindow';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { StartupPitch } from '@/components/templates/StartupPitch';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FAQ } from '@/components/FAQ';
import Footer from '@/components/Footer';

type OutputType = 'website' | 'pitchDeck';

export default function Home() {
  const { user, loading } = useAuth();
  const [startupDescription, setStartupDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mockupData, setMockupData] = useState<TemplateProps | null>(null);
  const [error, setError] = useState('');
  const [templateIndex, setTemplateIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [outputType, setOutputType] = useState<OutputType>('website');
  const [showCode, setShowCode] = useState(false);
  const [isPaywallEnabled, setIsPaywallEnabled] = useState(true);
  const [showFullVersion, setShowFullVersion] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const router = useRouter();

  // Add loading messages based on type
  const websiteLoadingMessages = [
    'Analyzing your startup description...',
    'Designing layout and structure...',
    'Generating hero section...',
    'Creating feature sections...',
    'Adding testimonials and CTAs...',
    'Optimizing for conversion...',
    'Finalizing design elements...'
  ];

  const pitchDeckLoadingMessages = [
    'Analyzing your startup...',
    'Creating compelling story...',
    'Designing title slide...',
    'Generating problem statement...',
    'Crafting solution slides...',
    'Adding market analysis...',
    'Creating financial projections...',
    'Finalizing pitch deck...'
  ];

  const updateLoadingState = (messages: string[]) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setLoadingMessage(messages[currentIndex]);
        setLoadingProgress(((currentIndex + 1) / messages.length) * 100);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return interval;
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (user) {
        const paid = await hasUserPaid(user.uid);
        setHasPaid(paid);
      }
    };

    checkPaymentStatus();
  }, [user]);

  const handleGenerate = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isPaywallEnabled) {
      const paid = await hasUserPaid(user.uid);
      if (!paid) {
        router.push('/pricing');
        return;
      }
    }

    setIsGenerating(true);
    setError('');
    setLoadingProgress(0);
    
    // Start loading messages based on output type
    const loadingInterval = updateLoadingState(
      outputType === 'website' ? websiteLoadingMessages : pitchDeckLoadingMessages
    );

    try {
      const endpoint = outputType === 'website' ? '/api/generate-mockup' : '/api/generate-pitch';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          outputType === 'website' 
            ? { description: startupDescription }
            : { startupDescription, industry, targetAudience }
        ),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data);
      setMockupData(data);
      
      if (outputType === 'website') {
        setTemplateIndex(Math.floor(Math.random() * templates.length));
      }

      // Save to Firebase
      const contentRef = collection(db, 'generated_content');
      await addDoc(contentRef, {
        userId: user.uid,
        type: outputType === 'website' ? 'website' : 'pitchDeck',
        content: data,
        description: startupDescription.slice(0, 100) + (startupDescription.length > 100 ? '...' : ''),
        createdAt: new Date(),
      });

      // Scroll to preview section after content is generated
      const previewSection = document.querySelector('.preview-section');
      if (previewSection) {
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      clearInterval(loadingInterval);
      setLoadingMessage('');
      setLoadingProgress(0);
      setIsGenerating(false);
    }
  };

  const handleCopyCode = async () => {
    if (!mockupData) return;
    
    try {
      const response = await fetch('/api/get-website-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mockupData,
          templateIndex,
        }),
      });

      if (!response.ok) throw new Error('Failed to get code');
      
      const { code } = await response.json();
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (error) {
      console.error('Error copying code:', error);
      setError('Failed to copy code');
    }
  };

  const handleDownloadPDF = async () => {
    if (!mockupData) return;
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mockupData,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pitch-deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setError('Failed to download PDF');
    }
  };

  const handleOpenFull = () => {
    // Store the generated content in localStorage
    localStorage.setItem('generatedContent', JSON.stringify(generatedContent));
    // Open the view page in a new tab
    window.open(`/view/${outputType}`, '_blank');
  };

  const CurrentTemplate = mockupData ? templates[templateIndex] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Loading Bar and Status */}
      {isGenerating ? (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-800">
            <div 
              className="h-full bg-[#f97316] transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="bg-black/90 text-center py-2 text-sm font-medium text-[#f97316]">
            {loadingMessage}
          </div>
        </div>
      ) : mockupData && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="h-1 bg-gray-800">
            <div className="h-full bg-green-500 w-full" />
          </div>
          <div className="bg-black/90 text-center py-2 text-sm font-medium text-green-500 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Generation Complete! View your {outputType === 'website' ? 'website' : 'pitch deck'} below
          </div>
        </motion.div>
      )}

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/images/torch.png"
              alt="Pytch Logo"
              width={24}
              height={24}
            />
            <span className="text-xl font-bold">Pytch</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </Link>
                <span className="text-gray-400">{user.email}</span>
                <button
                  onClick={() => auth.signOut()}
                  className="text-[#f97316] px-4 py-1 hover:text-[#ea580c] transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowAuthModal(true)} className="text-[#f97316] px-4 py-1 hover:text-[#ea580c] transition-colors">
                  Log in
                </button>
                <button onClick={() => setShowAuthModal(true)} className="border border-[#f97316] text-[#f97316] px-4 py-1 rounded-md hover:bg-[#f97316] hover:text-black transition-colors">
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {/* Input Form */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Generate Your
                <br />
                <span className="text-[#f97316]">{outputType === 'website' ? 'Startup Website' : 'Pitch Deck'}</span>
              </h1>
              <p className="text-gray-400">
                {outputType === 'website'
                  ? "Describe your startup and we'll generate a professional website mockup in seconds."
                  : "Describe your startup and we'll generate a compelling pitch deck structure."} 
              </p>
            </div>

            {/* Output Type Toggle */}
            <div className="flex justify-center p-1 bg-gray-800 rounded-lg">
              <button
                onClick={() => setOutputType('website')}
                className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${outputType === 'website' ? 'bg-[#f97316] text-black' : 'text-gray-400 hover:bg-gray-700'}`}
              >
                Website
              </button>
              <button
                onClick={() => setOutputType('pitchDeck')}
                className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${outputType === 'pitchDeck' ? 'bg-[#f97316] text-black' : 'text-gray-400 hover:bg-gray-700'}`}
              >
                Pitch Deck
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe your startup
                </label>
                <textarea
                  value={startupDescription}
                  onChange={(e) => setStartupDescription(e.target.value)}
                  className="w-full h-32 bg-gray-900 border border-gray-800 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-[#f97316] transition-colors"
                  placeholder="What does your startup do? What problem does it solve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Industry (optional)
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#f97316] transition-colors"
                  placeholder="e.g. SaaS, E-commerce, Healthcare"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Audience (optional)
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-[#f97316] transition-colors"
                  placeholder="e.g. Small business owners, developers"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !startupDescription.trim()}
                className="w-full bg-[#f97316] text-black py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ea580c] transition-colors"
              >
                {isGenerating ? 'Generating...' : `Generate ${outputType === 'website' ? 'Website' : 'Pitch Deck'}`}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="preview-section bg-gray-900 rounded-lg overflow-hidden shadow-xl relative border border-gray-800 min-h-[600px]">
            <div className="p-2 bg-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              {mockupData && (
                <div className="flex gap-2">
                  {outputType === 'website' && (
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 text-sm bg-[#f97316] hover:bg-[#ea580c] rounded-md text-white transition-colors"
                    >
                      Copy Code
                    </button>
                  )}
                  <button
                    onClick={handleOpenFull}
                    className="px-3 py-1 text-sm bg-[#f97316] hover:bg-[#ea580c] rounded-md text-white transition-colors flex items-center gap-1"
                  >
                    View Full Version
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {mockupData && CurrentTemplate ? (
              <div className="relative">
                <div className={`w-full transition-all duration-300 ${showCode ? 'h-[400px]' : 'h-[800px]'}`}>
                  <PreviewWindow
                    title={outputType === 'website' ? 'Website Preview' : 'Pitch Deck Preview'}
                    onOpenFull={handleOpenFull}
                  >
                    <div className="absolute inset-0 overflow-auto">
                      <div className={`${outputType === 'website' ? 'bg-white' : 'bg-[#1a1a1a]'} relative`}>
                        <div className="relative isolate">
                          {outputType === 'website' ? (
                            <div className="relative overflow-hidden">
                              <CurrentTemplate {...mockupData} showNav={false} />
                            </div>
                          ) : (
                            <StartupPitch {...mockupData} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PreviewWindow>
                </div>
                <div className="absolute top-4 right-4">
                  {outputType === 'website' && (
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-white transition-colors"
                    >
                      {showCode ? 'Hide Code' : 'View Code'}
                    </button>
                  )}
                </div>
                {showCode && outputType === 'website' && (
                  <div className="h-[400px] overflow-y-auto bg-gray-900 p-4">
                    <pre className="text-sm text-gray-300">
                      <code>
                        {/* This will be populated by the API response */}
                        {`// Loading code...
// The actual code will be fetched when you click "Copy Code"`}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <motion.div 
                key={outputType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 h-[760px] flex flex-col items-center justify-center ${
                  outputType === 'website' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'
                }`}
              >
                {outputType === 'website' ? (
                  <WebsitePreviewPlaceholder />
                ) : (
                  <PitchDeckPreviewPlaceholder />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 text-gray-400">Generate your website or pitch deck in seconds</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold">Beautiful Design</h3>
              <p className="mt-2 text-gray-400">Professional templates that look great on any device</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold">Easy Updates</h3>
              <p className="mt-2 text-gray-400">Modify and regenerate your content anytime</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold">Code Export</h3>
              <p className="mt-2 text-gray-400">Download the source code for your website</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold">Responsive</h3>
              <p className="mt-2 text-gray-400">Looks perfect on desktop, tablet, and mobile</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold">SEO Ready</h3>
              <p className="mt-2 text-gray-400">Built with best practices for search engines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Paywall Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsPaywallEnabled(!isPaywallEnabled)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isPaywallEnabled 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isPaywallEnabled ? 'Paywall: ON' : 'Paywall: OFF'}
        </button>
      </div>

      {/* Add FAQ section before the end of main content */}
      <FAQ />

      {/* Add Footer at the end */}
      <Footer />
    </main>
  );
}

// Placeholder for Website Preview
function WebsitePreviewPlaceholder() {
  return (
    <div className="w-full h-full border border-gray-200 rounded-md p-4 space-y-4 flex flex-col bg-gray-50">
      {/* Fake Nav */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
        <div className="h-6 w-24 bg-gray-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
      {/* Fake Hero */}
      <div className="flex-grow space-y-3">
        <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-10 w-32 bg-orange-400 rounded mt-2"></div>
      </div>
      {/* Fake Features */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-16 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder for Pitch Deck Preview
function PitchDeckPreviewPlaceholder() {
  return (
    <div className="w-full h-full border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <div className="h-8 w-48 bg-indigo-300 rounded mx-auto"></div> 
        <div className="h-12 w-72 bg-indigo-200 rounded mx-auto"></div> 
        <div className="h-6 w-56 bg-indigo-300 rounded mx-auto mt-2"></div> 
      </div>
      <div className="absolute bottom-4 right-4 text-sm font-medium text-indigo-400">Slide 1 / 10</div>
    </div>
  );
} 