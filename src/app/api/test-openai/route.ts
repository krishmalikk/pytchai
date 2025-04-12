import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 50,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({
      success: true,
      message: response.choices[0].message.content,
      model: response.model,
    });
  } catch (error: any) {
    console.error('OpenAI API test failed:', error);
    
    const errorMessage = error.response?.data?.error?.message || error.message;
    const errorType = error.response?.data?.error?.type || error.type;
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        type: errorType,
        details: error.toString()
      },
      { status: 500 }
    );
  }
} 