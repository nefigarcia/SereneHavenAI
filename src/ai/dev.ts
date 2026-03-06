import { config } from 'dotenv';
config();

import '@/ai/flows/generate-family-update-draft.ts';
import '@/ai/flows/suggest-activity-ideas.ts';
import '@/ai/flows/summarize-resident-health-logs.ts';