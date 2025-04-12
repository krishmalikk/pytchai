import React from 'react';
import type { PitchDeckProps } from './index';

export function ModernPitch({
  companyName,
  tagline,
  problem,
  solution,
  marketSize,
  businessModel,
  competition,
  traction,
  team,
  financials,
  askAmount,
  useOfFunds,
  primaryColor = '#2563EB',
}: PitchDeckProps) {
  const slides = [
    // Title Slide
    {
      title: companyName,
      content: (
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold mb-6">{companyName}</h1>
          <p className="text-2xl text-gray-600 max-w-3xl">{tagline}</p>
        </div>
      ),
    },
    // Problem Slide
    {
      title: "The Problem",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">The Problem</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{problem}</p>
        </div>
      ),
    },
    // Solution Slide
    {
      title: "Our Solution",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Our Solution</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{solution}</p>
        </div>
      ),
    },
    // Market Size Slide
    {
      title: "Market Opportunity",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Market Opportunity</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{marketSize}</p>
        </div>
      ),
    },
    // Business Model Slide
    {
      title: "Business Model",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Business Model</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{businessModel}</p>
        </div>
      ),
    },
    // Competition Slide
    {
      title: "Competition",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Competition</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{competition}</p>
        </div>
      ),
    },
    // Traction Slide
    {
      title: "Traction",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Traction</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{traction}</p>
        </div>
      ),
    },
    // Team Slide
    {
      title: "Team",
      content: (
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full" />
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.role}</p>
                <p className="text-sm text-gray-500 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Financials Slide
    {
      title: "Financials",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">Financials</h2>
          <div className="space-y-4">
            {financials.revenue && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Revenue</h3>
                <p className="text-gray-600">{financials.revenue}</p>
              </div>
            )}
            {financials.funding && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Current Funding</h3>
                <p className="text-gray-600">{financials.funding}</p>
              </div>
            )}
            {financials.projections && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Projections</h3>
                <p className="text-gray-600">{financials.projections}</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    // Ask Slide
    {
      title: "The Ask",
      content: (
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-8">The Ask</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Funding Goal</h3>
              <p className="text-xl text-gray-600">{askAmount}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Use of Funds</h3>
              <p className="text-xl text-gray-600">{useOfFunds}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-h-screen flex items-center justify-center py-16"
            style={{
              borderBottom: index < slides.length - 1 ? `2px solid ${primaryColor}20` : 'none'
            }}
          >
            <div className="w-full">
              {slide.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 