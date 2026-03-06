
"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  MapPin, 
  Activity, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const mockResidents = [
  { id: 'res-001', name: 'Eleanor Vance', age: 82, room: '102-A', status: 'Stable', contact: '(555) 123-4567', admitted: '2023-01-15' },
  { id: 'res-002', name: 'Arthur Morgan', age: 79, room: '205-B', status: 'Observation', contact: '(555) 987-6543', admitted: '2023-05-22' },
  { id: 'res-003', name: 'Martha Stewart', age: 85, room: '110-A', status: 'Critical', contact: '(555) 555-0199', admitted: '2022-11-03' },
  { id: 'res-004', name: 'James Wilson', age: 81, room: '302', status: 'Stable', contact: '(555) 231-9988', admitted: '2024-02-10' },
  { id: 'res-005', name: 'Sarah Connor', age: 76, room: '108', status: 'Stable', contact: '(555) 776-5544', admitted: '2023-08-14' },
];

export default function ResidentsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = mockResidents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('residents')}</h2>
          <p className="text-muted-foreground">Manage resident profiles and assignments.</p>
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
              <TableHead className="w-[300px]">Resident</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResidents.map((resident) => (
              <TableRow key={resident.id} className="group hover:bg-muted/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/${resident.id}/100/100`} />
                      <AvatarFallback>{resident.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{resident.name}</p>
                      <p className="text-xs text-muted-foreground">{resident.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span className="font-medium">{resident.room}</span>
                  </div>
                </TableCell>
                <TableCell>{resident.age}</TableCell>
                <TableCell>
                  <Badge 
                    variant={resident.status === 'Critical' ? 'destructive' : resident.status === 'Observation' ? 'secondary' : 'default'}
                    className="font-semibold px-2"
                  >
                    {resident.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{resident.admitted}</span>
                  </div>
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
      
      {filteredResidents.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No residents found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
