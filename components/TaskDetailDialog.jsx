// // components/TaskDetailDialog.tsx
// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function TaskDetailDialog({ open, onClose, task }) {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-[#1e2a38] text-white max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>📝 Task Details</DialogTitle>
//         </DialogHeader>

//         {task ? (
//           <div className="space-y-3 text-sm mt-2">
//             <div><strong>Task:</strong> {task.taskDescription}</div>
//             <div><strong>Type:</strong> {task.taskType}</div>
//             <div><strong>Status:</strong> {task.status}</div>
//             <div><strong>Patron:</strong> {task.patronName}</div>
//             <div><strong>Created:</strong> {task.createdAt?.toDate().toLocaleString()}</div>
//           </div>
//         ) : (
//           <div className="text-sm text-gray-300">Loading task...</div>
//         )}

//         <div className="text-right mt-4">
//           <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
//             Close
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea"; // optional, use for multiline
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../app/firebase/config"; // adjust based on your file

// const TaskPopup = ({ open, onOpenChange, taskData, onTaskUpdated }) => {
//   const [editing, setEditing] = useState(false);
//   const [updatedTaskText, setUpdatedTaskText] = useState(taskData?.taskDescription || "");

//   const handleEdit = async () => {
//     const taskRef = doc(db, "createTaskCollection", taskData.id);
//     await updateDoc(taskRef, { taskDescription: updatedTaskText });
//     onTaskUpdated();
//     setEditing(false);
//     onOpenChange(false);
//   };

//   const handleCancelTask = async () => {
//     const taskRef = doc(db, "createTaskCollection", taskData.id);
//     await updateDoc(taskRef, { status: "cancelled" });
//     onTaskUpdated();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md w-full">
//         <DialogHeader>
//           <DialogTitle>📝 Task Details</DialogTitle>
//         </DialogHeader>

//         {editing ? (
//           <Textarea
//             value={updatedTaskText}
//             onChange={(e) => setUpdatedTaskText(e.target.value)}
//             className="w-full mt-2"
//           />
//         ) : (
//           <p className="text-sm text-gray-200">"jjhjbh"</p>
//         )}

//         <div className="flex justify-end gap-2 mt-4">
//           {editing ? (
//             <>
//               <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
//               <Button onClick={handleEdit}>Save</Button>
//             </>
//           ) : (
//             <>
//               <Button variant="outline" onClick={handleCancelTask}>Cancel Task</Button>
//               <Button onClick={() => setEditing(true)}>Edit Task</Button>
//             </>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default TaskPopup;























import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../app/firebase/config"; 
 import { format } from "date-fns";
 import { Timestamp } from "firebase/firestore";

// adjust as per your file

const TaskDialog = ({ isOpen, onClose, taskData, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...taskData });

  useEffect(() => {
    setUpdatedTask({ ...taskData });
    setEditMode(false);
  }, [taskData]);

  const handleInputChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const taskRef = doc(db, "createTaskCollection", taskData.id);
      await updateDoc(taskRef, {
        ...updatedTask,
        updatedAt: serverTimestamp(),
        status: "updated",
      });
      setEditMode(false);
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleCancelTask = async () => {
    // try {
    //   const taskRef = doc(db, "createTaskCollection", taskData.id);
    //   await updateDoc(taskRef, {
    //     status: "cancelled",
    //     cancelledAt: serverTimestamp(),
    //   });
     // onUpdate();
      onClose();
    // } catch (err) {
    //   console.error("Error cancelling task:", err);
    // }
  };
 const formatDateForInput = (date) => {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
};

  return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-xl">
//         <DialogHeader>
//           <DialogTitle>{updatedTask.taskDescription}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label>Task Remarks</Label>
//             <Textarea
//               name="taskDescription"
//               value={updatedTask?.remarks || ""}
//               onChange={handleInputChange}
//               disabled={!editMode}
//             />
//           </div>
//             <div>
//     <Label>Priority</Label>
//     <select
//       name="priority"
//       value={updatedTask.priority || "Medium"}
//       onChange={handleInputChange}
//       disabled={!editMode}
//       className="w-full mt-1 p-2 border rounded-md text-sm bg-background text-foreground border-border"
//     >
//       <option value="Low">Low</option>
//       <option value="Medium">Medium</option>
//       <option value="High">High</option>
//     </select>
//   </div>

//   {/* Deadline Picker */}
//   <div>
//     <Label>Task DueDate</Label>
//     {/* <Input
//       type="datetime-local"
//       name="deadline"
//       value={updatedTask.taskDueDate || ""}
//       onChange={handleInputChange}
//       disabled={!editMode}
//     /> */}
//     <Input
//   type="datetime-local"
//   name="Task DueDate"
//   value={formatDateForInput(updatedTask.taskDueDate)}
//   onChange={(e) =>
//     setUpdatedTask((prev) => ({
//       ...prev,
//       taskDueDate: e.target.value,
//     }))
//   }
//   disabled={!editMode}
// />
//   </div>
//         </div>

//         <DialogFooter className="mt-4 flex justify-between items-center">
//           {editMode ? (
//             <>
//               <Button onClick={handleSave}>Save</Button>
//               <Button variant="outline" onClick={() => setEditMode(false)}>
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button onClick={() => setEditMode(true)}>Edit</Button>
//               <Button variant="destructive" onClick={handleCancelTask}>
//                 Cancel Task
//               </Button>
//             </>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>

<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="w-full sm:max-w-xl rounded-xl p-6">
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl text-foreground dark:text-white">
        {updatedTask.taskDescription}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 mt-4">
      {/* Task Remarks */}
      <div>
        <Label className="text-foreground dark:text-gray-300">Task Remarks</Label>
        <Textarea
          name="remarks"
          value={updatedTask?.remarks || ""}
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full bg-background dark:bg-gray-800 text-foreground dark:text-white border-border dark:border-gray-700"
        />
      </div>

      {/* Priority Dropdown */}
      <div>
        <Label className="text-foreground dark:text-gray-300">Priority</Label>
        <select
          name="priority"
          value={updatedTask?.priority }
          onChange={handleInputChange}
          disabled={!editMode}
          className="w-full mt-1 p-2 rounded-md bg-background dark:bg-gray-800 text-foreground dark:text-white border border-border dark:border-gray-700 text-sm"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Deadline Picker */}
      <div>
        <Label className="text-foreground dark:text-gray-300">Task Due Date</Label>
        <Input
          type="datetime-local"
          name="taskDueDate"
          value={formatDateForInput(updatedTask.taskDueDate)}
          onChange={(e) =>
            setUpdatedTask((prev) => ({
              ...prev,
              taskDueDate: e.target.value,
            }))
          }
          disabled={!editMode}
          className="w-full mt-1 bg-background dark:bg-gray-800 text-foreground dark:text-white border border-border dark:border-gray-700"
        />
      </div>
    </div>

    {/* Footer Actions */}
    <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
      {editMode ? (
        <>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => setEditMode(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => setEditMode(true)} className="w-full sm:w-auto">
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelTask}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default TaskDialog;
