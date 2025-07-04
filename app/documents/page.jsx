// "use client";
// import { useState, useEffect,useRef } from 'react';
// import { Sidebar } from '@/components/sidebar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from "../context/AuthContext";
// import { 
//   Upload,
//   Search,
//   Filter,
//   MoreHorizontal,
//   FileText,
//   Image,
//   FileSpreadsheet,
//   File,
//   Download,
//   Eye,
//   Trash2,
//   X,
//   Calendar,
//   FolderOpen,
//   Plus,
//   Grid3X3,
//   List,
//   SortAsc,
//   Share2,
//   Edit3,
//   Copy,
//   ExternalLink,
   
// } from 'lucide-react';
// import { db, storage, auth } from "../firebase/config";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   uploadBytesResumable,
//   deleteObject
// } from "firebase/storage";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   getDoc,
//   doc,
//   fireDoc,
//   updateDoc,
//   deleteDoc
// } from "firebase/firestore";

// export default function DocumentsPage() {

//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//     const {
//     currentUser,
//     loading: authLoading,
//     patronDetails,
//     dataError: authDataError,
//   } = useAuth();
//     const [isUploadOpen, setIsUploadOpen] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [uploadData, setUploadData] = useState({
//     category: 'personal',
//     description: '',
//     file: null,
//     fileName: '',
//     fileSize: '',
//     fileType: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const [uploading, setUploading] = useState(false);
  
//   const categories = [
//     { value: 'all', label: 'All' },
//     { value: 'personal', label: 'Personal' },
//     { value: 'travel', label: 'Travel' },
//     { value: 'financial', label: 'Financial' },
//     { value: 'utility', label: 'Utility' }
//   ];
//   useEffect(() => {
//     if (patronDetails?.length > 0) {
//       console.log("jjiii", patronDetails);
//     }
//   }, [patronDetails]);

//     const displayedPatronId = 
//    patronDetails?.length > 0 && patronDetails[0]?.id ? patronDetails[0].id : null;

// const formatDate = (date) => {
//   if (!date) return 'N/A';
//   if (typeof date === 'string') return new Date(date).toLocaleDateString();
//   if (date.seconds) return new Date(date.seconds * 1000).toLocaleDateString();
//   return 'Invalid Date';
// };

//   const getCategoryColor = (c) => {
//     switch (c) {
//       case 'personal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//       case 'travel': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
//       case 'financial': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'utility': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
//     }
//   };




// useEffect(() => {
//   const fetchDocuments = async () => {
//     if (!displayedPatronId) return; // Prevent invalid collection error
//     try {
//       setLoading(true);
//       const subColRef = collection(db, 'addPatronDetails', displayedPatronId, 'documents');
//       const snapshot = await getDocs(subColRef);
//       const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setDocuments(docs);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDocuments();
// }, [displayedPatronId]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadData({
//         ...uploadData,
//         file: file,
//         fileName: file.name,
//         fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
//         fileType: file.type
//       });
//     }
//   };


//  const handleUploadSubmit = async () => {
//     if (!uploadData.file || !displayedPatronId) return;
//     setUploading(true);
//     const storageRef = ref(storage, `documents/${displayedPatronId}/${Date.now()}-${uploadData.fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, uploadData.file);

//     uploadTask.on('state_changed',
//       () => {},
//       console.error,
//       async () => {
//         const url = await getDownloadURL(uploadTask.snapshot.ref);
//         const newDoc = {
//           name: uploadData.fileName,
//           category: uploadData.category,
//           size: uploadData.fileSize,
//           uploadDate: serverTimestamp(),
//           description: uploadData.description || '',
//           url,
//           type: uploadData.fileType.includes('image')
//             ? 'image'
//             : uploadData.fileType.includes('spreadsheet') || uploadData.fileName.endsWith('.xlsx')
//             ? 'spreadsheet'
//             : 'pdf'
//         };
//         const col = collection(db, 'addPatronDetails', displayedPatronId, 'documents');
//         const result = await addDoc(col, newDoc);
//         setDocuments([{ id: result.id, ...newDoc }, ...documents]);
//         setUploading(false);
//         setIsUploadOpen(false);
//         setUploadData({ category: 'personal', description: '', file: null, fileName: '', fileSize: '', fileType: '' });
//       }
//     );
//   };
//   const handleDeleteFile = async id => {
//     const docRef = doc(db, 'addPatronDetails', displayedPatronId, 'documents', id);
//     const docObj = documents.find(d => d.id === id);
//     const storageRef = ref(storage, new URL(docObj.url).pathname);
//     await deleteDoc(docRef);
//     await deleteObject(storageRef);
//     setDocuments(documents.filter(d => d.id !== id));
//     if (selectedFile?.id === id) setIsPreviewOpen(false);
//   };

//   const handlePreviewFile = (doc) => { setSelectedFile(doc); setIsPreviewOpen(true); };

//   const handleDownloadFile = (doc) => {
//     const link = document.createElement('a');
//     link.href = doc.url;
//     link.download = doc.name;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//     const filteredDocuments = documents.filter(doc => {
//     const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
//       || doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
//     return matchesSearch && matchesCat;
//   });



// "use client";

// import { useState, useEffect } from 'react';
// import { Sidebar } from '@/components/sidebar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { useAuth } from "../context/AuthContext";
// import {
//   Upload, Search, Filter, MoreHorizontal, FileText, Image,
//   FileSpreadsheet, File, Download, Eye, Trash2, X, Grid3X3,
//   List, SortAsc
// } from 'lucide-react';
// import { db, storage } from "../firebase/config";
// import {
//   ref, uploadBytesResumable, getDownloadURL, deleteObject
// } from "firebase/storage";
// import {
//   collection, getDocs, addDoc, serverTimestamp,
//   doc, deleteDoc
// } from "firebase/firestore";

// export default function DocumentsPage() {
//   const [viewMode, setViewMode] = useState('grid');
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const { currentUser, patronDetails } = useAuth();
//   const [isUploadOpen, setIsUploadOpen] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [uploadData, setUploadData] = useState({
//     category: 'personal',
//     description: '',
//     file: null,
//     fileName: '',
//     fileSize: '',
//     fileType: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [uploading, setUploading] = useState(false);

//   const categories = [
//     { value: 'all', label: 'All' },
//     { value: 'personal', label: 'Personal' },
//     { value: 'travel', label: 'Travel' },
//     { value: 'financial', label: 'Financial' },
//     { value: 'utility', label: 'Utility' }
//   ];

//   const displayedPatronId = patronDetails?.[0]?.id || null;

//   const getCategoryColor = (c) => {
//     switch (c) {
//       case 'personal': return 'bg-blue-100 text-blue-800';
//       case 'travel': return 'bg-purple-100 text-purple-800';
//       case 'financial': return 'bg-green-100 text-green-800';
//       case 'utility': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       if (!displayedPatronId) return;
//       try {
//         setLoading(true);
//         const subColRef = collection(db, 'addPatronDetails', displayedPatronId, 'documents');
//         const snapshot = await getDocs(subColRef);
//         const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setDocuments(docs);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDocuments();
//   }, [displayedPatronId]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadData({
//         ...uploadData,
//         file,
//         fileName: file.name,
//         fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
//         fileType: file.type
//       });
//     }
//   };

//   const handleUploadSubmit = async () => {
//     if (!uploadData.file || !displayedPatronId) return;
//     setUploading(true);
//     try {
//       const filePath = `documents/${displayedPatronId}/${Date.now()}-${uploadData.fileName}`;
//       const storageRef = ref(storage, filePath);
//       const uploadTask = uploadBytesResumable(storageRef, uploadData.file);

//       uploadTask.on('state_changed', null, console.error, async () => {
//         const url = await getDownloadURL(uploadTask.snapshot.ref);
//         const newDoc = {
//           name: uploadData.fileName,
//           category: uploadData.category,
//           size: uploadData.fileSize,
//           uploadDate: serverTimestamp(),
//           description: uploadData.description || '',
//           url,
//           type: uploadData.fileType.includes('image') ? 'image'
//             : uploadData.fileType.includes('pdf') ? 'pdf'
//             : uploadData.fileType.includes('spreadsheet') || uploadData.fileName.endsWith('.xlsx') ? 'spreadsheet'
//             : uploadData.fileName.endsWith('.doc') || uploadData.fileName.endsWith('.docx') ? 'doc'
//             : 'file'
//         };

//         const col = collection(db, 'addPatronDetails', displayedPatronId, 'documents');
//         const result = await addDoc(col, newDoc);
//         setDocuments([{ id: result.id, ...newDoc }, ...documents]);
//         setUploadData({ category: 'personal', description: '', file: null, fileName: '', fileSize: '', fileType: '' });
//         setIsUploadOpen(false);
//       });
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteFile = async (id) => {
//     const docRef = doc(db, 'addPatronDetails', displayedPatronId, 'documents', id);
//     const file = documents.find(d => d.id === id);
//     const urlPath = decodeURIComponent(new URL(file.url).pathname.split('/o/')[1]);
//     const storageRef = ref(storage, urlPath);
//     await deleteDoc(docRef);
//     await deleteObject(storageRef);
//     setDocuments(documents.filter(d => d.id !== id));
//     setIsPreviewOpen(false);
//   };

//   const handlePreviewFile = (doc) => setSelectedFile(doc) || setIsPreviewOpen(true);

//   const handleDownloadFile = (doc) => {
//     const link = document.createElement('a');
//     link.href = doc.url;
//     link.download = doc.name;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredDocuments = documents.filter(doc => {
//     const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
//       || doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchCat = selectedCategory === 'all' || doc.category === selectedCategory;
//     return matchSearch && matchCat;
//   });


"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../context/AuthContext";
import {
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  Download,
  Eye,
  Trash2,
  X,
  Calendar,
  FolderOpen,
  Plus,
  Grid3X3,
  List,
  SortAsc,
  Share2,
  Edit3,
  Copy,
  ExternalLink,
} from "lucide-react";
import { db, storage } from "../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    currentUser,
    loading: authLoading,
    patronDetails,
  } = useAuth();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [uploadData, setUploadData] = useState({
    category: "personal",
    description: "",
    file: null,
    fileName: "",
    fileSize: "",
    fileType: "",
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploading, setUploading] = useState(false);

  const categories = [
    { value: "all", label: "All" },
    { value: "personal", label: "Personal" },
    { value: "travel", label: "Travel" },
    { value: "financial", label: "Financial" },
    { value: "utility", label: "Utility" },
  ];

  const displayedPatronId =
    patronDetails?.length > 0 && patronDetails[0]?.id
      ? patronDetails[0].id
      : null;

  const formatDate = (timestamp) => {
    try {
      if (timestamp?.toDate) {
        return timestamp.toDate().toLocaleDateString();
      }
      return "N/A";
    } catch {
      return "N/A";
    }
  };

  const getCategoryColor = (c) => {
    switch (c) {
      case "personal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "travel":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "financial":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "utility":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!displayedPatronId) return;
      try {
        setLoading(true);
        const subColRef = collection(
          db,
          "addPatronDetails",
          displayedPatronId,
          "documents"
        );
        const snapshot = await getDocs(subColRef);
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [displayedPatronId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData({
        ...uploadData,
        file,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        fileType: file.type,
      });
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadData.file || !displayedPatronId) return;
    setUploading(true);
    const filePath = `documents/${displayedPatronId}/${Date.now()}-${uploadData.fileName}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, uploadData.file);

    uploadTask.on(
      "state_changed",
      () => {},
      console.error,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const newDoc = {
          name: uploadData.fileName,
          category: uploadData.category,
          size: uploadData.fileSize,
          uploadDate: serverTimestamp(),
          description: uploadData.description || "",
          url,
          type: uploadData.fileType.includes("image")
            ? "image"
            : uploadData.fileType.includes("spreadsheet") ||
              uploadData.fileName.endsWith(".xlsx")
            ? "spreadsheet"
            : uploadData.fileType.includes("pdf")
            ? "pdf"
            : uploadData.fileType.includes("msword") ||
              uploadData.fileType.includes("officedocument")
            ? "doc"
            : "other",
        };
        const col = collection(
          db,
          "addPatronDetails",
          displayedPatronId,
          "documents"
        );
        const result = await addDoc(col, newDoc);
        setDocuments([{ id: result.id, ...newDoc }, ...documents]);
        setUploading(false);
        setIsUploadOpen(false);
        setUploadData({
          category: "personal",
          description: "",
          file: null,
          fileName: "",
          fileSize: "",
          fileType: "",
        });
      }
    );
  };

  const handleDeleteFile = async (id) => {
    const docRef = doc(db, "addPatronDetails", displayedPatronId, "documents", id);
    const docObj = documents.find((d) => d.id === id);
    const storagePath = decodeURIComponent(new URL(docObj.url).pathname.split("/o/")[1]);
    const storageRef = ref(storage, storagePath);
    await deleteDoc(docRef);
    await deleteObject(storageRef);
    setDocuments(documents.filter((d) => d.id !== id));
    if (selectedFile?.id === id) setIsPreviewOpen(false);
  };

  const handleDownloadFile = (doc) => {
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewFile = (doc) => {
    setSelectedFile(doc);
    setIsPreviewOpen(true);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <Sidebar>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Documents Vault</h1>
                <p className="mt-2 text-muted-foreground">Securely store and manage your important documents</p>
              </div>
              
              <div className="flex items-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="flex items-center gap-2"
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{viewMode === 'grid' ? 'List' : 'Grid'}</span>
                </Button>
                <Button
                  onClick={() => setIsUploadOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span 
                  //className="hidden sm:inline"
                  >Upload</span>
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mt-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Documents Grid/List */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
         

{/* new code */}

  <div className="px-4 py-6 sm:px-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse h-24 bg-gray-200 rounded-md mb-4 dark:bg-gray-700" />
            ))
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              {/* <FolderOpen className="w-8 h-8 text-muted-foreground mb-2" /> */}
              <p>No documents found.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'}>
              {filteredDocuments.map(doc => (
                <div key={doc.id} className={`bg-card border border-border rounded-lg p-4 group`}>
                  {/* Document card UI */}
                  <h4 className="text-base font-semibold mb-2 truncate max-w-full break-all">{doc.name}</h4>
                  <Badge className={getCategoryColor(doc.category)}>{doc.category}</Badge>
                  <p className="text-xs mt-1">{doc.size} • {new Date(formatDate(doc.uploadDate)?.seconds * 1000).toLocaleDateString()}</p>
                  <div className="flex mt-2 space-x-2 opacity-0 group-hover:opacity-100">
                    <Button size="sm" variant="ghost" onClick={() => handlePreviewFile(doc)}><Eye className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDownloadFile(doc)}><Download className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteFile(doc.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


















        </div>

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-card-foreground">Upload Document</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUploadOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={uploadData.category}
                    onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="personal">Personal</option>
                    <option value="travel">Travel</option>
                    <option value="financial">Financial</option>
                    <option value="utility">Utility</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter document description..."
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">File Upload</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, JPG, PNG, XLSX up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {uploadData.file && (
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">File Details</h4>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><span className="font-medium">Name:</span> {uploadData.fileName}</p>
                      <p><span className="font-medium">Size:</span> {uploadData.fileSize}</p>
                      <p><span className="font-medium">Type:</span> {uploadData.fileType}</p>
                      <p><span className="font-medium">Upload Date:</span> {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setIsUploadOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUploadSubmit}
                  disabled={!uploadData.file}
                >
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {isPreviewOpen && selectedFile && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}>
                    {/* ${selectedFile.bgColor}  */}
                    {/* <selectedFile.icon className={`w-5 h-5 ${selectedFile.color}`} /> */}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-card-foreground">{selectedFile.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedFile.size} • {formatDate(selectedFile.uploadDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadFile(selectedFile)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPreviewOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-auto">
                <div className="bg-muted rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                  {selectedFile.type === 'image' ? (
                    <div className="max-w-full max-h-full">
                      <img
                        src={selectedFile.url}
                        alt={selectedFile.name}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                  ) :
                   selectedFile.type === 'pdf' ? (
    <iframe
      src={selectedFile.url}
      title="PDF Preview"
      className="w-full h-[600px] rounded-lg border border-border"
    />
  )
  : selectedFile.type === 'doc' || selectedFile.type === 'docx' || selectedFile.type === 'xlsx' ? (
    <iframe
      src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedFile.url)}&embedded=true`}
      className="w-full h-[500px] rounded-lg"
      frameBorder="0"
      title="Office Preview"
    />
  ) : selectedFile.type === 'spreadsheet' ? (
    <iframe
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(selectedFile.url)}`}
      title="Excel Preview"
      className="w-full h-[600px] rounded-lg border border-border"
    />
  ) :
                  (
                    <div className="text-center">
                      <selectedFile.icon className={`w-16 h-16 ${selectedFile.color} mx-auto mb-4`} />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Preview Not Available</h3>
                      <p className="text-muted-foreground mb-4">
                        This file type cannot be previewed in the browser.
                      </p>
                      <Button onClick={() => handleDownloadFile(selectedFile)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download to View
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">File Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge className={getCategoryColor(selectedFile.category)} variant="secondary">
                          {selectedFile.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="text-foreground">{selectedFile.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="text-foreground">{selectedFile.type.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uploaded:</span>
                        {/* <span className="text-foreground">{selectedFile.uploadDate}</span> */}
                        <span className="text-foreground">
  {selectedFile.uploadDate?.toDate?.().toLocaleDateString?.() || 'N/A'}
</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedFile.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-6 border-t border-border">
                {/* <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div> */}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteFile(selectedFile.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}