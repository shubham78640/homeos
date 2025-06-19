// "use client";

// import { Sidebar } from '@/components/sidebar';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { 
//   ArrowLeft,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Calendar,
//   MapPin,
//   User,
//   Edit3,
//   Save,
//   X,
//   MessageCircle,
//   Paperclip,
//   MoreHorizontal,
//   Phone,
//   Mail,
//   Star,
//   Flag
// } from 'lucide-react';


// export default function TaskDetailsPage({ params }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [taskData, setTaskData] = useState({
//     id: 1,
//     title: 'Dinner Reservation at Zaza',
//     description: 'Table for 4 at Zaza Restaurant for anniversary dinner. Please request a quiet corner table with a view if possible.',
//     date: 'Today',
//     time: '7:30 PM',
//     priority: 'medium',
//     status: 'Pending',
//     statusColor: 'pending',
//     location: 'Zaza Restaurant, Downtown',
//     assignedTo: 'Bruce (AI Concierge)',
//     createdDate: 'March 15, 2024',
//     estimatedCompletion: '6:00 PM Today',
//     category: 'Dining',
//     notes: 'Anniversary celebration - 5th wedding anniversary'
//   });
//   //  const { id } = params;

//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       author: 'Bruce',
//       avatar: 'AI',
//       content: 'I\'ve contacted Zaza Restaurant and they have availability for 7:30 PM. Would you like me to confirm the reservation?',
//       timestamp: '2 hours ago',
//       type: 'system'
//     },
//     {
//       id: 2,
//       author: 'You',
//       avatar: 'U',
//       content: 'Yes, please confirm. Also, can you request a quiet table?',
//       timestamp: '1 hour ago',
//       type: 'user'
//     },
//     {
//       id: 3,
//       author: 'Bruce',
//       avatar: 'AI',
//       content: 'Reservation confirmed! I\'ve requested a quiet corner table. The restaurant will call if they need any changes.',
//       timestamp: '30 minutes ago',
//       type: 'system'
//     }
//   ]);

//   const [newComment, setNewComment] = useState('');



//   const getStatusIcon = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return CheckCircle;
//       case 'cancelled':
//         return XCircle;
//       case 'in progress':
//         return AlertCircle;
//       default:
//         return Clock;
//     }
//   };

//   const getStatusColor = (statusColor) => {
//     switch (statusColor) {
//       case 'completed':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       case 'progress':
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//       default:
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       case 'low':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       default:
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     // Save logic here
//   };

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;
    
//     const comment = {
//       id: comments.length + 1,
//       author: 'You',
//       avatar: 'U',
//       content: newComment,
//       timestamp: 'Just now',
//       type: 'user'
//     };
    
//     setComments([...comments, comment]);
//     setNewComment('');
//   };

//   const StatusIcon = getStatusIcon(taskData.status);

//   return (
//     <Sidebar>
//       <div className="min-h-screen bg-background">
//         {/* Header */}
//         <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-4xl">
//             <div className="flex items-center justify-between mb-6">
//               <Button
//                 variant="ghost"
//                 onClick={() => window.history.back()}
//                 className="flex items-center gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Tasks
//               </Button>
              
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" size="sm">
//                   <Star className="w-4 h-4" />
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Flag className="w-4 h-4" />
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <MoreHorizontal className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="flex items-start justify-between">
//               <div className="flex items-start space-x-4 flex-1">
//                 <div className={`p-3 rounded-full ${
//                   taskData.statusColor === 'completed' ? 'bg-green-100 dark:bg-green-900' :
//                   taskData.statusColor === 'cancelled' ? 'bg-red-100 dark:bg-red-900' :
//                   taskData.statusColor === 'progress' ? 'bg-blue-100 dark:bg-blue-900' :
//                   'bg-yellow-100 dark:bg-yellow-900'
//                 }`}>
//                   <StatusIcon className={`w-6 h-6 ${
//                     taskData.statusColor === 'completed' ? 'text-green-600 dark:text-green-400' :
//                     taskData.statusColor === 'cancelled' ? 'text-red-600 dark:text-red-400' :
//                     taskData.statusColor === 'progress' ? 'text-blue-600 dark:text-blue-400' :
//                     'text-yellow-600 dark:text-yellow-400'
//                   }`} />
//                 </div>
                
//                 <div className="flex-1">
//                   {isEditing ? (
//                     <Input
//                       value={taskData.title}
//                       onChange={(e) => setTaskData({...taskData, title: e.target.value})}
//                       className="text-2xl font-bold mb-2"
//                     />
//                   ) : (
//                     <h1 className="text-2xl font-bold text-foreground mb-2">{taskData.title}</h1>
//                   )}
                  
//                   <div className="flex items-center gap-2 mb-4">
//                     <Badge className={getPriorityColor(taskData.priority)}>
//                       {taskData.priority}
//                     </Badge>
//                     <Badge className={getStatusColor(taskData.statusColor)}>
//                       {taskData.status}
//                     </Badge>
//                     <Badge variant="outline">{taskData.category}</Badge>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 {isEditing ? (
//                   <>
//                     <Button onClick={handleSave} size="sm">
//                       <Save className="w-4 h-4 mr-2" />
//                       Save
//                     </Button>
//                     <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </>
//                 ) : (
//                   <Button onClick={() => setIsEditing(true)} size="sm">
//                     <Edit3 className="w-4 h-4 mr-2" />
//                     Edit
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-4xl">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Main Content */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Description */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Description</h3>
//                   {isEditing ? (
//                     <Textarea
//                       value={taskData.description}
//                       onChange={(e) => setTaskData({...taskData, description: e.target.value})}
//                       rows={4}
//                       className="w-full"
//                     />
//                   ) : (
//                     <p className="text-muted-foreground leading-relaxed">{taskData.description}</p>
//                   )}
//                 </div>

//                 {/* Task Details */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Task Details</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="flex items-center gap-3">
//                       <Calendar className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">Due Date</p>
//                         <p className="text-sm text-muted-foreground">{taskData.date} at {taskData.time}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <MapPin className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">Location</p>
//                         <p className="text-sm text-muted-foreground">{taskData.location}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <User className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">Assigned To</p>
//                         <p className="text-sm text-muted-foreground">{taskData.assignedTo}</p>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       <Clock className="w-5 h-5 text-muted-foreground" />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">Est. Completion</p>
//                         <p className="text-sm text-muted-foreground">{taskData.estimatedCompletion}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Comments Section */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Comments & Updates</h3>
                  
//                   <div className="space-y-4 mb-6">
//                     {comments.map((comment) => (
//                       <div key={comment.id} className="flex items-start gap-3">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
//                           comment.type === 'system' 
//                             ? 'bg-primary text-primary-foreground' 
//                             : 'bg-muted text-muted-foreground'
//                         }`}>
//                           {comment.avatar}
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className="text-sm font-medium text-foreground">{comment.author}</span>
//                             <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
//                           </div>
//                           <p className="text-sm text-muted-foreground">{comment.content}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <div className="flex items-center gap-2">
//                     <Input
//                       placeholder="Add a comment..."
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       className="flex-1"
//                       onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
//                     />
//                     <Button onClick={handleAddComment} size="sm">
//                       <MessageCircle className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//                 {/* Quick Actions */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
//                   <div className="space-y-2">
//                     <Button variant="outline" className="w-full justify-start">
//                       <Phone className="w-4 h-4 mr-2" />
//                       Call Restaurant
//                     </Button>
//                     <Button variant="outline" className="w-full justify-start">
//                       <Mail className="w-4 h-4 mr-2" />
//                       Send Email
//                     </Button>
//                     <Button variant="outline" className="w-full justify-start">
//                       <MessageCircle className="w-4 h-4 mr-2" />
//                       Chat with Concierge
//                     </Button>
//                     <Button variant="outline" className="w-full justify-start">
//                       <Paperclip className="w-4 h-4 mr-2" />
//                       Add Attachment
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Task Info */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Task Information</h3>
//                   <div className="space-y-3 text-sm">
//                     <div>
//                       <span className="font-medium text-foreground">Created:</span>
//                       <p className="text-muted-foreground">{taskData.createdDate}</p>
//                     </div>
//                     <div>
//                       <span className="font-medium text-foreground">Last Updated:</span>
//                       <p className="text-muted-foreground">30 minutes ago</p>
//                     </div>
//                     <div>
//                       <span className="font-medium text-foreground">Task ID:</span>
//                       <p className="text-muted-foreground">#{taskData.id.toString().padStart(6, '0')}</p>
//                     </div>
//                     {taskData.notes && (
//                       <div>
//                         <span className="font-medium text-foreground">Notes:</span>
//                         <p className="text-muted-foreground">{taskData.notes}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Status Actions */}
//                 <div className="bg-card border border-border rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-card-foreground mb-4">Update Status</h3>
//                   <div className="space-y-2">
//                     <Button variant="outline" className="w-full justify-start text-blue-600 hover:text-blue-700">
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       Mark In Progress
//                     </Button>
//                     <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
//                       <CheckCircle className="w-4 h-4 mr-2" />
//                       Mark Complete
//                     </Button>
//                     <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
//                       <XCircle className="w-4 h-4 mr-2" />
//                       Cancel Task
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Sidebar>
//   );
// }


// app/my-tasks/[id]/page.jsx

"use client";

import { Sidebar } from '@/components/sidebar';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Edit3,
  Save,
  X,
  MessageCircle,
  Paperclip,
  MoreHorizontal,
  Phone,
  Mail,
  Star,
  Flag
} from 'lucide-react';
import { doc, getDoc,getFirestore } from 'firebase/firestore';

 import { app } from '../../firebase/config'; 

 const db = getFirestore(app);
export default function TaskDetailsPage({ params }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState(null);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  console.log("id",id)

  
  // useEffect(() => {

  //   const foundTask = allTasks.find(task => task.id === parseInt(id));
  //   if (foundTask) {
  //     setTaskData(foundTask);
  //   } else {
  //     console.error('Task not found for ID:', id);
  //   }
  // }, [id]);


   useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "createTaskCollection", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTaskData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(`Task not found for ID: ${id}`);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to fetch task data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  console.log("task datra",taskData)

 if (loading) return <div className="p-4">⏳ Loading task details...</div>;
  if (error) return <div className="p-4 text-red-500">❌ {error}</div>;
  if (!taskData) return null;

  // const [comments, setComments] = useState([
  //   {
  //     id: 1,
  //     author: 'Bruce',
  //     avatar: 'AI',
  //     content: 'I\'ve contacted Zaza Restaurant and they have availability for 7:30 PM. Would you like me to confirm the reservation?',
  //     timestamp: '2 hours ago',
  //     type: 'system'
  //   },
  //   {
  //     id: 2,
  //     author: 'You',
  //     avatar: 'U',
  //     content: 'Yes, please confirm. Also, can you request a quiet table?',
  //     timestamp: '1 hour ago',
  //     type: 'user'
  //   },
  //   {
  //     id: 3,
  //     author: 'Bruce',
  //     avatar: 'AI',
  //     content: 'Reservation confirmed! I\'ve requested a quiet corner table. The restaurant will call if they need any changes.',
  //     timestamp: '30 minutes ago',
  //     type: 'system'
  //   }
  // ]);

  // const [newComment, setNewComment] = useState('');

  // const getStatusIcon = (status) => {
  //   switch (status.toLowerCase()) {
  //     case 'completed':
  //       return CheckCircle;
  //     case 'cancelled':
  //       return XCircle;
  //     case 'in progress':
  //       return AlertCircle;
  //     default:
  //       return Clock;
  //   }
  // };

  // const getStatusColor = (statusColor) => {
  //   switch (statusColor) {
  //     case 'completed':
  //       return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  //     case 'cancelled':
  //       return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  //     case 'progress':
  //       return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  //     default:
  //       return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  //   }
  // };

  // const getPriorityColor = (priority) => {
  //   switch (priority) {
  //     case 'high':
  //       return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  //     case 'low':
  //       return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  //     default:
  //       return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  //   }
  // };

  // const handleSave = () => {
  //   setIsEditing(false);
  //   console.log('Saving task data:', taskData);
  // };

  // const handleAddComment = () => {
  //   if (!newComment.trim()) return;

  //   const comment = {
  //     id: comments.length + 1,
  //     author: 'You',
  //     avatar: 'U',
  //     content: newComment,
  //     timestamp: 'Just now',
  //     type: 'user'
  //   };

  //   setComments([...comments, comment]);
  //   setNewComment('');
  // };

  if (!taskData) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-foreground">Loading task details...</p>
        </div>
      </Sidebar>
    );
  }

  // const StatusIcon = getStatusIcon(taskData.status);

  return (
    <Sidebar>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tasks
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
 <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">{taskData.taskSubject || "Untitled Task"}</h1>
       <h1>{taskData.id}</h1>
        <div className="text-gray-600">📍 Location: {taskData.location || "Not specified"}</div>
        <div className="text-gray-600">📝 Description: {taskData.taskDescription || "No description"}</div>
        <div className="text-gray-600">📌 Priority: {taskData.priority || "N/A"}</div>
        <div className="text-gray-600">📦 Status: {taskData.taskStatusCategory || "Pending"}</div>
        <div className="text-gray-600">👤 Assigned To: {taskData.assignedLMName || "N/A"}</div>
        {taskData.notes && <div className="text-gray-600">🗒️ Notes: {taskData.notes}</div>}
      </div>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`p-3 rounded-full ${
                  taskData.statusColor === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                  taskData.statusColor === 'cancelled' ? 'bg-red-100 dark:bg-red-900' :
                  taskData.statusColor === 'progress' ? 'bg-blue-100 dark:bg-blue-900' :
                  'bg-yellow-100 dark:bg-yellow-900'
                }`}>
                  {/* <StatusIcon className={`w-6 h-6 ${
                    taskData.statusColor === 'completed' ? 'text-green-600 dark:text-green-400' :
                    taskData.statusColor === 'cancelled' ? 'text-red-600 dark:text-red-400' :
                    taskData.statusColor === 'progress' ? 'text-blue-600 dark:text-blue-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`} /> */}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={taskData.title}
                      onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                      className="text-2xl font-bold mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-foreground mb-2">{taskData.title}</h1>
                  )}

                  {/* <div className="flex items-center gap-2 mb-4">
                    <Badge className={getPriorityColor(taskData.priority)}>
                      {taskData.priority}
                    </Badge>
                    <Badge className={getStatusColor(taskData.statusColor)}>
                      {taskData.status}
                    </Badge>
                    <Badge variant="outline">{taskData.category}</Badge>
                  </div> */}
                </div>
              </div>

              {/* <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div> */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Description</h3>
                  {isEditing ? (
                    <Textarea
                      value={taskData.description}
                      onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                      rows={4}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{taskData.description}</p>
                  )}
                </div>

                {/* Task Details */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Task Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Due Date</p>
                        <p className="text-sm text-muted-foreground">{taskData.date} at {taskData.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Location</p>
                        <p className="text-sm text-muted-foreground">{taskData.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Assigned To</p>
                        <p className="text-sm text-muted-foreground">{taskData.assignedTo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Est. Completion</p>
                        <p className="text-sm text-muted-foreground">{taskData.estimatedCompletion}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                {/* <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Comments & Updates</h3>

                  <div className="space-y-4 mb-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          comment.type === 'system'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button onClick={handleAddComment} size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div> */}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Restaurant
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat with Concierge
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Add Attachment
                    </Button>
                  </div>
                </div>

                {/* Task Info */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Task Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Created:</span>
                      <p className="text-muted-foreground">{taskData.createdDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Last Updated:</span>
                      <p className="text-muted-foreground">30 minutes ago</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Task ID:</span>
                      <p className="text-muted-foreground">#{taskData.id.toString().padStart(6, '0')}</p>
                    </div>
                    {taskData.notes && (
                      <div>
                        <span className="font-medium text-foreground">Notes:</span>
                        <p className="text-muted-foreground">{taskData.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Actions */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Update Status</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-blue-600 hover:text-blue-700">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Mark In Progress
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Task
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}