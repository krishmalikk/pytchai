import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { startupDescription, industry, targetAudience } = await req.json();

    if (!startupDescription || !industry || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      console.log('Generating company info and branding...');
      // Generate company info and branding
      const brandingResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{
          role: "system",
          content: `You are a startup branding expert. Generate a company name and tagline based on the description provided.`
        }, {
          role: "user",
          content: `Create a company name and tagline for this startup:\nDescription: ${startupDescription}\nIndustry: ${industry}\nTarget Audience: ${targetAudience}`
        }],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      });

      const brandingContent = brandingResponse.choices[0].message.content;
      if (!brandingContent) {
        throw new Error('No branding content received');
      }

      const { companyName, tagline } = JSON.parse(brandingContent);

      console.log('Generating pitch deck content...');
      // Generate pitch deck content
      const pitchResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{
          role: "system",
          content: `You are a pitch deck expert. Generate comprehensive pitch deck content based on the startup description.`
        }, {
          role: "user",
          content: `Generate a detailed pitch deck content for:\nCompany: ${companyName}\nDescription: ${startupDescription}\nIndustry: ${industry}\nTarget Audience: ${targetAudience}`
        }],
        temperature: 0.7,
        max_tokens: 2500,
        response_format: { type: "json_object" }
      });

      if (!pitchResponse.choices[0].message.content) {
        throw new Error('No pitch content received');
      }

      const pitchContent = JSON.parse(pitchResponse.choices[0].message.content);

      // Create a safe response with fallbacks
      const response = {
        companyName: companyName || 'Company Name',
        tagline: tagline || 'Company Tagline',
        description: startupDescription,
        problem: {
          statement: pitchContent.problem?.description || 'Problem statement',
          painPoints: Array.isArray(pitchContent.problem?.painPoints) ? pitchContent.problem.painPoints : ['Pain point 1'],
        },
        solution: {
          description: pitchContent.solution?.description || 'Solution description',
          features: Array.isArray(pitchContent.solution?.keyFeatures) ? pitchContent.solution.keyFeatures : ['Feature 1'],
          techStack: Array.isArray(pitchContent.solution?.techStack) ? pitchContent.solution.techStack : ['Technology 1'],
        },
        market: {
          size: pitchContent.market?.size || 'Market size',
          trends: Array.isArray(pitchContent.market?.trends) ? pitchContent.market.trends : ['Market trend 1'],
          targetCustomers: [pitchContent.market?.targetCustomer || 'Target customer profile'],
        },
        businessModel: {
          revenueStreams: Array.isArray(pitchContent.businessModel?.revenueStreams) ? pitchContent.businessModel.revenueStreams : ['Revenue stream 1'],
          pricing: pitchContent.businessModel?.pricing || 'Pricing strategy',
          customerAcquisition: pitchContent.businessModel?.strategy || 'Go-to-market strategy',
        },
        competition: {
          competitors: Array.isArray(pitchContent.competition?.competitors) ? pitchContent.competition.competitors.map((c: any) => c.name || 'Competitor') : ['Competitor 1'],
          advantages: Array.isArray(pitchContent.competition?.advantages) ? pitchContent.competition.advantages : ['Competitive advantage 1'],
        },
        traction: {
          metrics: Array.isArray(pitchContent.traction?.metrics) ? pitchContent.traction.metrics : ['Metric 1'],
          milestones: Array.isArray(pitchContent.traction?.milestones) ? pitchContent.traction.milestones : ['Milestone 1'],
        },
        team: {
          members: Array.isArray(pitchContent.team) ? pitchContent.team.map((member: any) => ({
            name: member.name || 'Team Member',
            role: member.role || 'Role',
            background: member.experience || 'Experience',
          })) : [{
            name: 'Team Member',
            role: 'Role',
            background: 'Experience',
          }],
        },
        financials: {
          metrics: Array.isArray(pitchContent.financials?.metrics) ? pitchContent.financials.metrics : ['Financial metric 1'],
          projections: Array.isArray(pitchContent.financials?.projections) ? pitchContent.financials.projections : ['Projection 1'],
          funding: pitchContent.financials?.funding || 'Current funding status',
        },
        ask: {
          amount: pitchContent.ask?.amount || 'Funding amount',
          use: Array.isArray(pitchContent.ask?.use) ? pitchContent.ask.use : ['Use of funds 1'],
        },
      };

      return NextResponse.json(response);
    } catch (error: any) {
      console.error('Error generating content:', error);
      return NextResponse.json(
        { error: 'Failed to generate content. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
} 