// "use client";

// import  ProtectedLayout from '../../components/ProtectedLayout';
// import { useState, useMemo, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { 
//   Filter,
//   Search,
//   Plus,
//   Calendar,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Eye,
//   Edit3,
//   Trash2,
//   Download,
//   MoreHorizontal,
//   CreditCard,
//   Receipt,
//   ShoppingCart,
//   Car,
//   Home,
//   Utensils,
//   Gamepad2,
//   Plane,
//   Heart,
//   BookOpen,
//   Zap
// } from 'lucide-react';
// import { useEffect } from 'react';
// import { collection, query, where, getDocs ,doc} from 'firebase/firestore';
// import { db } from '../firebase/config'; // Adjust path if needed
// import { useAuth } from '../context/AuthContext'; // Assuming you have user auth context
// export default function MyExpensesPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('all');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
//      const { currentUser, loading: authLoading, patronDetails, dataError: authDataError } = useAuth(); // You must have this from your AuthContext
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//    const displayedPatronId = patronDetails.length > 0 ? patronDetails[0].id || 'N/A' : 'N/A';
//   const patronRef = displayedPatronId !== "N/A" ? doc(db, 'addPatronDetails', displayedPatronId) : null;
// const hasFetchedRef = useRef(false);

//   // Filter expenses based on search, month, and category
//   const filteredExpenses = useMemo(() => {
//     return expenses.filter(expense => {
//       const matchesSearch = expense.descriptionOfExpense.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            expense.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            expense.approvalExpenseCategory.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const expenseMonth = expense.monthOfExpense.substring(0, 7); // YYYY-MM format
//       const matchesMonth = selectedMonth === 'all' || expenseMonth === selectedMonth;
      
//       const matchesCategory = selectedCategory === 'all' || expense.expenseCategory === selectedCategory;
      
//       return matchesSearch && matchesMonth && matchesCategory;
//     });
//   }, [searchTerm, selectedMonth, selectedCategory]);
  
//   console.log("filteredExpenses",filteredExpenses)

// //   // Calculate statistics
//   const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.totalAmount, 0);
//   const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
//   const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(e => e.totalAmount)) : 0;

//    const monthlyTotals = useMemo(() => {
//     const totals = {};
//     filteredExpenses.forEach(expense => {
//     //   const month = expense.date.substring(0, 7);
//     //   totals[month] = (totals[month] || 0) + expense.amount;
//     });
//     return totals;
//   }, [filteredExpenses]);

//   useEffect(() => {
//     // const fetchExpenses = async () => {
//     //   if (!patronRef) return;
//         const fetchExpenses = async () => {
//     if (!patronRef || hasFetchedRef.current) return;
//     hasFetchedRef.current = true; 

//       try {
//         const q = query(
//           collection(db, 'crmExpenseApproval'),
//           where('patronRef', '==', patronRef)
//         );
//         const querySnapshot = await getDocs(q);
//         const fetchedExpenses = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setExpenses(fetchedExpenses);
//          console.log("mmm",expenses)
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, [patronRef]);
//   console.log("expense ",expenses)

//     if (authLoading || displayedPatronId === "N/A") {
//     return <div>🔄 Loading patron details...</div>;
//   }

 
//   // Sample expense data


//   const months = [
//     { value: 'all', label: 'All Months' },
//     { value: '2024-01', label: 'January 2024' },
//     { value: '2023-12', label: 'December 2023' },
//     { value: '2023-11', label: 'November 2023' },
//     { value: '2023-10', label: 'October 2023' }
//   ];

//   const categories = [
//     { value: 'all', label: 'All Categories' },
//     { value: 'Food & Dining', label: 'Food & Dining' },
//     { value: 'Transportation', label: 'Transportation' },
//     { value: 'Entertainment', label: 'Entertainment' },
//     { value: 'Utilities', label: 'Utilities' },
//     { value: 'Insurance', label: 'Insurance' },
//     { value: 'Travel', label: 'Travel' },
//     { value: 'Health & Fitness', label: 'Health & Fitness' },
//     { value: 'Education', label: 'Education' }
//   ];




// // //   // Calculate statistics
// //   const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.totalAmount, 0);
// //   const averageExpense = filteredExpenses.length > 0 ? totalExpenses / filteredExpenses.length : 0;
// //   const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(e => e.totalAmount)) : 0;

//   // Group expenses by month for summary


//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <ProtectedLayout>
//       <div className="min-h-screen bg-background">
//         {/* Header */}
//         <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-7xl">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl font-bold tracking-tight text-foreground">My Expenses</h1>
//                 <p className="mt-2 text-muted-foreground">Track and manage your spending</p>
//               </div>
              
//               {/* <div className="flex items-center gap-3">
//                 <Button variant="outline" className="flex items-center gap-2">
//                   <Download className="w-4 h-4" />
//                   <span className="hidden sm:inline">Export</span>
//                 </Button>
//                 <Button className="flex items-center gap-2">
//                   <Plus className="w-4 h-4" />
//                   <span className="hidden sm:inline">Add Expense</span>
//                 </Button>
//               </div> */}
//             </div>

//             {/* Statistics Cards */}
//             {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="bg-card border border-border rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
//                     <p className="text-2xl font-bold text-card-foreground">{formatCurrency(totalExpenses)}</p>
//                   </div>
//                   <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
//                     <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-card border border-border rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Average Expense</p>
//                     <p className="text-2xl font-bold text-card-foreground">{formatCurrency(averageExpense)}</p>
//                   </div>
//                   <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
//                     <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-card border border-border rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Highest Expense</p>
//                     <p className="text-2xl font-bold text-card-foreground">{formatCurrency(highestExpense)}</p>
//                   </div>
//                   <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
//                     <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-card border border-border rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
//                     <p className="text-2xl font-bold text-card-foreground">{filteredExpenses.length}</p>
//                   </div>
//                   <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
//                     <Receipt className="w-5 h-5 text-green-600 dark:text-green-400" />
//                   </div>
//                 </div>
//               </div>
//             </div> */}

//             {/* Filters */}
//             <div className="mt-6 flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search expenses, merchants, or categories..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
//                 >
//                   {months.map((month) => (
//                     <option key={month.value} value={month.value}>
//                       {month.label}
//                     </option>
//                   ))}
//                 </select>
                
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
//                 >
//                   {categories.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
                
//                 <Button variant="outline" size="sm">
//                   <Filter className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mx-auto max-w-7xl">
//             {/* Monthly Summary */}
//             {selectedMonth === 'all' && Object.keys(monthlyTotals).length > 1 && (
//               <div className="mb-8">
//                 <h2 className="text-xl font-semibold text-foreground mb-4">Monthly Summary</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {Object.entries(monthlyTotals)
//                     .sort(([a], [b]) => b.localeCompare(a))
//                     .slice(0, 4)
//                     .map(([month, total]) => (
//                       <div key={month} className="bg-card border border-border rounded-lg p-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-sm font-medium text-muted-foreground">
//                               {new Date(month + '-01').toLocaleDateString('en-US', { 
//                                 year: 'numeric', 
//                                 month: 'long' 
//                               })}
//                             </p>
//                             <p className="text-lg font-bold text-card-foreground">{formatCurrency(total)}</p>
//                           </div>
//                           <Calendar className="w-5 h-5 text-muted-foreground" />
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}

//             {/* Expenses List */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-foreground">
//                   Expense Transactions ({filteredExpenses.length})
//                 </h2>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant={viewMode === 'list' ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => setViewMode('list')}
//                   >
//                     List
//                   </Button>
//                   <Button
//                     variant={viewMode === 'grid' ? 'default' : 'outline'}
//                     size="sm"
//                     onClick={() => setViewMode('grid')}
//                   >
//                     Grid
//                   </Button>
//                 </div>
//               </div>

//               {filteredExpenses.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Receipt className="w-8 h-8 text-muted-foreground" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-foreground mb-2">No expenses found</h3>
//                   <p className="text-muted-foreground mb-6">
//                     {searchTerm || selectedMonth !== 'all' || selectedCategory !== 'all'
//                       ? 'Try adjusting your search or filters'
//                       : 'Add your first expense to get started'
//                     }
//                   </p>
//                   {/* <Button>
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Expense
//                   </Button> */}
//                 </div>
//               ) : (
//                 <div className={viewMode === 'grid' 
//                   ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
//                   : 'space-y-4'
//                 }>
//                   {filteredExpenses.map((expense) => {
//                     const IconComponent = expense.icon;
                    
//                     return (
//                       <div
//                         key={expense.id}
//                         className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-start space-x-4 flex-1">
//                             <div className={`p-3 rounded-full ${expense.color}`}>
//                               <IconComponent className="w-5 h-5" />
//                             </div>
                            
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex-1">
//                                   <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
//                                     {expense.description}
//                                   </h3>
//                                   <p className="text-sm text-muted-foreground">{expense.merchant}</p>
//                                 </div>
//                                 <div className="text-right ml-4">
//                                   <p className="text-xl font-bold text-card-foreground">
//                                     {formatCurrency(expense.amount)}
//                                   </p>
//                                 </div>
//                               </div>
                              
//                               <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
//                                 <div className="flex items-center gap-1">
//                                   <Calendar className="w-4 h-4" />
//                                   <span>{formatDate(expense.date)}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   <CreditCard className="w-4 h-4" />
//                                   <span>{expense.paymentMethod}</span>
//                                 </div>
//                               </div>
                              
//                               <div className="flex items-center justify-between">
//                                 <Badge variant="secondary" className="text-xs">
//                                   {expense.category}
//                                 </Badge>
                                
//                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                   <Button variant="ghost" size="sm">
//                                     <Eye className="w-4 h-4" />
//                                   </Button>
//                                   <Button variant="ghost" size="sm">
//                                     <Edit3 className="w-4 h-4" />
//                                   </Button>
//                                   <Button variant="ghost" size="sm">
//                                     <MoreHorizontal className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedLayout>
//     // <>Hello</>
//   );
// }




"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ProtectedLayout from "../../components/ProtectedLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Filter,
  Search,
  Calendar,
  CreditCard,
  Receipt,
  Eye,
  Edit3,
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
  Download,
  MoreHorizontal,
  ShoppingCart,
  Car,
  Home,
  Utensils,
  Gamepad2,
  Plane,
  Heart,
  BookOpen,
  Zap,
   ReceiptIndianRupee,
} from "lucide-react";
import {
  collection,
  query,
  where,
  getDocs,
  doc
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import PreviewModal from "../../components/PreviewModal";
import ShimmerExpenseCard from "../../components/shimmerui/ExpenseShimmer"
export default function MyExpensesPage({ fileUrl }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  const [showPreview, setShowPreview] = useState(false);

  const {
    currentUser,
    loading: authLoading,
    patronDetails,
    dataError: authDataError,
  } = useAuth();

  const displayedPatronId =
    patronDetails.length > 0 ? patronDetails[0]?.id || "N/A" : "N/A";

  const patronRef =
    displayedPatronId !== "N/A"
      ? doc(db, "addPatronDetails", displayedPatronId)
      : null;

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!patronRef || hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      try {
        const q = query(
          collection(db, "crmExpenseApproval"),
          where("patronRef", "==", patronRef)
        );
        const querySnapshot = await getDocs(q);
        const fetchedExpenses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(fetchedExpenses);


      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
          console.log("fetchedExpenses expenses:", expenses);
  }, [patronRef]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense?.descriptionOfExpense?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense?.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense?.approvalExpenseCategory?.toLowerCase().includes(searchTerm.toLowerCase());

      const expenseMonth = expense?.monthOfExpense;
      const matchesMonth = selectedMonth === "all" || expenseMonth === selectedMonth;

      const matchesCategory =
        selectedCategory === "all" || expense?.expenseCategory === selectedCategory;

      return matchesSearch && matchesMonth && matchesCategory;
    });
  }, [searchTerm, selectedMonth, selectedCategory, expenses]);
//      const monthlyTotals = useMemo(() => {
//     const totals = {};
//     filteredExpenses.forEach(expense => {
//       const month = expense.monthOfExpense;
//       totals[month] = (totals[month] || 0) + expense.totalAmount;
//     });
//     return totals;
//   }, [filteredExpenses]);

  const months = [
    { value: "all", label: "All Months" },
    { value: "Feb 2025", label: "Feb 2025" },
     { value: "March 2025", label: "March 2025" },
    { value: "April 2025", label: "April 2025" },
    { value: "May 2025", label: "May 2025" },
    { value: "June 2025", label: "June 2025" },
    { value: "July 2025", label: "July 2025" },
    // { value: "2023-10", label: "October 2023" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Bill Payments", label: "Bill Payments" },
    { value: "Out of home Errands", label: "Out of home Errands" },
    { value: "Meal Planning and Grocery Management", label: "Meal Planning and Grocery Management" },
    { value: "Trained Manpower", label: "Trained Manpower" },
    { value: "Insurance", label: "Insurance" },
    { value: "Travel", label: "Travel" },
    { value: "Health & Fitness", label: "Health & Fitness" },
    { value: "Education", label: "Education" },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };
const formatDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return '';

  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

//   if (authLoading || displayedPatronId === "N/A") {
//     return <div>🔄 Loading patron details...</div>;
//   }
// const previewUrl = expenses?.invoicePdf || expenses?.invoiceImage || null;
  return (
    // <ProtectedLayout>
    //   <div className="p-4 max-w-4xl mx-auto">
    //     <h1 className="text-2xl font-bold mb-4">My Expenses</h1>

    //     {/* Filters */}
    //     <div className="flex flex-col sm:flex-row gap-4 mb-6">
    //       <Input
    //         placeholder="Search expenses..."
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //       />
    //       <select
    //         value={selectedMonth}
    //         onChange={(e) => setSelectedMonth(e.target.value)}
    //         className="border p-2 rounded"
    //       >
    //         {months.map((month) => (
    //           <option key={month.value} value={month.value}>
    //             {month.label}
    //           </option>
    //         ))}
    //       </select>
    //       <select
    //         value={selectedCategory}
    //         onChange={(e) => setSelectedCategory(e.target.value)}
    //         className="border p-2 rounded"
    //       >
    //         {categories.map((cat) => (
    //           <option key={cat.value} value={cat.value}>
    //             {cat.label}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Expense list */}
    //     {filteredExpenses.length === 0 ? (
    //       <p className="text-muted">No expenses found.</p>
    //     ) : (
    //       <ul className="space-y-4">
    //         {filteredExpenses.map((expense) => (
    //           <li
    //             key={expense.id}
    //             className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800"
    //           >
    //             <div className="flex justify-between">
    //               <div>
    //                 <h2 className="font-semibold">{expense.descriptionOfExpense}</h2>
    //                 <p className="text-sm text-muted-foreground">
    //                   {expense.invoiceNumber} — {formatDate(expense.createdAt?.toDate?.())}
    //                 </p>
    //               </div>
    //               <div className="text-right">
    //                 <p className="text-lg font-bold text-green-600">
    //                   {formatCurrency(expense.totalAmount || 0)}
    //                 </p>
    //                 <p className="text-xs">{expense.expenseCategory}</p>
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
        
    //   </div>
    // </ProtectedLayout>

    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">My Expenses</h1>
                <p className="mt-2 text-muted-foreground">Track and manage your spending</p>
              </div>
            </div>

           

            {/* Filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search expenses, merchants, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[140px]"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Monthly Summary  working code but hide*/}
            {/* {selectedMonth === 'all' && Object.keys(monthlyTotals).length > 1 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Monthly Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(monthlyTotals)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .slice(0, 4)
                    .map(([month, total]) => (
                      <div key={month} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {new Date(month + '-01').toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long' 
                              })}
                            </p>
                            <p className="text-lg font-bold text-card-foreground">{formatCurrency(total)}</p>
                          </div>
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )} */}

            {/* Expenses List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Expense Transactions ({filteredExpenses.length})
                </h2>
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </Button>
                </div>
              </div>

              { loading ? (
  // 🔄 Show shimmer loading cards
  <div className={viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
    : 'space-y-4'
  }>
    {[...Array(6)].map((_, index) => (
      <ShimmerExpenseCard key={index} />
    ))}
  </div>
) : filteredExpenses.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    < ReceiptIndianRupee className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No expenses found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedMonth !== 'all' || selectedCategory !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'Add your first expense to get started'
                    }
                  </p>
                  {/* <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button> */}
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'space-y-4'
                }>
                  {filteredExpenses.map((expense) => {
                    const IconComponent = expense.icon;
                    
                    return (
                      <div
                        key={expense.id}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* <div className={`p-3 rounded-full `}>
                              <IconComponent className="w-5 h-5" />
                            </div> */}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 
                                 className="whitespace-pre-wrap break-words"
                                 //className="text-l font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1"
                                  >
                                    {expense?.descriptionOfExpense}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{expense?.vendorName}</p>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-xl font-bold text-card-foreground">
                                    {formatCurrency(expense?.totalAmount)}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                 <div className="flex items-center gap-1">
                                  <CreditCard className="w-4 h-4" />
                                  <span>{expense?.invoiceNumber}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(expense?.invoiceDate)}</span>
                                </div>
                              
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  {expense?.expenseCategory}
                                </Badge>
                                
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="ghost" size="sm" 
                                  onClick={() => setShowPreview(true)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  {/* <Button variant="ghost" size="sm">
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button> */}
                                    <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        fileUrl={expense?.invoicePdf}
      />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
    
  );
}