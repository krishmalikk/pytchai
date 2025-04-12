import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate the response structure
function isValidResponse(data: any): boolean {
  return (
    data &&
    typeof data.companyName === 'string' &&
    typeof data.tagline === 'string' &&
    typeof data.description === 'string' &&
    typeof data.primaryColor === 'string' &&
    Array.isArray(data.features) &&
    data.features.length === 3 &&
    data.features.every(feature => 
      typeof feature.title === 'string' &&
      typeof feature.description === 'string'
    ) &&
    typeof data.ctaText === 'string' &&
    typeof data.ctaLink === 'string'
  );
}

export async function POST(request: Request) {
  try {
    // Log the API key existence (not the key itself)
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received request:', body);
    
    const { startupDescription, industry, targetAudience } = body;

    if (!startupDescription) {
      return NextResponse.json(
        { error: 'Startup description is required' },
        { status: 400 }
      );
    }

    const prompt = `Create engaging website content for a startup with the following details:
Description: ${startupDescription}
${industry ? `Industry: ${industry}` : ''}
${targetAudience ? `Target Audience: ${targetAudience}` : ''}

Generate a JSON object with the following structure:
{
  "companyName": "A catchy, memorable name for the startup",
  "tagline": "A short, impactful tagline that captures the value proposition",
  "description": "A compelling 2-3 sentence description that expands on the tagline",
  "primaryColor": "A suitable hex color code that matches the industry and brand feel (e.g. #FF5733)",
  "features": [
    {
      "title": "Feature name",
      "description": "Brief feature description",
      "icon": "A suitable emoji representing this feature"
    }
  ],
  "ctaText": "Compelling call-to-action text",
  "ctaLink": "#"
}

Requirements:
1. Generate exactly 3 features
2. Use a valid hex color code for primaryColor (e.g. #FF5733)
3. Keep the response in valid JSON format
4. Make content engaging and professional
5. Include an appropriate emoji icon for each feature
6. Ensure all text fields are properly filled
7. Return exactly 3 features, no more, no less`;

    try {
      console.log('Making OpenAI API call...');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional website copywriter and branding expert. Always respond with valid JSON that matches the requested structure exactly. Always include exactly 3 features."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }  // Ensure JSON response
      });

      const response = completion.choices[0].message.content;
      
      if (!response) {
        console.error('Empty response from OpenAI');
        return NextResponse.json(
          { error: 'Received empty response from OpenAI' },
          { status: 500 }
        );
      }

      console.log('Raw OpenAI response:', response);

      try {
        const parsedResponse = JSON.parse(response);
        console.log('Parsed response:', parsedResponse);

        // Ensure features array exists and has exactly 3 items
        if (!Array.isArray(parsedResponse.features) || parsedResponse.features.length !== 3) {
          parsedResponse.features = Array(3).fill({
            title: 'Feature',
            description: 'Description',
            icon: '✨'
          });
        }

        // Ensure all required fields exist
        const safeResponse = {
          companyName: parsedResponse.companyName || 'Company Name',
          tagline: parsedResponse.tagline || 'Your Tagline Here',
          description: parsedResponse.description || 'Your description here',
          primaryColor: parsedResponse.primaryColor || '#4F46E5',
          features: parsedResponse.features.map(f => ({
            title: f.title || 'Feature',
            description: f.description || 'Description',
            icon: f.icon || '✨'
          })),
          ctaText: parsedResponse.ctaText || 'Get Started',
          ctaLink: parsedResponse.ctaLink || '#'
        };

        return NextResponse.json(safeResponse);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response:', response);
        return NextResponse.json(
          { error: 'OpenAI returned invalid JSON format' },
          { status: 500 }
        );
      }
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      return NextResponse.json(
        { error: openaiError instanceof Error ? openaiError.message : 'OpenAI API error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 