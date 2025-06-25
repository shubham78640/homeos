'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  MessageCircle,
  CheckSquare,
  Calendar,
  Bell,
  Menu, User,
  Inbox,
  Bot,
  BotMessageSquare,
  ReceiptIndianRupee
} from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
//   { name: 'My Requests', href: '/my-requests', icon: Inbox },
  { name: 'Pinch Ai', href: '/pod-ai', icon: BotMessageSquare },
   { name: 'Tasks', href: '/my-tasks', icon: CheckSquare },
   { name: 'Chat', href: '/concierge-chat', icon: MessageCircle },
 
 
  { name: 'My Expense', href: '/my-expenses', icon: ReceiptIndianRupee },

 { name: 'Profile', href: '/profile', icon: User },// or open drawer
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 w-full border-t border-gray-200 bg-white dark:bg-background dark:border-border shadow-md lg:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-foreground"
            >
              <item.icon
                className={`h-5 w-5 mb-0.5 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span className={`${isActive ? 'text-primary font-medium' : ''}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
