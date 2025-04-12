import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const { startupDescription, industry, targetAudience } = await req.json();

    if (!startupDescription || !industry || !targetAudience) {
      throw new Error('Missing required fields');
    }

    try {
      console.log('Generating company info and branding...');
      // Generate company info and branding
      const brandingResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `You are a startup branding expert. Generate a company name and tagline based on the description provided. 
          Respond in JSON format with the following structure:
          {
            "companyName": "Name of the company",
            "tagline": "Compelling tagline"
          }`
        }, {
          role: "user",
          content: `Create a company name and tagline for this startup:\nDescription: ${startupDescription}\nIndustry: ${industry}\nTarget Audience: ${targetAudience}`
        }],
        response_format: { type: "json_object" }
      });

      console.log('Branding response received');
      const brandingContent = brandingResponse.choices[0].message.content;
      if (!brandingContent) {
        throw new Error('No branding content received from OpenAI');
      }

      const { companyName, tagline } = JSON.parse(brandingContent);

      try {
        console.log('Generating logo...');
        // Generate logo using DALL-E
        const logoResponse = await openai.images.generate({
          model: "dall-e-2",
          prompt: `Create a minimalist, professional logo for a company named ${companyName} in the ${industry} industry. Use a clean, modern style with simple shapes and typography. The logo should be on a white background.`,
          size: "1024x1024",
          quality: "standard",
          n: 1,
        });

        try {
          console.log('Generating pitch deck content...');
          // Generate pitch deck content
          const pitchResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
              role: "system",
              content: `You are a pitch deck expert. Generate comprehensive pitch deck content based on the startup description.
              Respond in JSON format with the following structure:
              {
                "problem": {
                  "description": "Clear problem statement",
                  "painPoints": ["3-4 specific pain points"],
                  "marketStats": ["2-3 relevant market statistics"]
                },
                "solution": {
                  "description": "Clear solution description",
                  "keyFeatures": ["4-5 key features"],
                  "techStack": ["Key technologies used"]
                },
                "market": {
                  "size": "Market size with specific numbers",
                  "trends": ["3-4 market trends"],
                  "targetCustomer": "Detailed target customer profile"
                },
                "businessModel": {
                  "revenueStreams": ["Multiple revenue streams"],
                  "pricing": "Pricing strategy",
                  "strategy": "Go-to-market strategy"
                },
                "competition": {
                  "competitors": [{"name": "Competitor", "pros": ["..."], "cons": ["..."]}],
                  "advantages": ["Your competitive advantages"]
                },
                "traction": {
                  "metrics": ["Key metrics"],
                  "milestones": ["Achieved and upcoming milestones"],
                  "testimonials": [{"quote": "...", "author": "..."}]
                },
                "team": [{"name": "Name", "role": "Role", "experience": "Background"}],
                "financials": {
                  "metrics": ["Key financial metrics"],
                  "projections": ["Financial projections"],
                  "funding": "Current funding status"
                },
                "ask": {
                  "amount": "Funding amount needed",
                  "use": ["How funds will be used"]
                }
              }`
            }, {
              role: "user",
              content: `Generate a detailed pitch deck content for:\nCompany: ${companyName}\nDescription: ${startupDescription}\nIndustry: ${industry}\nTarget Audience: ${targetAudience}`
            }],
            response_format: { type: "json_object" }
          });

          console.log('Processing pitch deck content...');
          const pitchContent = JSON.parse(pitchResponse.choices[0].message.content || '{}');

          const response = {
            companyName,
            tagline,
            description: startupDescription,
            problem: {
              statement: pitchContent.problem.description,
              painPoints: pitchContent.problem.painPoints,
            },
            solution: {
              description: pitchContent.solution.description,
              features: pitchContent.solution.keyFeatures,
              techStack: pitchContent.solution.techStack,
            },
            market: {
              size: pitchContent.market.size,
              trends: pitchContent.market.trends,
              targetCustomers: [pitchContent.market.targetCustomer],
            },
            businessModel: {
              revenueStreams: pitchContent.businessModel.revenueStreams,
              pricing: pitchContent.businessModel.pricing,
              customerAcquisition: pitchContent.businessModel.strategy,
            },
            competition: {
              competitors: pitchContent.competition.competitors.map((c: any) => c.name),
              advantages: pitchContent.competition.advantages,
            },
            traction: {
              metrics: pitchContent.traction.metrics,
              milestones: pitchContent.traction.milestones,
            },
            team: {
              members: pitchContent.team.map((member: any) => ({
                name: member.name,
                role: member.role,
                background: member.experience,
              })),
            },
            financials: {
              metrics: pitchContent.financials.metrics,
              projections: pitchContent.financials.projections,
              funding: pitchContent.financials.funding,
            },
            ask: {
              amount: pitchContent.ask.amount,
              use: pitchContent.ask.use,
            },
          };

          console.log('Sending response...');
          return NextResponse.json(response);
        } catch (pitchError: any) {
          console.error('Error generating pitch content:', pitchError);
          throw new Error(`Pitch generation failed: ${pitchError.message}`);
        }
      } catch (logoError: any) {
        console.error('Error generating logo:', logoError);
        throw new Error(`Logo generation failed: ${logoError.message}`);
      }
    } catch (brandingError: any) {
      console.error('Error generating branding:', brandingError);
      throw new Error(`Branding generation failed: ${brandingError.message}`);
    }
  } catch (error: any) {
    console.error('Error generating pitch deck:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate pitch deck',
        details: error.message,
        stack: error.stack,
        phase: error.message.includes('Branding') ? 'branding' :
               error.message.includes('Logo') ? 'logo' :
               error.message.includes('Pitch') ? 'pitch' : 'unknown'
      },
      { status: 500 }
    );
  }
} 