import React from 'react';
import type { PitchDeckProps } from './index';

export function InvestorPitch({
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
  primaryColor = '#0F172A',
}: PitchDeckProps) {
  const slides = [
    // Title Slide
    {
      content: (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-12 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: primaryColor }}>
              {companyName.charAt(0)}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6" style={{ color: primaryColor }}>{companyName}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">{tagline}</p>
        </div>
      ),
    },
    // Executive Summary
    {
      content: (
        <div>
          <div className="mb-12 pb-8 border-b" style={{ borderColor: `${primaryColor}20` }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Executive Summary</h2>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold mb-3">The Problem</h3>
                <p className="text-gray-600">{problem}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Solution</h3>
                <p className="text-gray-600">{solution}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Market Size</h3>
              <p className="text-gray-600 text-sm">{marketSize}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Business Model</h3>
              <p className="text-gray-600 text-sm">{businessModel}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Traction</h3>
              <p className="text-gray-600 text-sm">{traction}</p>
            </div>
          </div>
        </div>
      ),
    },
    // Market Analysis
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-12" style={{ color: primaryColor }}>Market Analysis</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Total Addressable Market</h3>
              <p className="text-gray-600">{marketSize}</p>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ 
                  width: '75%',
                  backgroundColor: primaryColor 
                }} />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Competitive Landscape</h3>
              <p className="text-gray-600">{competition}</p>
            </div>
          </div>
        </div>
      ),
    },
    // Team
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-12" style={{ color: primaryColor }}>Leadership Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 rounded-lg bg-gray-200 mb-4" />
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Financials
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-12" style={{ color: primaryColor }}>Financial Overview</h2>
          <div className="space-y-12">
            <div className="grid grid-cols-3 gap-8">
              {financials.revenue && (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                  <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                    {financials.revenue}
                  </p>
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <div className="h-full rounded-full" style={{ 
                      width: '60%',
                      backgroundColor: primaryColor 
                    }} />
                  </div>
                </div>
              )}
              {financials.funding && (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Current Funding</h3>
                  <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                    {financials.funding}
                  </p>
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <div className="h-full rounded-full" style={{ 
                      width: '40%',
                      backgroundColor: primaryColor 
                    }} />
                  </div>
                </div>
              )}
              {financials.projections && (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Projections</h3>
                  <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                    {financials.projections}
                  </p>
                  <div className="h-1 w-full bg-gray-200 rounded-full">
                    <div className="h-full rounded-full" style={{ 
                      width: '80%',
                      backgroundColor: primaryColor 
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    // Investment Opportunity
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-12" style={{ color: primaryColor }}>Investment Opportunity</h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Funding Ask</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>{askAmount}</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold">25%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ 
                    width: '25%',
                    backgroundColor: primaryColor 
                  }} />
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
              <p className="text-gray-600">{useOfFunds}</p>
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
            className="min-h-screen flex items-center py-16"
            style={{
              borderBottom: index < slides.length - 1 ? `1px solid ${primaryColor}10` : 'none'
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