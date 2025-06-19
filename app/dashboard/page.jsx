// import { Sidebar } from '@/components/sidebar';
// import { useAuth } from '@/app/contexts/AuthContext';

// export default function DashboardPage() {
//   const { currentUser, loading: authLoading, patronDetails, patronDataLoading, patronDataError } = useAuth();
//   return (
//     <Sidebar>
//       <div className="px-4 py-8 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
//             <p className="mt-2 text-muted-foreground">Welcome back! Here's what's happening in your home.</p>
//           </div>
          
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//             <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-card-foreground">Quick Stats</h3>
//               <div className="mt-4 space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Active Tasks</span>
//                   <span className="font-medium">8</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Pending Requests</span>
//                   <span className="font-medium">3</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-muted-foreground">Messages</span>
//                   <span className="font-medium">12</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
//               <div className="mt-4 space-y-3">
//                 <div className="text-sm">
//                   <div className="font-medium">Service request completed</div>
//                   <div className="text-muted-foreground">2 hours ago</div>
//                 </div>
//                 <div className="text-sm">
//                   <div className="font-medium">New message received</div>
//                   <div className="text-muted-foreground">4 hours ago</div>
//                 </div>
//                 <div className="text-sm">
//                   <div className="font-medium">Task assigned</div>
//                   <div className="text-muted-foreground">1 day ago</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
//               <h3 className="text-lg font-semibold text-card-foreground">Upcoming</h3>
//               <div className="mt-4 space-y-3">
//                 <div className="text-sm">
//                   <div className="font-medium">Maintenance check</div>
//                   <div className="text-muted-foreground">Tomorrow at 2:00 PM</div>
//                 </div>
//                 <div className="text-sm">
//                   <div className="font-medium">Concierge meeting</div>
//                   <div className="text-muted-foreground">Friday at 10:00 AM</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Sidebar>
//   );
// }

// app/dashboard/page.jsx

"use client";

import { Sidebar } from '@/components/sidebar';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useEffect, useState } from 'react'; // Keep useState for local UI state if needed

export default function DashboardPage() {
  const { currentUser, loading: authLoading, patronDetails, patronDataLoading, patronDataError } = useAuth(); // Destructure all needed states from useAuth()

  // Display loading state for authentication or data fetching
  if (authLoading || patronDataLoading) {
    return (
      <Sidebar>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Dashboard</h1>
            <p className="text-muted-foreground">Loading your personalized dashboard...</p>
          </div>
        </div>
      </Sidebar>
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
      <Sidebar>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Dashboard</h1>
            <p className="text-red-500">{patronDataError}</p>
          </div>
        </div>
      </Sidebar>
    );
  }

  // If no user is logged in, you might redirect or show a "Please log in" message
  if (!currentUser) {
    return (
      <Sidebar>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Dashboard</h1>
            <p className="text-muted-foreground">Please log in to view your dashboard.</p>
          </div>
        </div>
      </Sidebar>
    );
  }

  // Example: Extracting data for display
  const displayedPatronName = patronDetails.length > 0 ? patronDetails[0].patronName  || 'N/A' : 'Not Linked';
  const displayedPatronNumber = patronDetails.length > 0 ? patronDetails[0].mobile_number1 || 'N/A' : 'N/A';
   const displayedPatronId = patronDetails.length > 0 ? patronDetails[0].id || 'N/A' : 'N/A';
  

  // Count active tasks based on 'status' field (assuming patronDetails are tasks)
  // Adjust this logic based on your actual patron detail structure and what constitutes a "task"
  const activeTasksCount = patronDetails.filter(detail => detail.status === 'In Progress' || detail.status === 'Pending').length;

  return (
    <Sidebar>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome, {displayedPatronName}</h1>
            <p className="mt-2 text-muted-foreground">{currentUser?.email || 'User'}! Here's what's happening in your home</p>
          </div>

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
    </Sidebar>
  );
}