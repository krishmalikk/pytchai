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
                <p className="text-gray-600">{problem.mainProblem}</p>
                <ul className="mt-4 space-y-2">
                  {problem.painPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">• {point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Solution</h3>
                <p className="text-gray-600">{solution.coreSolution}</p>
                <ul className="mt-4 space-y-2">
                  {solution.keyFeatures.map((feature, index) => (
                    <li key={index} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Market Size</h3>
              <p className="text-gray-600 text-sm">TAM: {marketSize.tam}</p>
              <p className="text-gray-600 text-sm">SAM: {marketSize.sam}</p>
              <p className="text-gray-600 text-sm">SOM: {marketSize.som}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Business Model</h3>
              <p className="text-gray-600 text-sm">{businessModel.pricing.structure}</p>
              <ul className="mt-2 space-y-1">
                {businessModel.revenueStreams.map((stream, index) => (
                  <li key={index} className="text-gray-600 text-sm">• {stream}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Traction</h3>
              <p className="text-gray-600 text-sm">Users: {traction.currentMetrics.users}</p>
              <p className="text-gray-600 text-sm">Revenue: {traction.currentMetrics.revenue}</p>
              <p className="text-gray-600 text-sm">Growth: {traction.currentMetrics.growth}</p>
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
              <p className="text-gray-600">{marketSize.tam}</p>
              <div className="space-y-4">
                <p className="text-gray-600">Growth Rate: {marketSize.growthRate}</p>
                {marketSize.trends.map((trend, index) => (
                  <p key={index} className="text-gray-600">• {trend}</p>
                ))}
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ 
                  width: '75%',
                  backgroundColor: primaryColor 
                }} />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Competitive Landscape</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Direct Competitors</h4>
                  <ul className="space-y-1">
                    {competition.directCompetitors.map((competitor, index) => (
                      <li key={index} className="text-gray-600">• {competitor}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Our Advantages</h4>
                  <ul className="space-y-1">
                    {competition.advantages.map((advantage, index) => (
                      <li key={index} className="text-gray-600">• {advantage}</li>
                    ))}
                  </ul>
                </div>
              </div>
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
                <div className="w-20 h-20 rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">{member.name[0]}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                <div className="space-y-1">
                  {member.achievements.map((achievement, i) => (
                    <p key={i} className="text-xs text-gray-500">• {achievement}</p>
                  ))}
                </div>
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
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                  {financials.revenue.current}
                </p>
                <div className="space-y-2">
                  {financials.revenue.projections.map((projection, index) => (
                    <p key={index} className="text-sm text-gray-600">{projection}</p>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Funding History</h3>
                <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                  {financials.funding.current}
                </p>
                <p className="text-sm text-gray-600">Previous: {financials.funding.history}</p>
                <p className="text-sm text-gray-600">Valuation: {financials.funding.valuation}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">CAC: {financials.metrics.cac}</p>
                  <p className="text-sm text-gray-600">LTV: {financials.metrics.ltv}</p>
                  <p className="text-sm text-gray-600">Burn Rate: {financials.metrics.burnRate}</p>
                </div>
              </div>
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
              <p className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>{askAmount.total}</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  {askAmount.breakdown.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Timeline: {askAmount.timeline}</p>
                <p className="text-sm text-gray-600">Terms: {askAmount.terms}</p>
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  {useOfFunds.allocation.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Timeline: {useOfFunds.timeline}</p>
                <div className="space-y-2 mt-4">
                  <h4 className="font-medium">Key Milestones</h4>
                  {useOfFunds.milestones.map((milestone, index) => (
                    <p key={index} className="text-sm text-gray-600">• {milestone}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-32">
        {slides.map((slide, index) => (
          <div key={index} className="min-h-[600px] flex items-center">
            {slide.content}
          </div>
        ))}
      </div>
    </div>
  );
} 