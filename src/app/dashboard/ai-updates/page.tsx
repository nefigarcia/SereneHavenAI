
"use client";

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  UserCircle, 
  FileText, 
  Copy, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { generateFamilyUpdateDraft } from '@/ai/flows/generate-family-update-draft';
import { useToast } from '@/hooks/use-toast';

const mockResidents = [
  { id: 'res-001', name: 'Eleanor Vance' },
  { id: 'res-002', name: 'Arthur Morgan' },
  { id: 'res-003', name: 'Martha Stewart' },
];

export default function AIUpdatesPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedResident, setSelectedResident] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!selectedResident) return;

    setIsGenerating(true);
    try {
      const resident = mockResidents.find(r => r.id === selectedResident);
      const result = await generateFamilyUpdateDraft({
        residentName: resident?.name || 'Resident',
        recentHealthLogs: [
          "Blood pressure stable at 120/80.",
          "Completed morning light exercise session.",
          "Reported sleeping well through the night."
        ],
        recentActivityEntries: [
          "Participated in the community garden planting.",
          "Attended Sunday brunch and socialized with peers.",
          "Engaged in the weekly board game tournament."
        ]
      });
      setDraft(result.updateMessage);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate draft. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Draft message copied to clipboard."
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('ai_updates')}</h2>
          <p className="text-muted-foreground">Draft compassionate family messages with AI assistance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Step 1: Context</CardTitle>
            <CardDescription>Select a resident to pull recent event logs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resident</label>
              <Select onValueChange={setSelectedResident}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Choose resident" />
                </SelectTrigger>
                <SelectContent>
                  {mockResidents.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 rounded-xl bg-muted/50 border space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Highlights</p>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                <p className="text-xs">Healthy appetite noted.</p>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle2 className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                <p className="text-xs">Active participation in gardening.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full gap-2 rounded-full" 
              onClick={handleGenerate} 
              disabled={!selectedResident || isGenerating}
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Draft
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Step 2: Review & Send</CardTitle>
                <CardDescription>AI-generated message based on recent activities.</CardDescription>
              </div>
              {draft && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-primary hover:bg-primary/5">
                  {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {draft ? (
              <Textarea 
                value={draft} 
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-[300px] text-base leading-relaxed p-4 rounded-xl border-none bg-muted/20" 
              />
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4 bg-muted/10 rounded-xl border-2 border-dashed border-muted">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">No draft generated yet</p>
                  <p className="text-sm text-muted-foreground/60">Select a resident and click generate to start.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-end border-t pt-6">
            <Button variant="outline" className="mr-2 rounded-full" disabled={!draft}>Discard</Button>
            <Button className="gap-2 rounded-full shadow-lg" disabled={!draft}>
              <Send className="w-4 h-4" />
              Send Update
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
