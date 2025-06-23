"use client";

import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Filter,
  Search,
  Plus,
  MessageCircle,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  ArrowLeft,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Pause,
  Eye,
  Edit3
} from 'lucide-react';

export default function MyRequestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const requests = [
    {
      id: 1,
      title: 'Special Dinner Arrangement',
      description: 'Need to arrange a special anniversary dinner with specific requirements.',
      status: 'New',
      statusColor: 'new',
      priority: 'high',
      date: 'Today',
      time: '2:30 PM',
      assignedTo: 'Bruce (AI Concierge)',
      category: 'Dining',
      messageCount: 3,
      lastMessage: 'I\'ve found several excellent restaurants that match your criteria. Would you like me to make a reservation?',
      lastMessageTime: '10 minutes ago',
      messages: [
        {
          id: 1,
          sender: 'You',
          content: 'I need help arranging a special anniversary dinner for this Saturday evening. We\'d like somewhere romantic with excellent food.',
          timestamp: '2:20 PM',
          type: 'user'
        },
        {
          id: 2,
          sender: 'Bruce',
          content: 'I\'d be happy to help you arrange a perfect anniversary dinner! Could you tell me more about your preferences? Any specific cuisine, budget range, or location preferences?',
          timestamp: '2:22 PM',
          type: 'assistant'
        },
        {
          id: 3,
          sender: 'You',
          content: 'We love Italian food and prefer somewhere in downtown. Budget around $200-300 for two people. A quiet atmosphere would be perfect.',
          timestamp: '2:25 PM',
          type: 'user'
        },
        {
          id: 4,
          sender: 'Bruce',
          content: 'Perfect! I\'ve found several excellent restaurants that match your criteria. Would you like me to make a reservation at Bella Vista - they have a beautiful private dining area and excellent Italian cuisine?',
          timestamp: '2:28 PM',
          type: 'assistant'
        }
      ]
    },
    {
      id: 2,
      title: 'Custom Travel Itinerary',
      description: 'Planning a 10-day trip to Europe and need help with a custom itinerary.',
      status: 'In Progress',
      statusColor: 'progress',
      priority: 'medium',
      date: 'Yesterday',
      time: '4:15 PM',
      assignedTo: 'Sarah (Travel Specialist)',
      category: 'Travel',
      messageCount: 4,
      lastMessage: 'I\'ve prepared a detailed itinerary for your European trip. Please review the attached document.',
      lastMessageTime: '2 hours ago',
      messages: [
        {
          id: 1,
          sender: 'You',
          content: 'I\'m planning a 10-day trip to Europe in June. I\'d like to visit Paris, Rome, and Barcelona. Can you help me create an itinerary?',
          timestamp: 'Yesterday 4:15 PM',
          type: 'user'
        },
        {
          id: 2,
          sender: 'Sarah',
          content: 'Absolutely! A 10-day trip to those three cities sounds wonderful. What are your main interests? Art, history, food, nightlife? And what\'s your approximate budget?',
          timestamp: 'Yesterday 4:20 PM',
          type: 'assistant'
        },
        {
          id: 3,
          sender: 'You',
          content: 'We\'re interested in art, history, and great food. Budget is around $5000 for two people including flights from New York.',
          timestamp: 'Yesterday 4:25 PM',
          type: 'user'
        },
        {
          id: 4,
          sender: 'Sarah',
          content: 'Perfect! I\'ve prepared a detailed itinerary for your European trip with museum visits, historical sites, and restaurant recommendations. Please review the attached document.',
          timestamp: '2 hours ago',
          type: 'assistant'
        }
      ]
    },
    {
      id: 3,
      title: 'Home Renovation Consultation',
      description: 'Need expert advice on kitchen renovation options.',
      status: 'Delivered',
      statusColor: 'delivered',
      priority: 'low',
      date: 'May 1, 2023',
      time: '11:30 AM',
      assignedTo: 'Mike (Home Specialist)',
      category: 'Home Services',
      messageCount: 2,
      lastMessage: 'The consultation report has been delivered. Let me know if you need any clarifications.',
      lastMessageTime: '3 days ago',
      messages: [
        {
          id: 1,
          sender: 'You',
          content: 'I\'m considering renovating my kitchen and would like expert advice on modern design options and cost estimates.',
          timestamp: 'May 1, 2023 11:30 AM',
          type: 'user'
        },
        {
          id: 2,
          sender: 'Mike',
          content: 'The consultation report has been delivered with detailed design options, cost estimates, and recommended contractors. Let me know if you need any clarifications.',
          timestamp: '3 days ago',
          type: 'assistant'
        }
      ]
    },
    {
      id: 4,
      title: 'Rare Book Acquisition',
      description: 'Looking for a first edition of \'The Great Gatsby\'.',
      status: 'On Hold',
      statusColor: 'hold',
      priority: 'medium',
      date: 'April 28, 2023',
      time: '3:45 PM',
      assignedTo: 'Emma (Acquisitions)',
      category: 'Collections',
      messageCount: 3,
      lastMessage: 'Found a potential match but waiting for authentication. Will update you soon.',
      lastMessageTime: '1 week ago',
      messages: [
        {
          id: 1,
          sender: 'You',
          content: 'I\'m looking for a first edition of The Great Gatsby in good condition. Budget up to $15,000.',
          timestamp: 'April 28, 2023 3:45 PM',
          type: 'user'
        },
        {
          id: 2,
          sender: 'Emma',
          content: 'I\'ll search our network of rare book dealers. First editions of The Great Gatsby are quite sought after. I\'ll keep you updated on any findings.',
          timestamp: 'April 28, 2023 4:00 PM',
          type: 'assistant'
        },
        {
          id: 3,
          sender: 'Emma',
          content: 'Found a potential match but waiting for authentication from our expert. Will update you soon with details and photos.',
          timestamp: '1 week ago',
          type: 'assistant'
        }
      ]
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'progress', label: 'In Progress' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'hold', label: 'On Hold' }
  ];

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return CheckCircle;
      case 'in progress':
        return AlertCircle;
      case 'on hold':
        return Pause;
      default:
        return Clock;
    }
  };

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.statusColor === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsChatOpen(true);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedRequest) return;

    const newMessage = {
      id: selectedRequest.messages.length + 1,
      sender: 'You',
      content: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user'
    };

    setSelectedRequest(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      messageCount: prev.messageCount + 1,
      lastMessage: chatMessage,
      lastMessageTime: 'Just now'
    }));

    setChatMessage('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: selectedRequest.messages.length + 2,
        sender: selectedRequest.assignedTo.split(' ')[0],
        content: 'Thank you for your message. I\'ll look into this and get back to you shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'assistant'
      };

      setSelectedRequest(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        messageCount: prev.messageCount + 1,
        lastMessage: assistantMessage.content,
        lastMessageTime: 'Just now'
      }));
    }, 1500);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedRequest(null);
  };

  if (isChatOpen && selectedRequest) {
    return (
      <Sidebar>
        <div className="min-h-screen bg-background">
          {/* Chat Header */}
          <div className="border-b border-border bg-background px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeChatModal}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Requests</span>
                  </Button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-foreground">{selectedRequest.assignedTo}</h1>
                      <p className="text-sm text-muted-foreground">{selectedRequest.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedRequest.statusColor)}>
                    {selectedRequest.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-hidden">
            <div className="mx-auto max-w-4xl h-full flex flex-col px-4 sm:px-6 lg:px-8">
              <div className="flex-1 overflow-y-auto py-6 space-y-6" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {selectedRequest.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col max-w-xs sm:max-w-md lg:max-w-lg">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <p className="text-xs text-muted-foreground">{message.sender}</p>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                    </div>

                    {message.type === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-border py-4 bg-background">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="pr-12 rounded-full border-muted"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="flex-shrink-0 rounded-full w-10 h-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">My Requests</h1>
                <p className="mt-2 text-muted-foreground">Track and manage your service requests</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Request</span>
                </Button>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="mt-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {statusOptions.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        selectedStatus === status.value
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Search */}
            <div className="mt-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-4">
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                
                return (
                  <div
                    key={request.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          request.statusColor === 'delivered' ? 'bg-green-100 dark:bg-green-900' :
                          request.statusColor === 'progress' ? 'bg-blue-100 dark:bg-blue-900' :
                          request.statusColor === 'hold' ? 'bg-orange-100 dark:bg-orange-900' :
                          'bg-purple-100 dark:bg-purple-900'
                        }`}>
                          <StatusIcon className={`w-5 h-5 ${
                            request.statusColor === 'delivered' ? 'text-green-600 dark:text-green-400' :
                            request.statusColor === 'progress' ? 'text-blue-600 dark:text-blue-400' :
                            request.statusColor === 'hold' ? 'text-orange-600 dark:text-orange-400' :
                            'text-purple-600 dark:text-purple-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                                {request.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <Badge className={getPriorityColor(request.priority)}>
                                {request.priority}
                              </Badge>
                              <Badge className={getStatusColor(request.statusColor)}>
                                {request.status}
                              </Badge>
                            </div>
                          </div>
                          
{/*                           
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{request.date} • {request.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{request.assignedTo}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {request.category}
                            </Badge>
                          </div> */}
                          <div className='flex justify-between'> 
                                       {request.lastMessage && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                <span className="font-medium">Latest:</span> {request.lastMessage}
                              </p>
                            </div>
                          )}
                          
                          
                          
                          <div className="flex items-center justify-end">
                            
                            <div className="flex items-center gap-4">
                         
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRequestClick(request);
                                }}
                                className="flex items-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span>{request.messageCount} messages</span>
                              </Button>
                              
                              {/* <div className="text-sm text-muted-foreground">
                                Last: {request.lastMessageTime}
                              </div> */}
                            </div>
                            
                            {/* <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Star className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div> */}
                          </div>
                          </div>
                          {/* {request.lastMessage && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                <span className="font-medium">Latest:</span> {request.lastMessage}
                              </p>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No requests found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || selectedStatus !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first service request to get started'
                  }
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Request
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}