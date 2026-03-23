import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Type and data are required' },
        { status: 400 }
      );
    }

    let prompt = '';
    const systemPrompt = 'You are an AI assistant that analyzes personal productivity data and provides insights. Be concise, actionable, and encouraging.';

    switch (type) {
      case 'daily-briefing':
        prompt = `Based on the following data, create a brief morning briefing (3-5 sentences) to help the user start their day:

Today's priorities: ${data.priorities?.join(', ') || 'None set'}
Scheduled items: ${data.schedule?.filter((s: { content: string }) => s.content).map((s: { time: string; content: string }) => `${s.time}: ${s.content}`).join(', ') || 'None'}
Habits due today: ${data.habits?.join(', ') || 'None'}
Recent mood trend: ${data.moodTrend || 'Not available'}

Create a motivating, personalized briefing.`;
        break;

      case 'weekly-insights':
        prompt = `Analyze this week's data and provide insights:

Habits completed: ${data.habitsCompleted || 0}/${data.totalHabits || 0}
Current streaks: ${data.streaks?.join(', ') || 'None'}
Mood scores this week: ${data.moodScores?.join(', ') || 'Not available'}
Goals progress: ${data.goalsProgress || 'Not available'}
Review notes: ${data.reviewNotes || 'Not available'}

Provide 3-4 key insights about patterns, what's working well, and suggestions for improvement.`;
        break;

      case 'mood-analysis':
        prompt = `Analyze the following mood data and habit completions to find correlations:

Mood scores (last 14 days): ${data.moodScores?.join(', ') || 'Not available'}
Habit completions by day: ${JSON.stringify(data.habitsByDay) || 'Not available'}

Identify any patterns between habits and mood. What habits seem to correlate with better moods?`;
        break;

      case 'goal-suggestions':
        prompt = `Based on the user's current goals and habits, suggest improvements:

Current goals: ${data.goals?.join(', ') || 'None'}
Current habits: ${data.habits?.join(', ') || 'None'}
Life areas focus: ${data.lifeAreas?.join(', ') || 'All'}

Suggest 2-3 specific, actionable goals or habit modifications that could help them make progress.`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid insight type' },
          { status: 400 }
        );
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const insight = textContent?.type === 'text' ? textContent.text : '';

    return NextResponse.json({
      insight,
      type,
    });
  } catch (error) {
    console.error('Insights API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
