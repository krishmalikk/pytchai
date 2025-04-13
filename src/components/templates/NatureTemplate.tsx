import React from 'react';
import { TemplateProps } from './index';

export function NatureTemplate({
  companyName = 'Company Name',
  tagline = '',
  description = 'Your description here',
  primaryColor = '#4CAF50',
  features = [],
  ctaText = 'Get Started',
  ctaLink = '#',
  showNav = true,
}: TemplateProps) {
  // Ensure features is always an array and has at least 3 items for preview
  const previewFeatures = (features || []).slice(0, 3).map(feature => ({
    title: feature?.title || 'Feature',
    description: feature?.description || 'Description',
    icon: feature?.icon || '🌱'
  }));

  return (
    <div className="min-h-screen bg-[#F8F9F7] text-[#2C3E50]">
      {/* Navigation */}
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9F7]/80 backdrop-blur-md border-b border-[#2C3E50]/10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <span className="text-xl font-medium tracking-tight" style={{ color: primaryColor }}>
                  {companyName}
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {['Features', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={ctaLink}
                  className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
                  style={{ backgroundColor: primaryColor, color: 'white' }}
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section */}
      <section className={`${showNav ? 'pt-32' : 'pt-16'} pb-20 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/50 mb-6">
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: primaryColor }}></div>
                <span className="text-sm font-medium text-[#2C3E50]/70">Natural & Organic</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-medium text-[#2C3E50] mb-6">
                {tagline}
              </h1>
              <p className="text-lg text-[#2C3E50]/70 mb-8">
                {description}
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href={ctaLink}
                  className="px-6 py-3 text-sm font-medium rounded-full transition-colors"
                  style={{ backgroundColor: primaryColor, color: 'white' }}
                >
                  {ctaText}
                </a>
                <a href="#features" className="text-sm font-medium text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors">
                  Learn More →
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
              <div className="relative p-8 bg-white/50 rounded-3xl backdrop-blur-sm">
                <div className="space-y-6">
                  {previewFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: `${primaryColor}10` }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-[#2C3E50]">{feature.title}</h3>
                        <p className="text-sm text-[#2C3E50]/70">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-[#2C3E50] mb-4">Natural Features</h2>
            <div className="w-24 h-px mx-auto mb-4" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg text-[#2C3E50]/70 max-w-2xl mx-auto">
              Discover our organic approach to innovation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white/50 rounded-3xl backdrop-blur-sm hover:bg-white/70 transition-colors"
              >
                {feature.icon && (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${primaryColor}10` }}>
                    <span className="text-xl" style={{ color: primaryColor }}>{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-lg font-medium text-[#2C3E50] mb-3">{feature.title}</h3>
                <p className="text-[#2C3E50]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 