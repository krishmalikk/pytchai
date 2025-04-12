import React from 'react';
import { motion } from 'framer-motion';

export interface PitchDeckProps {
  companyName: string;
  tagline: string;
  description: string;
  problem?: {
    statement: string;
    painPoints: string[];
  };
  solution?: {
    description: string;
    features: string[];
    techStack?: string[];
  };
  market?: {
    size: string;
    trends: string[];
    targetCustomers: string[];
  };
  businessModel?: {
    revenueStreams: string[];
    pricing: string;
    customerAcquisition: string;
  };
  competition?: {
    competitors: string[];
    advantages: string[];
  };
  traction?: {
    metrics: string[];
    milestones: string[];
  };
  team?: {
    members: Array<{
      name: string;
      role: string;
      background?: string;
    }>;
  };
  financials?: {
    metrics: string[];
    projections: string[];
    funding?: string;
  };
  ask?: {
    amount: string;
    use: string[];
  };
}

export function StartupPitch(props: PitchDeckProps) {
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen p-8">
      {/* Title Slide */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">{props.companyName}</h1>
        <p className="text-2xl text-gray-400 mb-8">{props.tagline}</p>
        <p className="text-lg max-w-2xl mx-auto">{props.description}</p>
      </div>

      {/* Problem Slide */}
      {props.problem && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">The Problem</h2>
          <p className="text-xl mb-8">{props.problem.statement}</p>
          <ul className="space-y-4">
            {props.problem.painPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Slide */}
      {props.solution && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Our Solution</h2>
          <p className="text-xl mb-8">{props.solution.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {props.solution.features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Market Slide */}
      {props.market && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Market Opportunity</h2>
          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <p className="text-2xl font-bold mb-2">Market Size</p>
            <p className="text-xl">{props.market.size}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Market Trends</h3>
              <ul className="space-y-4">
                {props.market.trends.map((trend, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Target Customers</h3>
              <ul className="space-y-4">
                {props.market.targetCustomers.map((customer, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{customer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Business Model Slide */}
      {props.businessModel && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Business Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Revenue Streams</h3>
              <ul className="space-y-4">
                {props.businessModel.revenueStreams.map((stream, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{stream}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Pricing Strategy</h3>
              <p>{props.businessModel.pricing}</p>
            </div>
          </div>
        </div>
      )}

      {/* Competition Slide */}
      {props.competition && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Competition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Competitors</h3>
              <ul className="space-y-4">
                {props.competition.competitors.map((competitor, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{competitor}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Advantages</h3>
              <ul className="space-y-4">
                {props.competition.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Team Slide */}
      {props.team && (
        <div className="min-h-screen flex flex-col justify-center mb-16">
          <h2 className="text-4xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {props.team.members.map((member, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-orange-500 mb-4">{member.role}</p>
                {member.background && (
                  <p className="text-gray-400">{member.background}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ask Slide */}
      {props.ask && (
        <div className="min-h-screen flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8">Investment Ask</h2>
          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <p className="text-2xl font-bold mb-4">Seeking</p>
            <p className="text-4xl text-orange-500 mb-8">{props.ask.amount}</p>
            <h3 className="text-2xl font-bold mb-4">Use of Funds</h3>
            <ul className="space-y-4">
              {props.ask.use.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 