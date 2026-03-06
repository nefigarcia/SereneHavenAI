'use server';
/**
 * @fileOverview A Genkit flow that suggests engaging and diverse activity ideas for retirement home residents.
 *
 * - suggestActivityIdeas - A function that handles the activity suggestion process.
 * - SuggestActivityIdeasInput - The input type for the suggestActivityIdeas function.
 * - SuggestActivityIdeasOutput - The return type for the suggestActivityIdeas function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for suggesting activity ideas
const SuggestActivityIdeasInputSchema = z.object({
  residentPreferences: z
    .string()
    .describe(
      'A comma-separated list of resident interests and preferences (e.g., "gardening, board games, music, light exercise").'
    ),
  mobilityLevel: z
    .enum(['mobile', 'limited mobility', 'bedridden'])
    .describe('The general mobility level of the residents.'),
  currentWeather: z
    .string()
    .describe('A brief description of the current weather conditions (e.g., "sunny and warm", "rainy and cool").'),
  currentTemperature: z
    .number()
    .describe('The current temperature in Celsius.'),
  indoorOnly: z
    .boolean()
    .describe('True if only indoor activities are suitable, false otherwise.'),
});
export type SuggestActivityIdeasInput = z.infer<typeof SuggestActivityIdeasInputSchema>;

// Output schema for the suggested activity ideas
const ActivityIdeaSchema = z.object({
  name: z.string().describe('The name of the activity.'),
  description: z.string().describe('A brief description of the activity.'),
  category: z
    .enum(['Physical', 'Creative', 'Social', 'Educational', 'Relaxation', 'Outdoor'])
    .describe('The category of the activity.'),
  indoor: z.boolean().describe('True if the activity is indoor, false if outdoor.'),
});

const SuggestActivityIdeasOutputSchema = z.object({
  activities: z
    .array(ActivityIdeaSchema)
    .min(1)
    .max(5)
    .describe('A list of 3 to 5 diverse and engaging activity ideas.'),
});
export type SuggestActivityIdeasOutput = z.infer<typeof SuggestActivityIdeasOutputSchema>;

// Wrapper function for the Genkit flow
export async function suggestActivityIdeas(
  input: SuggestActivityIdeasInput
): Promise<SuggestActivityIdeasOutput> {
  return suggestActivityIdeasFlow(input);
}

// Define the Genkit prompt
const suggestActivityIdeasPrompt = ai.definePrompt({
  name: 'suggestActivityIdeasPrompt',
  input: { schema: SuggestActivityIdeasInputSchema },
  output: { schema: SuggestActivityIdeasOutputSchema },
  prompt: `You are an experienced activity coordinator for a retirement home named SereneHaven Suite. Your task is to suggest engaging, compassionate, and diverse activity ideas for the residents.\n  \n  Consider the following information carefully:\n  \n  Resident Preferences: {{{residentPreferences}}}\n  General Mobility Level: {{{mobilityLevel}}}\n  Current Weather Conditions: {{{currentWeather}}}\n  Current Temperature: {{{currentTemperature}}} degrees Celsius\n  Indoor Activities Only: {{{indoorOnly}}} (If true, only suggest indoor activities.)\n  \n  Based on this information, provide 3 to 5 distinct and suitable activity ideas. Each idea should include a name, a brief description, a category, and specify if it's an indoor or outdoor activity. Ensure the activities promote well-being and social engagement. If 'Indoor Activities Only' is true, do not suggest any outdoor activities.`,
});

// Define the Genkit flow
const suggestActivityIdeasFlow = ai.defineFlow(
  {
    name: 'suggestActivityIdeasFlow',
    inputSchema: SuggestActivityIdeasInputSchema,
    outputSchema: SuggestActivityIdeasOutputSchema,
  },
  async (input) => {
    const { output } = await suggestActivityIdeasPrompt(input);
    if (!output) {
      throw new Error('Failed to generate activity ideas.');
    }
    return output;
  }
);
