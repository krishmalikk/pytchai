import React from 'react';
import { TemplateProps } from './index';

export function CreativeTemplate({
  companyName,
  tagline = '',
  description,
  primaryColor,
  features = [],
  ctaText,
  ctaLink,
}: TemplateProps) {
  const taglineWords = tagline.split(' ');
  const firstWord = taglineWords[0] || '';
  const restOfTagline = taglineWords.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 z-0 opacity-50">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ backgroundColor: `${primaryColor}15` }}></div>
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full" style={{ backgroundColor: `${primaryColor}10` }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold italic" style={{ color: primaryColor }}>
                {companyName || 'Company Name'}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors">
                Contact
              </a>
              <a
                href={ctaLink || '#'}
                className="relative px-6 py-2 overflow-hidden group"
              >
                <span className="relative z-10 text-white text-sm font-medium group-hover:text-white transition-colors">
                  {ctaText || 'Get Started'}
                </span>
                <div 
                  className="absolute inset-0 transform -skew-x-12"
                  style={{ backgroundColor: primaryColor || '#4F46E5' }}
                ></div>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold leading-tight">
              <span className="block transform -rotate-2 translate-y-4 italic" style={{ color: primaryColor }}>
                {firstWord}
              </span>
              <span className="block">
                {restOfTagline}
              </span>
            </h1>
            <p className="mt-12 text-xl text-gray-600 max-w-2xl leading-relaxed">
              {description || 'Your description here'}
            </p>
            <div className="mt-12">
              <a
                href={ctaLink || '#'}
                className="group inline-flex items-center text-lg font-medium relative overflow-hidden"
              >
                <span className="relative z-10 pr-4" style={{ color: primaryColor }}>
                  {ctaText || 'Get Started'}
                </span>
                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform"
                  style={{ backgroundColor: primaryColor || '#4F46E5' }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(features || []).map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300"
              >
                {feature.icon && (
                  <div className="absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/3">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl transform -rotate-12 opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: primaryColor || '#4F46E5' }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                  {feature.title || 'Feature Title'}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {feature.description || 'Feature description'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 