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
    // Problem
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>The Problem</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{problem.mainProblem}</p>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pain Points</h3>
              <ul className="space-y-3">
                {problem.painPoints.map((point, index) => (
                  <li key={index} className="text-gray-600">• {point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Market Gaps</h3>
              <p className="text-gray-600">{problem.marketGaps}</p>
              <div className="mt-4">
                {problem.statistics.map((stat, index) => (
                  <p key={index} className="text-gray-600 mt-2">• {stat}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Solution
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Our Solution</h2>
          <p className="text-xl text-gray-600 leading-relaxed">{solution.coreSolution}</p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {solution.keyFeatures.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: primaryColor }}>{index + 1}</span>
                </div>
                <p className="text-gray-800">{feature}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-4">
              {solution.techStack.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Market
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Market Opportunity</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">TAM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.tam}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">SAM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.sam}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">SOM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.som}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Market Trends</h3>
            <div className="grid grid-cols-2 gap-6">
              {marketSize.trends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Business Model
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Business Model</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
              <div className="space-y-4">
                {businessModel.revenueStreams.map((stream, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{stream}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Pricing Structure</h3>
              <p className="text-gray-700 mb-4">{businessModel.pricing.structure}</p>
              <div className="space-y-2">
                {businessModel.pricing.tiers.map((tier, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{tier}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Competition
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Competitive Analysis</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Direct Competitors</h3>
              <div className="space-y-3">
                {competition.directCompetitors.map((competitor, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{competitor}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Advantages</h3>
              <div className="space-y-3">
                {competition.advantages.map((advantage, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Traction
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Traction</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                {traction.currentMetrics.users}
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                {traction.currentMetrics.revenue}
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Growth</h3>
              <p className="text-2xl font-bold" style={{ color: primaryColor }}>
                {traction.currentMetrics.growth}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Milestones</h3>
              <div className="space-y-3">
                {traction.milestones.map((milestone, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Partnerships</h3>
              <div className="space-y-3">
                {traction.partnerships.map((partnership, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{partnership}</p>
                  </div>
                ))}
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
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Our Team</h2>
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
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Financial Overview</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current Revenue</h3>
              <p className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                {financials.revenue.current}
              </p>
              <div className="space-y-2">
                {financials.revenue.projections.map((projection, index) => (
                  <p key={index} className="text-sm text-gray-600">{projection}</p>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Funding</h3>
              <p className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                {financials.funding.current}
              </p>
              <p className="text-sm text-gray-600">History: {financials.funding.history}</p>
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
      ),
    },
    // Investment Ask
    {
      content: (
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>Investment Ask</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Funding Request</h3>
              <p className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>{askAmount.total}</p>
              <div className="space-y-3">
                {askAmount.breakdown.map((item, index) => (
                  <p key={index} className="text-gray-600">• {item}</p>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Timeline: {askAmount.timeline}</p>
                <p className="text-sm text-gray-600">Terms: {askAmount.terms}</p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
              <div className="space-y-3">
                {useOfFunds.allocation.map((item, index) => (
                  <p key={index} className="text-gray-600">• {item}</p>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Timeline: {useOfFunds.timeline}</p>
                <h4 className="font-medium mt-4 mb-2">Key Milestones</h4>
                {useOfFunds.milestones.map((milestone, index) => (
                  <p key={index} className="text-sm text-gray-600">• {milestone}</p>
                ))}
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