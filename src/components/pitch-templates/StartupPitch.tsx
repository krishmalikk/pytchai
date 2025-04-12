import React from 'react';
import { motion } from 'framer-motion';
import { PitchDeckProps } from './index';

export function StartupPitch(props: PitchDeckProps) {
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white text-black">
      {/* Title Slide */}
      <motion.div 
        className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-black text-white"
        variants={slideVariants}
        initial="hidden"
        animate="visible"
      >
        {props.logoUrl && (
          <img src={props.logoUrl} alt="Company Logo" className="w-32 h-32 mb-8 object-contain" />
        )}
        <h1 className="text-5xl font-bold mb-4 text-center">{props.companyName}</h1>
        <p className="text-2xl text-[#f97316] mb-8">{props.tagline}</p>
      </motion.div>

      {/* Problem Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-white"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">The Problem</h2>
        <p className="text-xl mb-8 text-gray-700">{props.problem.mainProblem}</p>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-[#f97316]">Market Gaps</h3>
            <p className="text-gray-800">{props.problem.marketGaps}</p>
          </div>
          <div className="space-y-4">
            {props.problem.painPoints.map((point, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-800">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-8">
          {props.problem.statistics.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-800">{stat}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Solution Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-gray-50"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Solution</h2>
        <p className="text-xl mb-8 text-gray-700">{props.solution.coreSolution}</p>
        <div className="grid grid-cols-3 gap-6">
          {props.solution.keyFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-12 h-12 bg-[#f97316] rounded-full mb-4 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <p className="text-gray-800">{feature}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Market Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-white"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Market Opportunity</h2>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-2 text-[#f97316]">TAM</h3>
            <p className="text-gray-800">{props.marketSize.tam}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-2 text-[#f97316]">SAM</h3>
            <p className="text-gray-800">{props.marketSize.sam}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-2 text-[#f97316]">SOM</h3>
            <p className="text-gray-800">{props.marketSize.som}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {props.marketSize.trends.map((trend, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-800">{trend}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Business Model Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-gray-50"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Business Model</h2>
        <div className="grid grid-cols-2 gap-8 mb-8">
          {props.businessModel.revenueStreams.map((stream, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-800">{stream}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-[#f97316]">Pricing Structure</h3>
          <p className="text-xl text-gray-700">{props.businessModel.pricing.structure}</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {props.businessModel.pricing.tiers.map((tier, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{tier}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-white"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Team</h2>
        <div className="grid grid-cols-3 gap-8">
          {props.team.map((member, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-20 h-20 bg-[#f97316] rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name[0]}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
              <p className="text-[#f97316] font-medium mb-2">{member.role}</p>
              <p className="text-gray-700 mb-4">{member.bio}</p>
              <div className="space-y-2">
                {member.achievements.map((achievement, i) => (
                  <p key={i} className="text-sm text-gray-600">• {achievement}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ask Slide */}
      <motion.div 
        className="h-screen flex flex-col p-16 bg-gradient-to-br from-gray-900 to-black text-white"
        variants={slideVariants}
      >
        <h2 className="text-4xl font-bold mb-8">Investment Ask</h2>
        <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm mb-8">
          <h3 className="text-3xl font-bold mb-4 text-[#f97316]">{props.askAmount.total}</h3>
          <div className="space-y-4">
            {props.useOfFunds.allocation.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <p className="text-xl text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 