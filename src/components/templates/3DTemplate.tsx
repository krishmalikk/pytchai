import React from 'react';
import { TemplateProps } from './index';

export function ThreeDTemplate({
  companyName = 'Company Name',
  tagline = 'Your Tagline',
  description = 'Your description here',
  primaryColor = '#2563EB',
  features = [],
  ctaText = 'Get Started',
  ctaLink = '#',
  showNav = true,
}: TemplateProps) {
  // Ensure features is always an array and has at least 3 items for preview
  const previewFeatures = (features || []).map(feature => ({
    title: feature?.title || 'Feature',
    description: feature?.description || 'Description',
    icon: feature?.icon || '✨'
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto">
            <div className="mx-4 my-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
              <div className="flex justify-between items-center h-16 px-6">
                <div className="flex items-center">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}CC)` }}>
                    {companyName}
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  {['Features', 'Pricing', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href={ctaLink}
                    className="px-4 py-2 text-sm font-medium rounded-xl text-white shadow-lg transition-transform hover:scale-105"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className={`${showNav ? 'pt-32' : 'pt-16'} pb-20 px-4 sm:px-6 lg:px-8`}>
        <div className="absolute inset-0" style={{ 
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}10 0%, transparent 50%)`
        }}></div>
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-white/50 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-white/30 pointer-events-none"></div>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-8">
                {tagline}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                {description}
              </p>
              <div className="mt-10">
                <a
                  href={ctaLink}
                  className="inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all"
                  style={{ 
                    backgroundColor: primaryColor,
                    boxShadow: `0 4px 14px ${primaryColor}50`
                  }}
                >
                  {ctaText}
                  <svg className="ml-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 pointer-events-none"></div>
                {feature.icon && (
                  <div 
                    className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: primaryColor,
                      boxShadow: `0 4px 14px ${primaryColor}30`
                    }}
                  >
                    <span className="text-2xl text-white">{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 