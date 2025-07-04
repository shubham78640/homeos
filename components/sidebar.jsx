"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import MobileNav from "./MobileNav"
import {
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Headphones,
  MessageCircle,
  CheckSquare,
  Calendar,
  FileText,
  Inbox,
  Bell,
  Search,
  Mail,
  User,
  Settings,
  Crown,
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  BadgeIndianRupee,
  ReceiptIndianRupee ,
  IndianRupee ,
  Bot,
  BotMessageSquare
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from "next/navigation";

const navigationItems = [
  // { name: 'Home', href: '/', icon: Home },
  // { name: 'Login', href: '/login', icon: LogIn },
  // { name: 'Signup', href: '/signup', icon: UserPlus },

  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pinch AI', href: '/pod-ai', icon: BotMessageSquare },
   { name: 'My Tasks', href: '/my-tasks', icon: CheckSquare },
    //  { name: 'My Requests', href: '/my-requests', icon: Inbox },
  // { name: 'Request Service', href: '/request-service', icon: Headphones },
  { name: 'Concierge Chat', href: '/concierge-chat', icon: MessageCircle },

  { name: 'My Expense', href: '/my-expenses', icon: ReceiptIndianRupee },
  { name: 'AI Chat', href: '/ai-chat', icon: FileText },

  { name: 'Docs', href: '/documents', icon: FileText },
  // { name: 'Search', href: '/search', icon: Search },
  // { name: 'Messages', href: '/messages', icon: Mail },
  { name: 'Profile', href: '/profile', icon: User },
  // { name: 'Settings', href: '/settings', icon: Settings },
  // { name: 'Curator', href: '/curator', icon: Crown },
  // { name: 'Premium', href: '/premium', icon: Crown },
];

export function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user,logout ,currentUser  } = useAuth();
   const router = useRouter();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleLogout = async () => {
    await logout();
    router.push("/login"); // redirect after logout
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-foreground lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4">
            <h1 className="text-xl font-semibold text-foreground">HomeOS</h1>
          </div>
          {/* <div className="ml-auto flex items-center gap-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-foreground hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div> */}
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center ">
            <h1 className="text-xl font-semibold text-foreground">HomeOS</h1>
            {/* <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-foreground hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
         */}
          </div>
          <nav className="flex flex-1 flex-col">
                 {/* <div className="text-sm mb-6 text-gray-600 dark:text-gray-300">
        {currentUser ? currentUser.email : 'Not logged in'}
      </div> */}
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-accent text-accent-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          <item.icon
                            className={`h-5 w-5 shrink-0 transition-colors ${
                              isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'
                            }`}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <div className='mb-4'>
                <p>        {currentUser ? currentUser.email : 'Not logged in'}</p>
            </div>
                        
            <div className='flex gap-2 cursor-pointer'onClick={handleLogout} >
               <LogOut/><span>Logout</span>
            </div>
              
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`relative z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-foreground" aria-hidden="true" />
              </button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4 ring-1 ring-border">
              <div className="flex h-16 shrink-0 items-center">
                <h1 className="text-xl font-semibold text-foreground">HomeOS</h1>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-all duration-200 ${
                                isActive
                                  ? 'bg-accent text-accent-foreground'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon
                                className={`h-5 w-5 shrink-0 ${
                                  isActive ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>         
            <div className='flex gap-2 cursor-pointer mb-12 sm:mb-0'onClick={handleLogout} >
               <LogOut/><span>Logout</span>
            </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
          <MobileNav />
    </div>

  );
}