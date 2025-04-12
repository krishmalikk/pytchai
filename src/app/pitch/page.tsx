'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getRandomPitchTemplate, pitchTemplates, type PitchDeckProps } from '@/components/pitch-templates';
import React from 'react';

const PitchDeckGenerator = () => {
  const [startupDescription, setStartupDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pitchData, setPitchData] = useState<PitchDeckProps | null>(null);
  const [error, setError] = useState('');
  const [templateIndex, setTemplateIndex] = useState(0);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError('');

      const response = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startupDescription,
          industry,
          targetAudience,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate pitch deck');
      }

      const data = await response.json();
      setPitchData(data);
      // Get a new random template for each generation
      setTemplateIndex(Math.floor(Math.random() * pitchTemplates.length));
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
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
            <button className="text-[#f97316] px-4 py-1">
              Log in
            </button>
            <button className="border border-[#f97316] text-[#f97316] px-4 py-1 rounded-md">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Input Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Generate Your
                <br />
                <span className="text-[#f97316]">Pitch Deck</span>
              </h1>
              <p className="text-gray-400">
                Describe your startup and we'll generate a professional pitch deck in seconds.
              </p>
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
                className="w-full bg-[#f97316] text-black py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Pitch Deck'}
              </button>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="bg-white rounded-lg overflow-hidden relative">
            {pitchData ? (
              <>
                <div className="w-full h-[800px] overflow-y-auto bg-white relative">
                  <div className="absolute inset-0 bg-black/5 pointer-events-none z-10"></div>
                  <div className="scale-[0.75] origin-top">
                    {React.createElement(pitchTemplates[templateIndex], pitchData)}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/10 to-transparent">
                  <button
                    onClick={() => {
                      const data = encodeURIComponent(JSON.stringify(pitchData));
                      window.open(`/pitch-preview?data=${data}&template=${templateIndex}`, '_blank');
                    }}
                    className="w-full bg-[#f97316] text-white py-3 rounded-lg font-medium hover:bg-[#ea580c] transition-colors"
                  >
                    View Full Pitch Deck
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Your pitch deck preview will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PitchDeckGenerator; 