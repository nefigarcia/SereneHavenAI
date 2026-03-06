
"use client";

import React from 'react';
import { 
  UserRound, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const mockOccupancyData = [
  { name: 'Mon', value: 85 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 92 },
  { name: 'Thu', value: 90 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 94 },
  { name: 'Sun', value: 96 },
];

export default function DashboardOverview() {
  const { t } = useTranslation();

  const stats = [
    { title: t('total_residents'), value: '124', change: '+2', icon: UserRound, color: 'text-primary' },
    { title: t('pending_tasks'), value: '18', change: '-5', icon: Clock, color: 'text-accent' },
    { title: t('active_staff'), value: '42', change: '0', icon: Users, color: 'text-primary' },
    { title: t('revenue_month'), value: '$45.2k', change: '+12%', icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('dashboard')}</h2>
          <p className="text-muted-foreground">Monitoring your facility's health and operations.</p>
        </div>
        <div className="flex items-center gap-2 bg-card p-2 rounded-lg shadow-sm border">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">October 24, 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full",
                  stat.change.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Occupancy Rate (%)</CardTitle>
            <CardDescription>Resident room utilization over the last week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockOccupancyData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card p-2 border rounded-lg shadow-lg text-xs">
                          <p className="font-bold">{payload[0].payload.name}</p>
                          <p className="text-primary">{payload[0].value}% Occupancy</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {mockOccupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === mockOccupancyData.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Facility Vitals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Dietary Needs Met</span>
                <span className="text-primary">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Staff Punctuality</span>
                <span className="text-accent">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Maintenance Requests</span>
                <span className="text-destructive">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex gap-3 items-center">
                <Activity className="text-primary w-5 h-5" />
                <p className="text-sm font-semibold">Incident Alert</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Room 402 reported a minor plumbing issue. Maintenance has been dispatched.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
