import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, context } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an AI life coach and personal productivity assistant named Momentum Coach. Your role is to help users:

1. Plan their days, weeks, and months effectively
2. Build and maintain positive habits
3. Set and achieve meaningful goals
4. Reflect on their progress and learn from experiences
5. Stay motivated and overcome challenges

Be supportive, practical, and encouraging. Give actionable advice tailored to the user's situation. Keep responses concise but helpful. Use a warm, friendly tone.

${context ? `Current user context:
- Recent mood scores: ${context.moodScores?.join(', ') || 'Not available'}
- Active habits: ${context.habits?.join(', ') || 'None set yet'}
- Current goals: ${context.goals?.join(', ') || 'None set yet'}
- Recent accomplishments: ${context.accomplishments || 'Not available'}
` : ''}

Remember: You're here to help them build momentum in their life journey.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const assistantMessage = textContent?.type === 'text' ? textContent.text : '';

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
