import { NextResponse } from 'next/server';
import { templates } from '@/components/templates';

export async function POST(request: Request) {
  try {
    const { mockupData, templateIndex } = await request.json();

    // Get the selected template
    const Template = templates[templateIndex];
    
    // Generate the code (this is a simplified version - you might want to expand this)
    const code = `
import React from 'react';

export default function Website() {
  return (
    <div>
      <header>
        <h1>${mockupData.companyName}</h1>
        <p>${mockupData.tagline}</p>
      </header>
      
      <main>
        <section>
          <p>${mockupData.description}</p>
        </section>
        
        <section>
          ${mockupData.features?.map((feature: any) => `
            <div>
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `).join('')}
        </section>
      </main>
    </div>
  );
}
`;

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error generating code:', error);
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    );
  }
} 