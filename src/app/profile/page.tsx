'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { StartupPitch } from '@/components/templates/StartupPitch';
import { PreviewWindow } from '@/components/PreviewWindow';
import Image from 'next/image';
import Link from 'next/link';

type GeneratedContent = {
  id: string;
  type: 'website' | 'pitchDeck';
  content: any;
  createdAt: Date;
  description: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeType, setActiveType] = useState<'website' | 'pitchDeck'>('website');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [selectedContent, setSelectedContent] = useState<GeneratedContent | null>(null);

  useEffect(() => {
    const fetchGeneratedContent = async () => {
      if (!user) return;

      const contentRef = collection(db, 'generated_content');
      const q = query(
        contentRef,
        where('userId', '==', user.uid),
        where('type', '==', activeType)
      );

      const querySnapshot = await getDocs(q);
      const content = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as GeneratedContent[];

      setGeneratedContent(content);
      if (content.length > 0) {
        setSelectedContent(content[0]);
      }
    };

    fetchGeneratedContent();
  }, [user, activeType]);

  const handleOpenFull = () => {
    if (!selectedContent) return;
    localStorage.setItem('generatedContent', JSON.stringify(selectedContent.content));
    window.open(`/view/${selectedContent.type}`, '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/torch.png"
              alt="Pytch Logo"
              width={24}
              height={24}
            />
            <span className="text-xl font-bold">Pytch</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/profile" className="text-[#f97316]">
              <div className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-24">
        {/* User Profile Section */}
        <div className="mb-12 bg-gray-800 rounded-xl p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#f97316] flex items-center justify-center text-2xl font-bold text-white">
                {user.email?.[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{user.displayName || 'User'}</h2>
                <p className="text-gray-400">{user.email}</p>
                <div className="mt-4 flex gap-4">
                  <div className="bg-gray-700 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-400">Member since</p>
                    <p className="font-medium">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="bg-gray-700 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-400">Last sign in</p>
                    <p className="font-medium">{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => auth.signOut()}
              className="text-[#f97316] px-4 py-2 rounded-lg border border-[#f97316] hover:bg-[#f97316] hover:text-black transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Your Generated Content</h2>
        
        {/* Type Toggle */}
        <div className="flex justify-center p-1 bg-gray-800 rounded-lg mb-8 max-w-xs">
          <button
            onClick={() => setActiveType('website')}
            className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeType === 'website' ? 'bg-[#f97316] text-black' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Websites
          </button>
          <button
            onClick={() => setActiveType('pitchDeck')}
            className={`w-1/2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeType === 'pitchDeck' ? 'bg-[#f97316] text-black' : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            Pitch Decks
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with content list */}
          <div className="space-y-4">
            {generatedContent.length === 0 ? (
              <p className="text-gray-400">No {activeType === 'website' ? 'websites' : 'pitch decks'} generated yet.</p>
            ) : (
              generatedContent.map((content) => (
                <button
                  key={content.id}
                  onClick={() => setSelectedContent(content)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedContent?.id === content.id
                      ? 'bg-[#f97316] text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <p className="font-medium truncate">{content.description}</p>
                  <p className="text-sm opacity-75">
                    {content.createdAt.toLocaleDateString()}
                  </p>
                </button>
              ))
            )}
          </div>

          {/* Preview area */}
          <div className="lg:col-span-3">
            {selectedContent ? (
              <PreviewWindow
                title={activeType === 'website' ? 'Website Preview' : 'Pitch Deck Preview'}
                onOpenFull={handleOpenFull}
              >
                {activeType === 'website' ? (
                  selectedContent.content ? (
                    <ModernTemplate {...selectedContent.content} showNav={false} />
                  ) : (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <p className="text-gray-400">Invalid website content</p>
                    </div>
                  )
                ) : (
                  selectedContent.content ? (
                    <StartupPitch {...selectedContent.content} />
                  ) : (
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <p className="text-gray-400">Invalid pitch deck content</p>
                    </div>
                  )
                )}
              </PreviewWindow>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <p className="text-gray-400">Select a {activeType} to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 