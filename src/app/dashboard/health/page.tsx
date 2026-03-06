"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Plus, 
  Stethoscope, 
  Calendar,
  User,
  Activity,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const mockLogs = [
  { id: 'log-001', resident: 'Eleanor Vance', date: '2024-10-23', type: 'Checkup', status: 'Normal', note: 'Vitals stable. Appetite improved.', recordedBy: 'Dr. Sarah Jenkins' },
  { id: 'log-002', resident: 'Arthur Morgan', date: '2024-10-23', type: 'Medication', status: 'Updated', note: 'Increased dosage for hypertension.', recordedBy: 'Nurse Lisa White' },
  { id: 'log-003', resident: 'Martha Stewart', date: '2024-10-22', type: 'Incident', status: 'Urgent', note: 'Minor slip in the garden. No fractures.', recordedBy: 'Mark Thompson' },
  { id: 'log-004', resident: 'James Wilson', date: '2024-10-22', type: 'Checkup', status: 'Normal', note: 'Routine physical therapy completed.', recordedBy: 'Elena Rodriguez' },
  { id: 'log-005', resident: 'Sarah Connor', date: '2024-10-21', type: 'Checkup', status: 'Observation', note: 'Reporting mild headaches in morning.', recordedBy: 'Nurse Lisa White' },
];

export default function HealthLogsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = mockLogs.filter(log => 
    log.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('health')}</h2>
          <p className="text-muted-foreground">Detailed medical and wellness records.</p>
        </div>
        <Button className="gap-2 rounded-full shadow-lg">
          <Plus className="w-4 h-4" />
          Add Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1 border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Daily Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Checkups Completed</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-2xl font-bold text-destructive">1</p>
                <p className="text-xs text-muted-foreground">Urgent Alert</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-none shadow-sm flex items-center p-6 gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by resident or log type..." 
              className="pl-10 bg-muted/20 border-none rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 rounded-lg border-muted">
            <Filter className="w-4 h-4" />
            Filter Logs
          </Button>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/10">
            <TableRow>
              <TableHead>Resident</TableHead>
              <TableHead>Date & Type</TableHead>
              <TableHead>Summary Note</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="group hover:bg-muted/5">
                <TableCell className="font-semibold">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {log.resident}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {log.date}
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold px-1.5 h-4">
                      {log.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <p className="text-sm line-clamp-2 italic text-muted-foreground">
                    "{log.note}"
                  </p>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-semibold px-2",
                      log.status === 'Urgent' ? "bg-red-100 text-red-700 hover:bg-red-100" : 
                      log.status === 'Normal' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                      "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    )}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {log.recordedBy}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
