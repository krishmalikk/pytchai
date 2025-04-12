import React from 'react';
import { TemplateProps } from './index';

export function GradientTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features,
  ctaText,
  ctaLink,
}: TemplateProps) {
  // Convert primary color to RGB for gradient manipulation
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(primaryColor);
  const gradientColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)` : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent" 
                style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}88)` }}>
                {companyName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">Pricing</a>
              <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">Contact</a>
              <a
                href={ctaLink}
                className="px-6 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)`,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${gradientColor} 0%, transparent 70%)`
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}aa)` }}>
            {tagline}
          </h1>
          <p className="mt-8 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="mt-12">
            <a
              href={ctaLink}
              className="group px-8 py-4 rounded-full text-lg font-medium text-white inline-flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)`,
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <span>{ctaText}</span>
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
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {feature.icon && (
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${gradientColor}, ${primaryColor}20)` 
                    }}
                  >
                    <span className="text-2xl" style={{ color: primaryColor }}>{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 