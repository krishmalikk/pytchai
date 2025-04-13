import React from 'react';
import { TemplateProps } from './index';

export function StartupTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features,
  ctaText,
  ctaLink,
  showNav = true,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
      {/* Navigation */}
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <span className="font-mono text-lg tracking-tight" style={{ color: primaryColor }}>
                  {companyName}
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                {['Features', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="font-mono text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={ctaLink}
                  className="font-mono px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                  style={{ color: primaryColor }}
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
          <div className="relative">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: primaryColor }}></div>
            <div className="relative">
              <div className="font-mono text-sm text-gray-400 mb-4">
                <span className="text-gray-500">//</span> {companyName}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gray-400">const</span>{' '}
                <span style={{ color: primaryColor }}>tagline</span>{' '}
                <span className="text-gray-400">=</span>{' '}
                <span className="text-white">"{tagline}"</span>
              </h1>
              <div className="font-mono text-gray-400 mb-8">
                <span className="text-gray-500">/*</span>{' '}
                <span className="text-gray-300">{description}</span>{' '}
                <span className="text-gray-500">*/</span>
              </div>
              <a
                href={ctaLink}
                className="inline-flex items-center px-6 py-3 font-mono text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                style={{ color: primaryColor }}
              >
                {ctaText}
                <span className="ml-2 text-gray-400">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                {feature.icon && (
                  <div className="mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                )}
                <h3 className="font-mono text-lg mb-2" style={{ color: primaryColor }}>
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
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