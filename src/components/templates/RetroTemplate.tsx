import React from 'react';
import { TemplateProps } from './index';

export function RetroTemplate({
  companyName,
  tagline,
  description,
  primaryColor,
  features,
  ctaText,
  ctaLink,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#FDF6E9] text-[#2C1810]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[#2C1810]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="font-serif text-2xl tracking-tight" style={{ color: primaryColor }}>
                {companyName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {['Features', 'Pricing', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-widest hover:underline decoration-wavy decoration-2 underline-offset-4 transition-all"
                  style={{ textDecorationColor: primaryColor }}
                >
                  {item}
                </a>
              ))}
              <a
                href={ctaLink}
                className="px-6 py-2 text-sm uppercase tracking-widest border-2 hover:bg-[#2C1810] hover:text-[#FDF6E9] transition-colors"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-px w-full bg-[#2C1810]"></div>
              </div>
              <div className="relative text-center">
                <span className="px-4 text-sm uppercase tracking-[0.3em] bg-[#FDF6E9]">Est. 2024</span>
              </div>
            </div>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl mb-8 leading-tight">
            {tagline.split(' ').map((word, i) => (
              <span key={i} className="inline-block mx-2" style={{ color: i % 2 ? primaryColor : '#2C1810' }}>
                {word}
              </span>
            ))}
          </h1>
          <div className="flex justify-center mb-12">
            <div className="w-16 h-px mx-2" style={{ backgroundColor: primaryColor }}></div>
            <div className="w-16 h-px mx-2 bg-[#2C1810]"></div>
            <div className="w-16 h-px mx-2" style={{ backgroundColor: primaryColor }}></div>
          </div>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="mt-12">
            <a
              href={ctaLink}
              className="inline-flex items-center px-8 py-3 text-lg uppercase tracking-widest border-2 hover:bg-[#2C1810] hover:text-[#FDF6E9] transition-colors"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {ctaText}
              <span className="ml-4 text-2xl">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                {feature.icon && (
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 transform rotate-6 transition-transform group-hover:rotate-12">
                      <div className="w-16 h-16 mx-auto border-2 border-[#2C1810]"></div>
                    </div>
                    <div 
                      className="relative w-16 h-16 mx-auto border-2 flex items-center justify-center text-2xl transform -rotate-6 transition-transform group-hover:-rotate-12"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      {feature.icon}
                    </div>
                  </div>
                )}
                <h3 className="font-serif text-xl mb-4" style={{ color: primaryColor }}>
                  {feature.title}
                </h3>
                <div className="w-12 h-px mx-auto mb-4 bg-[#2C1810]"></div>
                <p className="text-[#2C1810]/80">
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