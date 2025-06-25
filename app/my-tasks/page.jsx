"use client"; // This component needs to be a client component
import { useState, useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Plus,
  Search,
  SortAsc,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProtectedLayout from "../../components/ProtectedLayout";

// Import useAuth and Firestore functions
import { useAuth } from "../context/AuthContext"; // Adjust path if necessary
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  getFirestore,
  orderBy,
} from "firebase/firestore";
// import { db } from '@/firebaseConfig'; // Adjust path if necessary
import { app } from "../firebase/config"; // Adjust path if necessary
import { getAuth } from "firebase/auth";
import ShimmerTasks from "../../components/shimmerui/ShimmerTasks";
const auth = getAuth(app);
const db = getFirestore(app);
export default function MyTasksPage() {
  const {
    currentUser,
    loading: authLoading,
    patronDetails,
    dataError: authDataError,
  } = useAuth(); // Destructure all needed states from useAuth()

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setDate] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [patronId, setPatronId] = useState("");
  const [tasks, setTasks] = useState([]); // This will hold our fetched tasks
  const [tasksLoading, setTasksLoading] = useState(true); // Loading state for tasks
  const [tasksError, setTasksError] = useState(null); // Error state for tasks fetch
  const displayedPatronId =
    patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";

  const displayedPatronNumber =
    patronDetails.length > 0 ? patronDetails[0].patronName || "N/A" : "N/A";
  useEffect(() => {
    const fetchTasks = async () => {
      setTasksLoading(true);
      setTasksError(null);
      //    if (!displayedPatronId || displayedPatronId === "N/A") {
      //   console.warn("displayedPatronId is missing or invalid.",displayedPatronId);
      //   setTasks([]);
      //   return;
      // }
      if (!displayedPatronId || displayedPatronId === "N/A") {
        return <div>🔄 Loading patron details ...</div>;
      }
      // console.log("idididiid", patronId)

      try {
        // ✅ Convert displayedPatronId to a DocumentReference
        const patronRef = doc(db, "addPatronDetails", displayedPatronId);

        const tasksQuery = query(
          collection(db, "createTaskCollection"),
          where("patronRef", "==", patronRef),
          orderBy("createdAt", "desc") // ✅ Compare DocumentReference with DocumentReference
        );

        const tasksSnapshot = await getDocs(tasksQuery);
        const fetchedTasks = await Promise.all(
          tasksSnapshot.docs.map(async (taskDoc) => {
            const taskData = { id: taskDoc.id, ...taskDoc.data() };
            const ref = taskData.patronRef;
            let patron = { name: "Unknown", number: "N/A" };

            if (ref) {
              const patronSnap = await getDoc(ref);
              if (patronSnap.exists()) {
                patron = { id: patronSnap.id, ...patronSnap.data() };
              }
            }

            return { ...taskData, patron };
          })
        );
        setTasks(fetchedTasks); // ⛔ You had setDate instead of setTasks
        console.log("Fetched Tasks:", fetchedTasks);
        console.log("Fetched Tasks12345:", patronRef);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasksError("Failed to load your tasks. Please try again.");
      } finally {
        setTasksLoading(false);
      }
    };

    if (displayedPatronId) {
      fetchTasks();
    }
  }, [displayedPatronId]);
  // --- UI Rendering Logic (Remains largely the same, but uses 'tasks' state) ---

  const getStatusIcon = (status) => {
    switch (
      status?.toLowerCase() // Use optional chaining for safety
    ) {
      case "Completed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      case "In Process":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "In Process": // Changed from 'progress' to 'in progress' for consistency with filter
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "To be Started":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";

      default:
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskSubject?.toLowerCase().includes(searchTerm.toLowerCase()) || // Use optional chaining
      task.taskDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.patron?.partonName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) || // Search by patron name
      task.patron?.taskCategory
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()); // Search by patron number

    const matchesStatus =
      filterStatus === "all" ||
      task.taskStatusCategory?.toLowerCase() === filterStatus.toLowerCase();
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    //console.log("rrrrrr",matchesStatus)

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (authLoading || tasksLoading) {
    return (
      <ProtectedLayout>
        <ShimmerTasks />
      </ProtectedLayout>
    );
  }

  // if (authDataError || tasksError) {
  //   return (
  //     <Sidebar>
  //       <div className="px-4 py-8 sm:px-6 lg:px-8">
  //         <div className="mx-auto max-w-7xl">
  //           <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">My Tasks</h1>
  //           <p className="text-red-500">{authDataError || tasksError}</p>
  //           <p className="text-muted-foreground">Please try refreshing the page or check your internet connection.</p>
  //         </div>
  //       </div>
  //     </Sidebar>
  //   );
  // }

  if (!currentUser) {
    // This should ideally be handled by a PrivateRoute component,
    // but a fallback message is good here.
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            My Tasks
          </h1>
          <p className="text-muted-foreground">
            Please log in to view your tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  My Tasks
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Manage your personal and service requests
                </p>
              </div>

              <div className="flex items-center gap-3"></div>
            </div>

            {/* Search and Filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks by title, description, patron name or number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="To be Started">To be Started</option>
                  <option value="In Process">In Process</option>{" "}
                  {/* Ensure this matches your data */}
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-4">
              {tasks.length > 0 ? (
                filteredTasks.map((data) => {
                  const StatusIcon = getStatusIcon(data.taskStatusCategory);

                  return (
                    <div
                      key={data.id}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      onClick={() =>
                        (window.location.href = `/my-tasks/${data.id}`)
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div
                            className={`p-2 rounded-full ${
                              getStatusColor(
                                data.statusColor || data.status?.toLowerCase()
                              ) // Use data.status for color if statusColor is missing
                            }`}
                          >
                            <StatusIcon
                              className={`w-5 h-5 ${
                                data.taskStatusCategory === "Completed"
                                  ? "text-green-600 dark:text-green-400"
                                  : data.taskStatusCategory === "To be Started"
                                  ? "text-red-600 dark:text-red-400"
                                  : data.taskStatusCategory === "In Process" ||
                                    data.taskStatusCategory?.toLowerCase() ===
                                      "In Process"
                                  ? "text-blue-600 dark:text-blue-400" // handle "in progress"
                                  : "text-yellow-600 dark:text-yellow-400"
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                                {data.taskSubject || "Untitled Task"}
                              </h3>
                              <h5> {data.assignedLMName || "Untitled Task"}</h5>
                              {data.patron && data.patron.name && (
                                <Badge
                                  variant="secondary"
                                  className="text-sm px-2 py-1 flex items-center gap-1"
                                >
                                  <User className="w-3 h-3" />
                                  <span>{data.patron.name}</span>
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              {data.date && data.time && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {data.date} • {data.time}
                                  </span>
                                </div>
                              )}
                              {data.taskID && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{data.location}</span>
                                </div>
                              )}
                            </div>

                            <p className="text-muted-foreground mb-3">
                              {data.taskDescription ||
                                "No description provided."}
                            </p>

                            <div className="flex items-center gap-2">
                              {data.priority && (
                                <Badge
                                  className={getPriorityColor(data.priority)}
                                >
                                  {data.priority}
                                </Badge>
                              )}
                              {data.taskStatusCategory && (
                                <Badge
                                  className={getStatusColor(
                                    data.statusColor ||
                                      data.taskStatusCategory?.toLowerCase()
                                  )}
                                >
                                  {data.taskStatusCategory}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No tasks found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ||
                    filterStatus !== "all" ||
                    filterPriority !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first data to get started"}
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Task
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
