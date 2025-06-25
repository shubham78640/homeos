
"use client";

import { useEffect, useState } from "react";
import { getDocs, collection, query, where, doc,orderBy } from "firebase/firestore";
import { db } from "../app/firebase/config";
import { useAuth } from "../app/context/AuthContext";
import { isSameDay } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ✅ Use your custom table

import ShimmerTasks from "./TaskDetailDialog"; // Assuming this is your loader

export default function TaskListCard() {
  const { patronDetails } = useAuth();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const displayedPatronId =
    patronDetails?.length > 0 ? patronDetails[0]?.id || "N/A" : "N/A";

  useEffect(() => {
    const fetchTasks = async () => {
      if (!displayedPatronId || displayedPatronId === "N/A") return;
      setLoading(true);
      try {
        const patronRef = doc(db, "addPatronDetails", displayedPatronId);
        const tasksQuery = query(
          collection(db, "createTaskCollection"),
          where("patronRef", "==", patronRef),orderBy("createdAt", "asc")
        );
        const querySnapshot = await getDocs(tasksQuery);
        const today = new Date();

        const filteredTasks = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((task) => {
            const status = task.taskStatusCategory?.toLowerCase();
            const completedAt = task.completedAt?.toDate?.();

            let baseCondition =
              status === "to be started" ||
              status === "in process" ||
              (status === "completed" &&
                completedAt &&
                isSameDay(today, completedAt));

            if (!baseCondition) return false;

            if (filter === "to be started") return status === "to be started";
            if (filter === "in process") return status === "in process";

            return true;
          });

        setTasks(filteredTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [displayedPatronId, filter]);

  return (
//     <Card className="w-full bg-white shadow-sm rounded-md">
//       <CardContent className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-foreground">Task Report </h2>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border border-border bg-background px-3 py-1 rounded-md text-sm text-foreground"
//           >
//             <option value="all">All</option>
//             <option value="to be started">To Be Started</option>
//             <option value="in process">In Progress</option>
//           </select>
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12">No.</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Last Comment</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Assign Date</TableHead>
//                 <TableHead>Due Date</TableHead>
               
                
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5}>
//                     <ShimmerTasks />
//                   </TableCell>
//                 </TableRow>
//               ) : tasks.length > 0 ? (
//                 tasks.map((task, index) => (
//                   <TableRow key={task.id}>
//                     <TableCell className="w-1/10">{index + 1}.</TableCell>
//                     <TableCell className="w-1/4">
//                       {task.taskDescription || "—"}
//                     </TableCell>
                  
//                     <TableCell className="w-1/4 text-muted-foreground break-words">
//                       {task.lastComment || "—"}
//                     </TableCell>
//                       <TableCell className="w-1/4">
//                       <Badge variant={getStatusVariant(task.taskStatusCategory)} className={
//   task.taskStatusCategory?.toLowerCase() === "completed"
//     ? "bg-green-500 text-white"
//     : "bg-muted text-foreground"
// }>
//                         {task.taskStatusCategory || "Unknown"}
//                       </Badge>
//                     </TableCell>

//                                       <TableCell className=" w-1/4 text-muted-foreground break-words">
//     {task.taskDueDate?.toDate ? (
//       new Date(task.taskDueDate.toDate()).toLocaleDateString()
//     ) : (
//       "—"
//     )}
//   </TableCell>
//                     <TableCell className="w-1/4 text-muted-foreground break-words">
//     {task.taskDueDate?.toDate ? (
//       new Date(task.taskDueDate.toDate()).toLocaleDateString()
//     ) : (
//       "—"
//     )}
//   </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={4}
//                     className="text-center text-muted-foreground py-6"
//                   >
//                     No tasks found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
<Card className="w-full bg-white shadow-sm rounded-md">
  <CardContent className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-foreground">Task Report</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-border bg-background px-3 py-1 rounded-md text-sm text-foreground"
      >
        <option value="all">All</option>
        <option value="to be started">To Be Started</option>
        <option value="in process">In Progress</option>
      </select>
    </div>

    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">No.</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Last Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assign Date</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {/* Scrollable Body */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        <Table>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <ShimmerTasks />
                </TableCell>
              </TableRow>
            ) : tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell className="w-12">{index + 1}.</TableCell>
                  <TableCell className="w-1/4 break-words">
                    {task.taskDescription || "—"}
                  </TableCell>
                  <TableCell className=" w-1/4 text-muted-foreground break-words">
                    {task.lastComment || "—"}
                  </TableCell>
                  <TableCell className="w-1/4">
                    <Badge
                      variant={getStatusVariant(task.taskStatusCategory)}
                      className={
                        task.taskStatusCategory?.toLowerCase() === "completed"
                          ? "bg-green-500 text-white"
                          : "bg-muted text-foreground"
                      }
                    >
                      {task.taskStatusCategory || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-1/4 text-muted-foreground break-words">
                    {task.taskAssignDate?.toDate
                      ? new Date(task.taskAssignDate.toDate()).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="w-1/4 text-muted-foreground break-words">
                    {task.taskDueDate?.toDate
                      ? new Date(task.taskDueDate.toDate()).toLocaleDateString()
                      : "—"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  </CardContent>
</Card>

  );
}

const getStatusVariant = (status) => {
  switch (status?.toLowerCase()) {
    case "to be started":
      return "secondary";
    case "in progress":
    case "in process":
      return "default";
    case "completed":
      return "success";
    case "overdue":
      return "destructive";
    default:
      return "outline";
  }
};