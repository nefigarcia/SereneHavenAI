"use client";

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Search,
  ChevronRight,
  Music,
  HeartPulse,
  Palette,
  Coffee
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const mockActivities = [
  { 
    id: 'act-001', 
    name: 'Morning Yoga', 
    time: '08:30 AM', 
    location: 'Garden Lounge', 
    attendance: 15, 
    category: 'Wellness', 
    icon: HeartPulse,
    color: 'bg-green-500'
  },
  { 
    id: 'act-002', 
    name: 'Watercolor Painting', 
    time: '10:30 AM', 
    location: 'Art Studio', 
    attendance: 8, 
    category: 'Creative', 
    icon: Palette,
    color: 'bg-purple-500'
  },
  { 
    id: 'act-003', 
    name: 'Sunday Brunch Social', 
    time: '11:30 AM', 
    location: 'Main Dining Hall', 
    attendance: 45, 
    category: 'Social', 
    icon: Coffee,
    color: 'bg-orange-500'
  },
  { 
    id: 'act-004', 
    name: 'Classical Piano Night', 
    time: '06:00 PM', 
    location: 'Conservatory', 
    attendance: 22, 
    category: 'Entertainment', 
    icon: Music,
    color: 'bg-blue-500'
  }
];

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('activities')}</h2>
          <p className="text-muted-foreground">Engaging events for our resident community.</p>
        </div>
        <Button className="gap-2 rounded-full shadow-lg">
          <Plus className="w-4 h-4" />
          Schedule Event
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl shadow-sm border-none">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search activities..." 
            className="pl-10 bg-background border-none rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">Today</Button>
          <Button variant="outline" size="sm" className="rounded-full">Week</Button>
          <Button variant="outline" size="sm" className="rounded-full">Month</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {mockActivities.map((activity) => (
          <Card key={activity.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className={cn("p-2 rounded-xl text-white shadow-sm", activity.color)}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                  {activity.category}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                {activity.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3" />
                {activity.time}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="p-1.5 bg-muted rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                {activity.location}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <div className="p-1.5 bg-muted rounded-md">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                {activity.attendance} Residents Expected
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 rounded-lg px-2">
                <span className="text-xs font-semibold">View Details</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-accent text-accent-foreground p-8 rounded-3xl overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 font-headline tracking-tight">Need Activity Ideas?</h3>
            <p className="text-accent-foreground/80 text-lg">
              Our AI can suggest personalized activities based on resident preferences, mobility levels, and even current weather conditions.
            </p>
          </div>
          <Button size="lg" className="bg-white text-accent hover:bg-white/90 rounded-full font-bold shadow-xl gap-2 h-14 px-8">
            <CalendarIcon className="w-5 h-5" />
            AI Suggestion Tool
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </Card>
    </div>
  );
}
