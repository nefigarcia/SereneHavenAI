
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  LayoutDashboard, 
  UserRound, 
  CreditCard, 
  Stethoscope, 
  Calendar, 
  Sparkles, 
  LogOut, 
  Menu,
  Globe,
  Bell
} from 'lucide-react';
import { useTranslation } from '@/app/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { label: t('dashboard'), icon: LayoutDashboard, href: '/dashboard' },
    { label: t('residents'), icon: UserRound, href: '/dashboard/residents' },
    { label: t('staff'), icon: Users, href: '/dashboard/staff' },
    { label: t('billing'), icon: CreditCard, href: '/dashboard/billing' },
    { label: t('health'), icon: Stethoscope, href: '/dashboard/health' },
    { label: t('activities'), icon: Calendar, href: '/dashboard/activities' },
    { label: t('ai_updates'), icon: Sparkles, href: '/dashboard/ai-updates' },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar className="border-r border-sidebar-border shadow-xl">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <Sparkles className="text-primary w-6 h-6" />
              </div>
              <h1 className="font-headline font-bold text-xl tracking-tight text-white">
                {t('app_name')}
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-all",
                      pathname === item.href 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-md" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            <div className="bg-sidebar-accent/50 rounded-xl p-4 flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/seed/admin/100/100" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">Admin User</p>
                <p className="text-xs text-white/70 truncate">admin@serenehaven.com</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 shrink-0">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="hidden md:block">
                <p className="text-muted-foreground text-sm font-medium">
                  {t('welcome_back')}, <span className="text-foreground">Staff Member</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 rounded-full border-muted text-foreground">
                    <Globe className="w-4 h-4" />
                    {language === 'en' ? 'English' : 'Español'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('es')}>
                    Español
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="rounded-full relative text-muted-foreground hover:text-primary">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-background/50">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
