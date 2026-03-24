'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  Target,
  CheckSquare,
  BarChart3,
  MessageSquare,
  Trophy,
  Settings,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';

const navItems = [
  { href: '/', label: 'Today', icon: Calendar },
  { href: '/weekly', label: 'Weekly', icon: CalendarDays },
  { href: '/monthly', label: 'Monthly', icon: CalendarRange },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/habits', label: 'Habits', icon: CheckSquare },
  { href: '/insights', label: 'Insights', icon: BarChart3 },
  { href: '/coach', label: 'AI Coach', icon: MessageSquare },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
];

const bottomItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { xpProgress } = useUser();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Icon Rail */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -64, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-16 flex flex-col',
          'bg-black border-r border-white/5',
          'lg:translate-x-0 lg:opacity-100 lg:static'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/5">
          <Link href="/" className="group relative">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
              }}
            >
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#111] border border-white/10 text-xs text-white px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Momentum
            </span>
          </Link>
        </div>

        {/* Nav Icons */}
        <nav className="flex-1 flex flex-col items-center py-4 gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center justify-center w-10 h-10"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-6"
                    style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff, 0 0 16px rgba(0,212,255,0.4)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 transition-all duration-150',
                    isActive ? 'bg-[#0d0d0d]' : 'hover:bg-[#0d0d0d]'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors duration-150',
                      isActive ? 'text-[#00d4ff]' : 'text-[#555555] group-hover:text-[#888888]'
                    )}
                  />
                </div>
                <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#111] border border-white/10 text-xs text-white px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* XP level indicator */}
        <div className="flex flex-col items-center pb-2 px-2">
          <div className="w-full border-t border-white/5 pt-3 pb-1">
            <div className="flex items-center justify-center mb-1.5">
              <div
                className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-black"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)' }}
              >
                {xpProgress?.level ?? 1}
              </div>
            </div>
            <div className="w-1 mx-auto bg-white/5 relative" style={{ height: '40px' }}>
              <motion.div
                className="absolute bottom-0 left-0 w-full"
                style={{ background: 'linear-gradient(to top, #00d4ff, #7c3aed)' }}
                animate={{ height: `${xpProgress?.progress ?? 0}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex flex-col items-center pb-4 border-t border-white/5 pt-2">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center justify-center w-10 h-10"
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 transition-all duration-150',
                    isActive ? 'bg-[#0d0d0d]' : 'hover:bg-[#0d0d0d]'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors duration-150',
                      isActive ? 'text-[#00d4ff]' : 'text-[#555555] group-hover:text-[#888888]'
                    )}
                  />
                </div>
                <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#111] border border-white/10 text-xs text-white px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}
