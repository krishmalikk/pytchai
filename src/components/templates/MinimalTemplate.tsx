import React from 'react';
import { TemplateProps } from './index';

export function MinimalTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features,
  ctaText,
  ctaLink,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white font-light">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-lg tracking-tight">{companyName}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-black">Features</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-black">Pricing</a>
              <a href="#contact" className="text-sm text-gray-600 hover:text-black">Contact</a>
              <a
                href={ctaLink}
                className="text-sm border-b-2 pb-1 transition-colors"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-black mb-8 leading-tight">
            {tagline}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
          <div className="mt-12 inline-block">
            <a
              href={ctaLink}
              className="group inline-flex items-center space-x-4 text-lg font-light"
              style={{ color: primaryColor }}
            >
              <span className="border-b-2 pb-1 transition-colors" style={{ borderColor: primaryColor }}>
                {ctaText}
              </span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" 
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-3">
                  {feature.icon && (
                    <span className="text-2xl" style={{ color: primaryColor }}>
                      {feature.icon}
                    </span>
                  )}
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed pl-9">
                  {feature.description}
                </p>
                <div 
                  className="h-px w-12 ml-9"
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