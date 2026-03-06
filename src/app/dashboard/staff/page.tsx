"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  BadgeCheck, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const mockStaff = [
  { id: 'stf-001', name: 'Dr. Sarah Jenkins', role: 'Chief Medical Officer', dept: 'Medical', status: 'On Duty', contact: 's.jenkins@serenehaven.com', phone: '(555) 001-2233' },
  { id: 'stf-002', name: 'Mark Thompson', role: 'Head Nurse', dept: 'Nursing', status: 'On Duty', contact: 'm.thompson@serenehaven.com', phone: '(555) 001-2244' },
  { id: 'stf-003', name: 'Elena Rodriguez', role: 'Activity Coordinator', dept: 'Programs', status: 'Off Duty', contact: 'e.rodriguez@serenehaven.com', phone: '(555) 001-2255' },
  { id: 'stf-004', name: 'James Chen', role: 'Facility Manager', dept: 'Operations', status: 'On Duty', contact: 'j.chen@serenehaven.com', phone: '(555) 001-2266' },
  { id: 'stf-005', name: 'Lisa White', role: 'Registered Nurse', dept: 'Nursing', status: 'On Duty', contact: 'l.white@serenehaven.com', phone: '(555) 001-2277' },
];

export default function StaffPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = mockStaff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('staff')}</h2>
          <p className="text-muted-foreground">Manage facility personnel and schedules.</p>
        </div>
        <Button className="gap-2 rounded-full shadow-lg">
          <UserPlus className="w-4 h-4" />
          {t('add_new')}
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border border-none">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder={t('search')} 
            className="pl-10 bg-background border-none rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 rounded-lg border-muted">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[300px]">Staff Member</TableHead>
              <TableHead>Role & Dept</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((person) => (
              <TableRow key={person.id} className="group hover:bg-muted/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/${person.id}/100/100`} />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{person.name}</p>
                        {person.role.includes('Chief') && <BadgeCheck className="w-3 h-3 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{person.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{person.role}</p>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider py-0 px-1.5 h-4">
                      {person.dept}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>{person.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{person.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-semibold px-2",
                      person.status === 'On Duty' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-muted text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <div className={cn("w-1.5 h-1.5 rounded-full mr-2", person.status === 'On Duty' ? "bg-green-500" : "bg-muted-foreground")} />
                    {person.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="w-4 h-4" />
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
