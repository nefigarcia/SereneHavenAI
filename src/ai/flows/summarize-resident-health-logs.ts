'use server';
/**
 * @fileOverview A Genkit flow for summarizing resident health log entries.
 *
 * - summarizeResidentHealthLogs - A function that generates a concise summary of a resident's health logs.
 * - SummarizeResidentHealthLogsInput - The input type for the summarizeResidentHealthLogs function.
 * - SummarizeResidentHealthLogsOutput - The return type for the summarizeResidentHealthLogs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getResidentHealthLogs, HealthLogEntry} from '@/ai/services/mock-health-log-service';

const SummarizeResidentHealthLogsInputSchema = z.object({
  residentId: z.string().describe('The unique identifier for the resident.'),
  startDate:
    z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe('The start date for the health log period in YYYY-MM-DD format.'),
  endDate:
    z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe('The end date for the health log period in YYYY-MM-DD format.'),
});
export type SummarizeResidentHealthLogsInput = z.infer<typeof SummarizeResidentHealthLogsInputSchema>;

const SummarizeResidentHealthLogsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the resident\u0027s health logs for the specified period.'),
  keyEvents: z.array(z.string()).describe('A list of significant health events or changes identified in the logs.'),
});
export type SummarizeResidentHealthLogsOutput = z.infer<typeof SummarizeResidentHealthLogsOutputSchema>;

export async function summarizeResidentHealthLogs(
  input: SummarizeResidentHealthLogsInput
): Promise<SummarizeResidentHealthLogsOutput> {
  return summarizeResidentHealthLogsFlow(input);
}

const summarizeResidentHealthLogsPrompt = ai.definePrompt({
  name: 'summarizeResidentHealthLogsPrompt',
  input: {
    schema: SummarizeResidentHealthLogsInputSchema.extend({
      formattedHealthLogs: z.string().describe('A string representation of the health log entries.'),
    }),
  },
  output: {schema: SummarizeResidentHealthLogsOutputSchema},
  prompt: `You are a staff supervisor at SereneHaven Suite. Your task is to review the health logs for Resident {{{residentId}}} from {{{startDate}}} to {{{endDate}}} and provide a concise summary, highlighting key events, significant changes, or patterns in their health status.

Analyze the provided health logs below and generate a summary and a list of key events in the specified JSON format.

Health Logs:
{{{formattedHealthLogs}}}

Please provide the response in a JSON object with the following structure:
{{jsonSchema SummarizeResidentHealthLogsOutputSchema}}`,
});

const summarizeResidentHealthLogsFlow = ai.defineFlow(
  {
    name: 'summarizeResidentHealthLogsFlow',
    inputSchema: SummarizeResidentHealthLogsInputSchema,
    outputSchema: SummarizeResidentHealthLogsOutputSchema,
  },
  async input => {
    // Fetch health logs using the mock service
    const healthLogs: HealthLogEntry[] = await getResidentHealthLogs(
      input.residentId,
      input.startDate,
      input.endDate
    );

    // Format health logs into a single string for the prompt
    const formattedHealthLogs = healthLogs
      .map(log => `Date: ${log.date}\nEvent: ${log.event}\nDetails: ${log.details}`)
      .join('\n---\n'); // Use a separator for readability in the prompt

    if (healthLogs.length === 0) {
      return {
        summary: `No health log entries found for Resident ${input.residentId} between ${input.startDate} and ${input.endDate}.`,
        keyEvents: [],
      };
    }

    const {output} = await summarizeResidentHealthLogsPrompt({
      residentId: input.residentId,
      startDate: input.startDate,
      endDate: input.endDate,
      formattedHealthLogs: formattedHealthLogs,
    });

    if (!output) {
      throw new Error('Failed to generate summary from the AI model.');
    }

    return output;
  }
);
