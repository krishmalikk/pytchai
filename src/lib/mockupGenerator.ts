import OpenAI from 'openai';

interface MockupGeneratorInput {
  startupDescription: string;
  industry?: string;
  targetAudience?: string;
}

interface MockupGeneratorOutput {
  companyName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  ctaText: string;
  ctaLink: string;
}

export async function generateMockup(input: MockupGeneratorInput): Promise<MockupGeneratorOutput> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
    Based on the following startup description, generate a website content structure.
    Make it compelling, modern, and focused on conversion.
    
    Startup Description: ${input.startupDescription}
    ${input.industry ? `Industry: ${input.industry}` : ''}
    ${input.targetAudience ? `Target Audience: ${input.targetAudience}` : ''}
    
    Generate a JSON response with the following structure:
    {
      "companyName": "A catchy, memorable name for the startup",
      "tagline": "A compelling headline that captures attention",
      "description": "A clear 1-2 sentence value proposition",
      "primaryColor": "A suitable brand color in hex format (e.g. #FF5500)",
      "features": [
        {
          "title": "Feature name",
          "description": "Brief feature description",
          "icon": "An emoji representing this feature"
        }
      ],
      "ctaText": "Compelling call-to-action text",
      "ctaLink": "/#signup"
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert startup website copywriter and designer. Generate compelling website content that drives conversion."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return response as MockupGeneratorOutput;
  } catch (error) {
    console.error('Error generating mockup:', error);
    throw new Error('Failed to generate mockup content');
  }
} 