"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import toast, { Toaster } from "react-hot-toast";
import TaskDialog from "../../components/TaskDetailDialog";
import {
  Send,
  Bot,
  User,
  Paperclip,
  Mic,
  MoreHorizontal,
  Calendar,
  FileText,
  CheckSquare,
  Crown,
  Home,
  MessageCircle,
  Bell,
  MoreVertical,
  ShoppingBag,
  Menu as MenuIcon,
} from "lucide-react";
import ProtectedLayout from "../../components/ProtectedLayout";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage, auth } from "../firebase/config";
import ChatShimmer from "../../components/shimmerui/ChatShimmer";

export default function ConciergeChatPage() {
  const [messages, setMessages] = useState([]);
  const {
    currentUser,
    loading: authLoading,
    patronDetails,
    dataError: authDataError,
  } = useAuth();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const endRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showMenuId, setShowMenuId] = useState(null);
  const longPressTimer = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.uid && !userId) {
      setUserId(currentUser.uid);
      console.log("✅ User ID loaded once:", currentUser.uid);
    }
  }, [currentUser, userId]);

  //console.log("Current Firebase User ID:",userId );
  const displayedPatronId =
    patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";
  const displayedPatronName =
    patronDetails.length > 0 ? patronDetails[0].patronName || "N/A" : "N/A";
  const displayedLMName =
    patronDetails.length > 0 ? patronDetails[0].assignedLM || "N/A" : "N/A";
  // const displayedAssignLMName =
  // patronDetails.length > 0 ? patronDetails[0].id || "N/A" : "N/A";
  const displayedBackupLMName =
    patronDetails.length > 0 ? patronDetails[0].backupLmName || "N/A" : "N/A";
  const displayClientCode =
    patronDetails.length > 0 ? patronDetails[0].clientCode || "N/A" : "N/A";
  const displayNewID =
    patronDetails.length > 0 ? patronDetails[0].newPatronID || "N/A" : "N/A";
  const displayNewName =
    patronDetails.length > 0 ? patronDetails[0].newPatronName || "N/A" : "N/A";
  const displaypatronBusinessID =
    patronDetails.length > 0
      ? patronDetails[0].patronBusinessID || "N/A"
      : "N/A";
  const displayPatronBillingAdress =
    patronDetails.length > 0 ? patronDetails[0].billingAddress || "N/A" : "N/A";
  const displayedPatronEmail =
    patronDetails.length > 0 ? patronDetails[0].email || "N/A" : "N/A";

  // const backupLmRef = doc(db, "user", );
  //
  //   useEffect(() => {
  //   if (currentUser?.length > 0) {
  //     console.log("jjiii", patronDetails);

  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (patronDetails?.length > 0) {
      console.log("jjiii", patronDetails);
    }
  }, [patronDetails]);
  //const userid = currentUser.uid;

  //

  // console.log("jjiii",userid)
  // const patronRef = doc(db, "addPatronDetails", displayedPatronId);
  const quickActions = [
    {
      label: "TaskCreate",
      value: "@TaskCreate",
      icon: CheckSquare,
      id: "TSK0025",
    },
    { label: "OTS", value: "@OTS", icon: FileText, id: "OTS0026" },
    { label: "Purchase", value: "@Purchase", icon: ShoppingBag, id: "ODR0027" },
    { label: "Book", value: "@Book", icon: Calendar, id: "BOOK0029" },
  ];

  const suggestedPrompts = [
    "Repeat Friday's dinner order?",
    "Book a massage for tomorrow?",
    "Check flight status for AA123?",
  ];

  if (!displayedPatronId || displayedPatronId === "N/A") return;
  const chatRef = collection(
    db,
    "addPatronDetails",
    displayedPatronId,
    "messages"
  );

  const patronRef1 = doc(db, "addPatronDetails", displayedPatronId);
  const patronData = patronDetails[0];
  const lmRef = patronData?.lmRef;
  //  const lmRef1 = doc(db, "user", userId);
  // const backupLmRef = doc(db, "user", "UV5Yp1TtfbawV0fwmoTe1q8TLSI3");
  //console.log("lmRef",lmRef)
  const fetchMessages = async () => {
    try {
      const snapshot = await getDocs(chatRef);
      const messageList = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds); // 🔽 Sort by time
      setMessages(messageList);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    }
  };

  fetchMessages();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  //ne ocde

  const getTaskTypeFromMessage = (messageText) => {
    const action = quickActions.find((action) =>
      messageText.includes(action.value)
    );
    return action ? action.label.toLowerCase() : null;
  };

  const sendMessageToFirestore = async (imageUrl = null) => {
    // const isTaskCreation = inputMessage.includes("@TaskCreate");
    const taskType = getTaskTypeFromMessage(inputMessage);
    const isTask = !!taskType;

    // 1. If message contains @TaskCreate, create task
    if (isTask) {
      const taskData = {
        // taskDescription: inputMessage,
        // createdBy: displayedPatronEmail,
        // priority: "Medium",
        // partonName: displayedPatronName,
        // patronNewName: displayNewName,
        // patronHarmoneyID: displayedPatronId,
        // patronID: displaypatronBusinessID,
        // patronNewID: displayNewID,
        // createdAt: serverTimestamp(),
        // status: "created",
        // relatedMessageText: inputMessage,
        // remarks: "",
        // taskAssignDate: serverTimestamp(),
        // taskStatusCategory: "To be Started",
        // taskInput: inputMessage,
        // isCuratorTask: false,
        // taskSubject: inputMessage,
        // assignedLMName: displayedLMName,
        // patronclientCode: displayClientCode,
        // patronBillingAdress: displayPatronBillingAdress,
        // backupLMName: displayedBackupLMName,
        // // status: `${taskType}_created`,
        // type: isTask
        //   ? "task"
        //   : imageUrl
        //   ? "image"
        //   : audioUrl
        //   ? "audio"
        //   : "text",
        // taskType: taskType || null,
        // patronRef: patronRef1,
        // lmRef: lmRef,
        // taskDate: serverTimestamp(),
        // taskAssignDate: serverTimestamp(),
        // taskDueDate: serverTimestamp(),
        // taskRecievedTime: serverTimestamp(),
        // taskCategory: "buy",
        // taskSubCategory: "buy",
        // categoryTag: "buy",
        // // createdAt: serverTimestamp(),
        // isTaskDisabled: false,
        // taskSubject: inputMessage,
        // billingModel: "billable",

         taskSubject: inputMessage,
  taskDescription: inputMessage,
  taskCategory: "",
  taskSubCategory: "",
  categoryTag: "",
  taskAssignDate: serverTimestamp(), // or use: new Date(assignDate)
  taskDueDate: serverTimestamp(),    // or use: new Date(dueDate)
  assignedLMName: displayedLMName,   // set this value from logged-in user
  billingModel: "",
  priority: "Medium",
  patronId: displayClientCode,       // or the equivalent of widget.patron.clientCode
  partonName: displayedPatronName,     // NOTE: 'partonName' used in Dart too
  patronRef: patronRef1,             // get reference from Firestore if needed
  createdAt: serverTimestamp(),
  createdBy: displayedPatronEmail,         // harmonyUser.email equivalent
  isTaskDisabled: false,
  taskStatusCategory: "To be Started",
  lmRef: lmRef,                      // set as Firestore userRef
  patronID: displayClientCode,       // duplicate of patronId, keep only if needed
  refImage: "" 
      };

      const taskRef = await addDoc(
        collection(db, "createTaskCollection"),
        taskData
      );

      // 2. Add task message in chat
      await addDoc(chatRef, {
        text: inputMessage,
        taskId: taskRef.id,
        taskDescription: inputMessage,
        imageUrl: imageUrl || null,
        audioUrl: null,
        senderId: displayedPatronId,
        senderName: displayedPatronName,
        timestamp: serverTimestamp(),
        senderType: "patron",
        isFromPatron: true,
        status: "sent",
        type: isTask
          ? "task"
          : imageUrl
          ? "image"
          : audioUrl
          ? "audio"
          : "text",
        taskType: taskType || null, // Save only if task
        isAction: isTask,
      });

      // alert("✅ Task created successfully!");
      toast.success("Task created successfully!");
    } else {
      // 3. Normal message or image
      await addDoc(chatRef, {
        text: inputMessage || "",
        imageUrl: imageUrl || null,
        audioUrl: null,
        senderId: displayedPatronId,
        senderName: displayedPatronName,
        timestamp: serverTimestamp(),
        senderType: "patron",
        isFromPatron: true,
        status: `${taskType}_created`,
        type: imageUrl ? "image" : "text",
      });
    }

    setInputMessage("");
    setImageFile(null);
    setImagePreview(null);

    fetchMessages(); // 🔁 Re-fetch messages
  };

  //new code

  const handleChange = (e) => {
    setInputMessage(e.target.value);

    if (e.target.value.endsWith("@")) {
      setShowSuggestions(true);
    }
  };

  const handleMentionClick = (quickActions) => {
    const newText = inputMessage + quickActions.label + " ";
    setInputMessage(newText);
    setShowSuggestions(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !imageFile && !audioFile) || isUploading)
      return;

    //setIsLoading(true);
    let imageUrl = null;

    if (imageFile) {
      setIsUploading(true);
      const storageRef = ref(
        storage,
        `chatImages/${Date.now()}_${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Image upload failed:", error);
          setIsUploading(false);
        },
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setIsUploading(false);
          await sendMessageToFirestore(imageUrl);
        }
      );
    } else {
      await sendMessageToFirestore(null);
    }
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const handleSuggestedPrompt = (prompt) => {
    setInputMessage(prompt);
  };

  const handleLongPressStart = (id) => {
    longPressTimer.current = setTimeout(() => {
      setShowMenuId(id);
    }, 600); // long press delay
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const handleViewTask = async (taskId) => {
    const taskDoc = await getDoc(doc(db, "createTaskCollection", taskId));
    if (taskDoc.exists()) {
      setSelectedTask({ id: taskDoc.id, ...taskDoc.data() });
      setIsDialogOpen(true);
    }
  };

  const convertMessageToTask = async (message) => {
    const taskType = getTaskTypeFromMessage(message.text) || "general";

    const taskData = {
    //   taskDescription: message.text,
    //   createdBy: displayedPatronEmail,
    //   priority: "Medium",
    //  // partonName: displayedPatronName,
    //    partonName: displayedPatronName,
    //   patronNewName: displayNewName,
    //   patronHarmoneyID: displayedPatronId,
    //   patronID: displaypatronBusinessID,
    //   patronNewID: displayNewID,
    //   createdAt: serverTimestamp(),
    //   status: "created",
    //   remarks: "",
    //   relatedMessageText: message.text,
    //   taskAssignDate: serverTimestamp(),
    //   taskStatusCategory: "To be Started",
    //   taskInput: message.text,
    //   isCuratorTask: false,
    //   taskSubject: message.text,
    //   assignedLMName: displayedLMName,
    //   patronclientCode: displayClientCode,
    //   patronBillingAdress: displayPatronBillingAdress,
    //   backupLMName: displayedBackupLMName,
    //   patronRef: patronRef1,
    //   taskType,
    //   lmRef: lmRef,
    //   taskDate: serverTimestamp(),
    //   taskAssignDate: serverTimestamp(),
    //   taskDueDate: serverTimestamp(),
    //   taskRecievedTime: serverTimestamp(),
    //   taskCategory: "buy",
    //   taskSubCategory: "by",
    //   categoryTag: "bu",
    //   // createdAt: serverTimestamp(),
    //   isTaskDisabled: false,
    //   taskSubject: inputMessage,
    //   billingModel: "billable",

  taskSubject: message?.text,
  taskDescription: message?.text,
  taskCategory: "",
  taskSubCategory: "",
  categoryTag: "",
  taskAssignDate: serverTimestamp(), // or use: new Date(assignDate)
  taskDueDate: serverTimestamp(),    // or use: new Date(dueDate)
  assignedLMName: displayedLMName,   // set this value from logged-in user
  billingModel: "",
  priority: "Medium",
  patronId: displayClientCode,       // or the equivalent of widget.patron.clientCode
  partonName: displayedPatronName,     // NOTE: 'partonName' used in Dart too
  patronRef: patronRef1,             // get reference from Firestore if needed
  createdAt: serverTimestamp(),
  createdBy: displayedPatronEmail,         // harmonyUser.email equivalent
  isTaskDisabled: false,
  taskStatusCategory: "To be Started",
  lmRef: lmRef,                      // set as Firestore userRef
  patronID: displayClientCode,       // duplicate of patronId, keep only if needed
  refImage: "", 
    };

    // 1. Add to task collection
    const taskRef = await addDoc(
      collection(db, "createTaskCollection"),
      taskData
    );

    // 2. Update existing message to become a task
    const msgRef = doc(
      db,
      "addPatronDetails",
      displayedPatronId,
      "messages",
      message.id
    ); // update with correct collection path
    await updateDoc(msgRef, {
      taskId: taskRef.id,
      taskDescription: message.text,
      type: "task",
      status: `${taskType}_created`,
      isAction: true,
      taskType,
    });
    toast.success("Task created from message!");
    fetchMessages(); // refresh UI
  };

  const cancelTask = async (message) => {
    try {
      const taskId = message.taskId;
      const messageId = message.id;

      // ✅ Update task status in `createTaskCollection`
      const taskRef = doc(db, "createTaskCollection", taskId);
      await updateDoc(taskRef, {
        status: "cancelled",
        taskStatusCategory: "Cancelled",
        cancelledBy: displayedPatronEmail,
        cancelledById: displayedPatronId,
        cancelledAt: new Date(),
      });

      // ✅ Update related message status in `addPatronDetails/{id}/messages`
      const msgRef = doc(
        db,
        "addPatronDetails",
        displayedPatronId,
        "messages",
        messageId
      );
      await updateDoc(msgRef, {
        status: "cancelled",
      });

      toast.success("✅ Task cancelled successfully!");
      fetchMessages(); // optional: reload chat
    } catch (error) {
      console.error("❌ Error cancelling task:", error);
      toast.error("❌ Failed to cancel task.");
    }
  };

  return (
    <ProtectedLayout>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {displayedLMName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Lifrestyle Manager
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            >
              Online
            </Badge>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden ">
          <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col-reverse gap-6">
              {[...messages].reverse().map((message) => (
                <div
                  key={message.id}
                  className={`group relative flex items-start space-x-3 ${
                    message.isFromPatron === true
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  onTouchStart={() => handleLongPressStart(message.id)}
                  onTouchEnd={handleLongPressEnd}
                >
                  {/* Avatar */}
                  {message.isFromPatron !== true && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className="flex flex-col max-w-xs sm:max-w-md lg:max-w-lg">
                    <div
                      className={`px-4 py-3 rounded-2xl relative ${
                        message.isFromPatron === true
                          ? "bg-[#075E54] text-primary-foreground rounded-br-md"
                          : "bg-[#273443] text-primary-foreground rounded-bl-md"
                      }`}
                    >
                      <div className="text-sm leading-relaxed space-y-2">
                        {message.text && <p>{message.text}</p>}
                        {message.imageUrl && (
                          <img
                            src={message.imageUrl}
                            alt="Sent image"
                            className="rounded-lg max-w-full max-h-60"
                          />
                        )}
                        {message.audioUrl && (
                          <audio controls className="w-full">
                            <source src={message.audioUrl} />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                        {/* Task created COde Start Importa code and useful code */}
                        {message.type === "task" && (
                          <div className="mt-3 p-4 bg-[#1e2a38] text-white rounded-xl shadow-lg border border-blue-500 space-y-2">
                            <div className="text-sm font-semibold">
                              {message.status === "cancelled"
                                ? "❌ Task Cancelled"
                                : "📝 Task Created"}
                            </div>
                            {/* <div className="text-xs text-gray-300">{message.text}</div> */}
                            {/* <div className="text-xs text-gray-400">
                                      {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}
                               </div> */}

                            {message.status !== "cancelled" && (
                              <button
                                onClick={() => handleViewTask(message.taskId)}
                                className="mt-1 text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full"
                              >
                                View Details
                              </button>
                            )}
                          </div>
                        )}

                        {/* Task created COde End */}
                      </div>

                      {/* Context Menu */}

                      {/* new code for 3 dots and option values */}

                      <div
                        className="absolute top-2 right-2 hidden group-hover:block cursor-pointer"
                        onClick={() =>
                          setShowMenuId((prev) =>
                            prev === message.id ? null : message.id
                          )
                        }
                      >
                        <MoreVertical className="w-4 h-4 text-white" />
                      </div>

                      {/* Context Menu */}
                      {showMenuId === message.id && (
                        <div
                          className="absolute z-10 top-8 right-2 bg-white text-black text-sm rounded-md shadow-lg w-44"
                          onMouseLeave={() => setShowMenuId(null)}
                        >
                          {/* {message.taskId ? */}
                          {message.status ===
                          "cancelled" ? null : message.taskId ? (
                            // Task already created — show cancel option
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                              onClick={() => {
                                setShowMenuId(null);
                                cancelTask(message);
                              }}
                            >
                              Cancel Task
                            </button>
                          ) : (
                            // Task not created — show creation options
                            <>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                  console.log("Create Task", message);
                                  setShowMenuId(null);
                                  convertMessageToTask(message);
                                  // handleCreateTaskFromMessage(message)
                                }}
                              >
                                Create Task
                              </button>
                              {/* <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    console.log("Create Task with AI", message);
                     setShowMenuId(null);
                    }}
                   >
                   Create Task with AI
                  </button> */}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <p
                      className={`text-xs mt-1 text-muted-foreground ${
                        message.type === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp?.toDate
                        ? message.timestamp.toDate().toLocaleString()
                        : ""}
                    </p>
                  </div>

                  {/* User Avatar */}
                  {message.type === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="bg-muted text-foreground max-w-xs px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )} */}
              {isLoading && <ChatShimmer />}
            </div>

            {inputMessage.length <= 0 && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(`@${action.label}`)}
                      className="text-xs"
                    >
                      <action.icon className="w-3 h-3 mr-1" />@{action.label}
                    </Button>
                  ))}
                </div>

                {/* Suggested Prompts */}
                {/* <div className="space-y-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="block w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div> */}
              </div>
            )}
            <div className="border-t border-border py-4 bg-background ">
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t flex items-center space-x-2 mb-8 sm:mb-0"
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload">
                  <Paperclip className="w-5 h-5 cursor-pointer" />
                </label>

                <Input
                  value={inputMessage}
                  //  onChange={(e) => setInputMessage(e.target.value)}
                  onChange={handleChange}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isUploading}
                />
                {showSuggestions && (
                  <ul className="absolute bg-white border mt-1 z-10 w-full">
                    {quickActions.map((user, value) => (
                      <li
                        key={user.id}
                        className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                        onClick={() => handleMentionClick(user)}
                      >
                        {user.value}
                      </li>
                    ))}
                  </ul>
                )}

                {imagePreview && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-10 h-10 rounded-md"
                    />
                    {isUploading && (
                      <span className="text-xs text-muted-foreground">
                        Uploading...
                      </span>
                    )}
                  </div>
                )}
                {/* <Toaster position="top-right" /> */}
                <Button
                  type="submit"
                  disabled={isUploading || (!inputMessage.trim() && !imageFile)}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        taskData={selectedTask}
        onUpdate={() => fetchMessages()}
      />
    </ProtectedLayout>
  );
}
