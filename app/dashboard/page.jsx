"use client";
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { useEffect, useState } from "react"; // Keep useState for local UI state if needed
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Zap,
  ReceiptIndianRupee,
  ClipboardList,
  BadgeIndianRupee,
  FileSpreadsheet,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import ProtectedLayout from "../../components/ProtectedLayout";
import ShimmerDashboard from "../../components/shimmerui/ShimmerDashboard";
import { getDocs, collection, query, where, doc } from "firebase/firestore";
import { db } from "../firebase/config"; // your Firebase config path
import TaskListCard from "../../components/TaskListCard";
export default function DashboardPage() {
  const {
    currentUser,
    loading: authLoading,
    patronDetails,
    patronDataLoading,
    patronDataError,
  } = useAuth();
  const [loading, setLoading] = useState(true);
  // ✅ Always declare hooks at the top
  const [stats, setStats] = useState({
    totalExpenses: 0,
    averageExpense: 0,
    highestExpense: 0,
    totalTasks: 0,
    pendingTasks: 0,
    thisMonthExpense: 0,
    thisMonthTasks: 0,
  });

  // ✅ Safe patronId
  const displayedPatronId =
    patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

  useEffect(() => {
    const fetchData = async () => {
      if (!displayedPatronId || displayedPatronId === "N/A") return;
      const patronRef = doc(db, "addPatronDetails", displayedPatronId);
      const expenseQuery = query(
        collection(db, "crmExpenseApproval"),
        where("patronRef", "==", patronRef)
      );

      const taskQuery = query(
        collection(db, "createTaskCollection"),
        where("patronRef", "==", patronRef)
      );

      const [expensesSnapshot, tasksSnapshot] = await Promise.all([
        getDocs(expenseQuery),
        getDocs(taskQuery),
      ]);

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const expenses = [];
      let totalExpense = 0;
      let thisMonthExpense = 0;

      expensesSnapshot.forEach((doc) => {
        const data = doc.data();
        const amount = Number(data.totalAmount || 0);
        const createdAt = data.createdAt?.toDate?.();

        if (!isNaN(amount)) {
          totalExpense += amount;
          expenses.push(amount);

          if (
            createdAt &&
            createdAt.getMonth() === currentMonth &&
            createdAt.getFullYear() === currentYear
          ) {
            thisMonthExpense += amount;
          }
        }
      });

      const tasks = tasksSnapshot.docs.map((doc) => doc.data());
      const totalTasks = tasks.length;
      const pendingTasks = tasks.filter(
        (t) => t.taskStatusCategory === "To be Started"
      ).length;
      const thisMonthTasks = tasks.filter((t) => {
        const createdAt = t.createdAt?.toDate?.();
        return (
          createdAt &&
          createdAt.getMonth() === currentMonth &&
          createdAt.getFullYear() === currentYear
        );
      }).length;

      setStats({
        totalExpenses: totalExpense,
        averageExpense: expenses.length
          ? (totalExpense / expenses.length).toFixed(2)
          : 0,
        highestExpense: Math.max(...expenses, 0),
        totalTasks,
        pendingTasks,
        thisMonthExpense,
        thisMonthTasks,
      });
    };

    fetchData();
  }, [displayedPatronId]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!displayedPatronId || displayedPatronId === "N/A") return;

      try {
        const q = query(
          collection(db, "createTaskCollection"),
          where("patronId", "==", displayedPatronId)
        );
        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [displayedPatronId]);

  console.log("hi", stats);
  if (authLoading || patronDataLoading || !currentUser) {
    return (
      <ProtectedLayout>
        <ShimmerDashboard />
      </ProtectedLayout>
    );
  }

  // ✅ Render error state
  if (patronDataError) {
    return (
      <ProtectedLayout>
        <p className="text-red-500 p-4">
          Failed to load data: {patronDataError.message}
        </p>
      </ProtectedLayout>
    );
  }

  // If no user is logged in, you might redirect or show a "Please log in" message
  if (!currentUser) {
    return (
      <ProtectedLayout>
        {" "}
        <ShimmerDashboard />
      </ProtectedLayout>
    );
  }

  // Example: Extracting data for display
  const displayedPatronName =
    patronDetails.length > 0
      ? patronDetails[0].patronName || "N/A"
      : "Not Linked";
  const displayedPatronNumber =
    patronDetails.length > 0 ? patronDetails[0].mobile_number1 || "N/A" : "N/A";

  const activeTasksCount = patronDetails.filter(
    (detail) => detail.status === "In Progress" || detail.status === "Pending"
  ).length;

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-card border border-border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-muted p-2 rounded-full">{icon}</div>
    </div>
  );

  return (
    <ProtectedLayout>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome, {displayedPatronName}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here's what's happening in your home
            </p>
          </div>
          {/*  Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* <StatCard title="Average Expense" value={`₹${stats.averageExpense}`} icon={<BadgeIndianRupee />} />
           <StatCard title="Highest Expense" value={`₹${stats.highestExpense}`} icon={<TrendingUp />} /> */}
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              icon={<ClipboardList />}
            />
            <StatCard
              title="Total this month Tasks"
              value={stats.thisMonthTasks}
              icon={<ClipboardCheck />}
            />
            <StatCard
              title="Total Expenses"
              value={`₹${stats.totalExpenses}`}
              icon={<ReceiptIndianRupee />}
            />
            <StatCard
              title="Total thisMonthExpense"
              value={stats.thisMonthExpense}
              icon={<FileSpreadsheet />}
            />
          </div>
          {/*  Cards */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3"></div>
        </div>
        <TaskListCard />
      </div>
    </ProtectedLayout>
  );
}
