// app/my-tasks/[id]/layout.jsx

// This is a Server Component by default. No "use client".

// Define your tasks data here, or ideally, import it from a shared data file
// (Make sure this data is accessible during the build process on the server)
const allTasks = [
  { id: 1, /* ... other task data ... */ },
  { id: 2, /* ... other task data ... */ },
  { id: 3, /* ... other task data ... */ },
  { id: 4, /* ... other task data ... */ },
  { id: 5, /* ... other task data ... */ },
];

// REQUIRED: generateStaticParams function for the dynamic route
// export async function generateStaticParams() {
//   console.log('Generating static params for /my-tasks/[id]');
//   return allTasks.map(task => ({
//     id: task.id.toString(), // Ensure 'id' is a string
//   }));
// }
import { getDocs, collection,getFirestore } from "firebase/firestore";
// import { db } from "../../firebase/config";
 import { app } from '../../firebase/config';
 const db = getFirestore(app);
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "createTaskCollection"));

  return snapshot.docs.map((doc) => ({
    id: doc.id, // Firestore document ID
  }));
}

// This layout component can optionally wrap your page.jsx
// For static exports, it might be minimal or just pass children.
export default function TaskDetailsLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}

// Optional: Force dynamic rendering if generateStaticParams isn't enough,
// but for 'output: export', generateStaticParams is essential.
// export const dynamic = 'force-static' // or 'auto'