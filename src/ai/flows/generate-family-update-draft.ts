'use server';
/**
 * @fileOverview A GenAI tool to assist staff in drafting compassionate and personalized update messages for family members.
 *
 * - generateFamilyUpdateDraft - A function that handles the generation of the family update draft.
 * - GenerateFamilyUpdateDraftInput - The input type for the generateFamilyUpdateDraft function.
 * - GenerateFamilyUpdateDraftOutput - The return type for the generateFamilyUpdateDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFamilyUpdateDraftInputSchema = z.object({
  residentName: z.string().describe("The full name of the resident."),
  recentHealthLogs: z.array(z.string()).describe("A list of recent health log entries for the resident."),
  recentActivityEntries: z.array(z.string()).describe("A list of recent activity entries for the resident."),
});
export type GenerateFamilyUpdateDraftInput = z.infer<typeof GenerateFamilyUpdateDraftInputSchema>;

const GenerateFamilyUpdateDraftOutputSchema = z.object({
  updateMessage: z.string().describe("A personalized and compassionate update message draft for the resident's family."),
});
export type GenerateFamilyUpdateDraftOutput = z.infer<typeof GenerateFamilyUpdateDraftOutputSchema>;

export async function generateFamilyUpdateDraft(input: GenerateFamilyUpdateDraftInput): Promise<GenerateFamilyUpdateDraftOutput> {
  return generateFamilyUpdateDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFamilyUpdateDraftPrompt',
  input: {schema: GenerateFamilyUpdateDraftInputSchema},
  output: {schema: GenerateFamilyUpdateDraftOutputSchema},
  prompt: `You are a compassionate and professional caregiver.
Your task is to draft a personalized update message for the family of a resident named {{{residentName}}}.

The message should be warm, informative, and reassuring, summarizing recent health logs and activity entries.
Avoid overly technical jargon and maintain a caring tone.

Here are the recent health logs:
{{#if recentHealthLogs}}
{{#each recentHealthLogs}}- {{{this}}}
{{/each}}
{{else}}
No recent health logs provided.
{{/if}}

Here are the recent activity entries:
{{#if recentActivityEntries}}
{{#each recentActivityEntries}}- {{{this}}}
{{/each}}
{{else}}
No recent activity entries provided.
{{/if}}

Please draft the update message:
`,
});

const generateFamilyUpdateDraftFlow = ai.defineFlow(
  {
    name: 'generateFamilyUpdateDraftFlow',
    inputSchema: GenerateFamilyUpdateDraftInputSchema,
    outputSchema: GenerateFamilyUpdateDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
