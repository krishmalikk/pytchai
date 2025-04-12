import React from 'react';
import { TemplateProps } from './index';

export function DarkTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features = [],
  ctaText,
  ctaLink,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">{companyName || 'Company Name'}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a>
              <a
                href={ctaLink || '#'}
                className="px-4 py-2 rounded-md text-sm font-medium bg-opacity-20 hover:bg-opacity-30 transition-all text-white"
                style={{ backgroundColor: primaryColor || '#4F46E5' }}
              >
                {ctaText || 'Get Started'}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black"></div>
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${primaryColor}10 0%, transparent 50%)` }}></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {tagline || 'Your Tagline Here'}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {description || 'Your description here'}
          </p>
          <div className="mt-10">
            <a
              href={ctaLink || '#'}
              className="group px-8 py-3 rounded-md text-lg font-medium text-white inline-flex items-center space-x-2"
              style={{ backgroundColor: primaryColor || '#4F46E5' }}
            >
              <span>{ctaText || 'Get Started'}</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(features || []).map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
              >
                {feature.icon && (
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-opacity-20" 
                    style={{ backgroundColor: primaryColor || '#4F46E5' }}
                  >
                    <span className="text-2xl" style={{ color: primaryColor }}>{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title || 'Feature Title'}</h3>
                <p className="text-gray-400">{feature.description || 'Feature description'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 