"use client";

import React from 'react';
import { 
  CreditCard, 
  Download, 
  DollarSign, 
  FileText, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const mockInvoices = [
  { id: 'INV-4421', resident: 'Eleanor Vance', amount: 4500.00, status: 'Paid', date: '2024-10-01' },
  { id: 'INV-4422', resident: 'Arthur Morgan', amount: 3850.50, status: 'Pending', date: '2024-10-05' },
  { id: 'INV-4423', resident: 'Martha Stewart', amount: 5200.00, status: 'Overdue', date: '2024-09-28' },
  { id: 'INV-4424', resident: 'James Wilson', amount: 4100.00, status: 'Paid', date: '2024-10-02' },
];

export default function BillingPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline">{t('billing')}</h2>
          <p className="text-muted-foreground">Monitor facility finances and resident invoices.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-full border-muted">
            <Download className="w-4 h-4" />
            Report
          </Button>
          <Button className="gap-2 rounded-full shadow-lg">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-primary-foreground border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">+8% vs LY</Badge>
            </div>
            <p className="text-primary-foreground/70 text-sm font-medium">Monthly Revenue</p>
            <h3 className="text-3xl font-bold mt-1">$154,200.00</h3>
            <div className="mt-4 flex items-center gap-1 text-xs text-primary-foreground/80">
              <ArrowUpRight className="w-3 h-3" />
              <span>Target: $160,000.00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-accent/10 rounded-lg text-accent">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Pending Payments</p>
            <h3 className="text-3xl font-bold mt-1">$24,850.50</h3>
            <div className="mt-4 flex items-center gap-1 text-xs text-orange-600">
              <FileText className="w-3 h-3" />
              <span>12 Unpaid Invoices</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                <ArrowDownRight className="w-6 h-6" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Overdue Balance</p>
            <h3 className="text-3xl font-bold mt-1">$12,400.00</h3>
            <div className="mt-4 flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="w-3 h-3" />
              <span>5 Residents Flagged</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/10 border-b">
          <CardTitle className="text-lg">Recent Invoices</CardTitle>
          <CardDescription>A list of resident billings for the current cycle.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Resident</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-xs font-bold">{inv.id}</TableCell>
                <TableCell className="font-medium">{inv.resident}</TableCell>
                <TableCell className="font-semibold">${inv.amount.toLocaleString()}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "font-semibold",
                      inv.status === 'Paid' ? "bg-green-100 text-green-700 hover:bg-green-100" : 
                      inv.status === 'Overdue' ? "bg-red-100 text-red-700 hover:bg-red-100" : 
                      "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    )}
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
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
