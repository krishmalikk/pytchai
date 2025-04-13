import React from 'react';

interface TemplateProps {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor?: string;
  features?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  ctaText?: string;
  ctaLink?: string;
  showNav?: boolean;
}

export function ModernTemplate({
  companyName,
  tagline,
  description,
  primaryColor = '#f97316',
  features = [],
  ctaText = 'Get Started',
  ctaLink = '#',
  showNav = true,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      {showNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold">{companyName}</span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
                <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
                <a
                  href={ctaLink}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white"
                  style={{ backgroundColor: primaryColor }}
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
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            {tagline}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
          <div className="mt-10">
            <a
              href={ctaLink}
              className="px-8 py-3 rounded-md text-lg font-medium text-white inline-flex items-center"
              style={{ backgroundColor: primaryColor }}
            >
              {ctaText}
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features?.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {feature.icon && (
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${primaryColor}20` }}>
                    <span className="text-2xl" style={{ color: primaryColor }}>{feature.icon}</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 