"use client";
import { Sidebar } from '@/components/sidebar';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useEffect, useState } from 'react'; // Keep useState for local UI state if needed
import { 

  DollarSign,
  TrendingUp,
  TrendingDown,

  Receipt,

  Zap
} from 'lucide-react';
import ProtectedLayout from "../../components/ProtectedLayout"
import ShimmerDashboard from "../../components/shimmerui/ShimmerDashboard"
export default function DashboardPage() {
  const { currentUser, loading: authLoading, patronDetails, patronDataLoading, patronDataError } = useAuth(); // Destructure all needed states from useAuth()
  if (authLoading || patronDataLoading) {
    return (
      
    <ProtectedLayout> <ShimmerDashboard /></ProtectedLayout>
      
    );
  }

  console.log("hi", currentUser)
   console.log("patrdon", patronDetails)
    console.log("hi auth", authLoading)
   console.log("patrdon error", patronDataError)
      console.log("patrdon patronDataLoading", patronDataLoading)

  // Display error message if fetching failed
  if (patronDataError) {
    return (
      <ProtectedLayout> <ShimmerDashboard /></ProtectedLayout>
    );
  }

  // If no user is logged in, you might redirect or show a "Please log in" message
  if (!currentUser) {
    return (
      <ProtectedLayout> <ShimmerDashboard /></ProtectedLayout>     
    );
  }

  // Example: Extracting data for display
  const displayedPatronName = patronDetails.length > 0 ? patronDetails[0].patronName  || 'N/A' : 'Not Linked';
  const displayedPatronNumber = patronDetails.length > 0 ? patronDetails[0].mobile_number1 || 'N/A' : 'N/A';
   const displayedPatronId = patronDetails.length > 0 ? patronDetails[0].id || 'N/A' : 'N/A';

  const activeTasksCount = patronDetails.filter(detail => detail.status === 'In Progress' || detail.status === 'Pending').length;

  return (
    <ProtectedLayout>
    {/* <Sidebar> */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, {displayedPatronName}</h1>
            <p className="mt-2 text-muted-foreground">{currentUser?.email || 'User'}! Here's what's happening in your home</p>
          </div>
   {/* Statistics Cards */}
          <div className='mb-8'>      
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-card-foreground">jsdferfh</p>
                  </div>
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Expense</p>
                    <p className="text-2xl font-bold text-card-foreground">hbhdw</p>
                  </div>
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Highest Expense</p>
                    <p className="text-2xl font-bold text-card-foreground">nananan</p>
                  </div>
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                    <p className="text-2xl font-bold text-card-foreground">kjbdfejf</p>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Receipt className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </div></div>


      

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground">Your Patron Details</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{displayedPatronName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Number:</span>
                  <span className="font-medium">{displayedPatronNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Linked Email:</span>
                  <span className="font-medium">{currentUser.email}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground"> ID:</span>
                  <span className="font-medium">{displayedPatronId}</span>
                </div>
                {/* You can add more patron details here based on your data */}
                {patronDetails.length === 0 && (
                    <p className="text-sm text-red-400 mt-4">No patron details found linked to this email. Please ensure your patron record has the correct email, or contact support.</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground">Quick Stats</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Tasks</span>
                  <span className="font-medium">{activeTasksCount}</span> {/* Dynamic */}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Patron Records</span>
                  <span className="font-medium">{patronDetails.length}</span> {/* Dynamic */}
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages</span>
                  <span className="font-medium">12</span> {/* Placeholder - Update with real data if available */}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
              <div className="mt-4 space-y-3">
                {/* These are static, you'd fetch real activity logs similarly or from patronDetails */}
                <div className="text-sm">
                  <div className="font-medium">Service request completed</div>
                  <div className="text-muted-foreground">2 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">New message received</div>
                  <div className="text-muted-foreground">4 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Task assigned</div>
                  <div className="text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground">Upcoming</h3>
              <div className="mt-4 space-y-3">
                {/* These are static, you'd fetch real upcoming events */}
                <div className="text-sm">
                  <div className="font-medium">Maintenance check</div>
                  <div className="text-muted-foreground">Tomorrow at 2:00 PM</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Concierge meeting</div>
                  <div className="text-muted-foreground">Friday at 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* </Sidebar> */}
    </ProtectedLayout>
  );
}