import React from 'react';
import { TemplateProps } from './index';

export function FuturisticTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features,
  ctaText,
  ctaLink,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-xl font-light tracking-widest uppercase" style={{ color: primaryColor }}>
                {companyName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-light tracking-widest uppercase text-white/60 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={ctaLink}
                className="px-6 py-2 text-sm font-light tracking-widest uppercase border border-white/20 hover:border-white/40 transition-colors"
                style={{ color: primaryColor }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: primaryColor }}></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: primaryColor }}></div>
            </div>
            <div className="relative">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 mb-8">
                <div className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: primaryColor }}></div>
                <span className="text-sm font-light tracking-widest uppercase">The Future is Here</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-8">
                {tagline}
              </h1>
              <p className="text-xl text-white/60 mb-12 max-w-2xl">
                {description}
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href={ctaLink}
                  className="px-8 py-4 text-sm font-light tracking-widest uppercase border border-white/20 hover:border-white/40 transition-colors"
                  style={{ color: primaryColor }}
                >
                  {ctaText}
                </a>
                <a href="#features" className="text-sm font-light tracking-widest uppercase text-white/60 hover:text-white transition-colors">
                  Explore More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-widest uppercase mb-4">Advanced Features</h2>
            <div className="w-24 h-px mx-auto mb-4" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Experience the next generation of technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 border border-white/10 hover:border-white/20 transition-colors"
              >
                {feature.icon && (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                    <span className="text-2xl" style={{ color: primaryColor }}>{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-xl font-light tracking-widest uppercase mb-4" style={{ color: primaryColor }}>
                  {feature.title}
                </h3>
                <p className="text-white/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 