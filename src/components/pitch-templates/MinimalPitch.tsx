import React from 'react';
import type { PitchDeckProps } from './index';

export function MinimalPitch({
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
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-24">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6" style={{ color: primaryColor }}>{companyName}</h1>
          <p className="text-2xl text-gray-600">{tagline}</p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>Problem</h2>
            <p className="text-gray-700 mb-4">{problem.mainProblem}</p>
            <ul className="space-y-2">
              {problem.painPoints.map((point, index) => (
                <li key={index} className="text-gray-600">• {point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>Solution</h2>
            <p className="text-gray-700 mb-4">{solution.coreSolution}</p>
            <ul className="space-y-2">
              {solution.keyFeatures.map((feature, index) => (
                <li key={index} className="text-gray-600">• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Market Size */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Market Size</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">TAM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.tam}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">SAM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.sam}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">SOM</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>{marketSize.som}</p>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Business Model</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Streams</h3>
              <ul className="space-y-2">
                {businessModel.revenueStreams.map((stream, index) => (
                  <li key={index} className="text-gray-600">• {stream}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Pricing</h3>
              <p className="text-gray-700 mb-2">{businessModel.pricing.structure}</p>
              <ul className="space-y-2">
                {businessModel.pricing.tiers.map((tier, index) => (
                  <li key={index} className="text-gray-600">• {tier}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Team</h2>
          <div className="grid grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financials */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Financials</h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Revenue</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>
                {financials.revenue.current}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Funding</h3>
              <p className="text-xl font-bold" style={{ color: primaryColor }}>
                {financials.funding.current}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Metrics</h3>
              <p className="text-gray-600">CAC: {financials.metrics.cac}</p>
              <p className="text-gray-600">LTV: {financials.metrics.ltv}</p>
            </div>
          </div>
        </div>

        {/* Ask */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>Investment Ask</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Amount</h3>
              <p className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>{askAmount.total}</p>
              <ul className="space-y-2">
                {askAmount.breakdown.map((item, index) => (
                  <li key={index} className="text-gray-600">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Use of Funds</h3>
              <ul className="space-y-2">
                {useOfFunds.allocation.map((item, index) => (
                  <li key={index} className="text-gray-600">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 