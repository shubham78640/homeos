"use client";

import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  CreditCard,
  Calendar,
  Shield,
  Bell,
  Settings,
  Save,
  Edit3,
  Crown,
  Eye,
  EyeOff,
 FileUser,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from "next/navigation";
import { useAuth } from '../context/AuthContext'; // Import useAuth
import ProtectedLayout from "../../components/ProtectedLayout"


export default function ProfilePage() {
     const { currentUser, loading: authLoading, patronDetails, patronDataLoading, patronDataError } = useAuth(); // Destructure all needed states from useAuth()
       const displayedPatronName = patronDetails.length > 0 ? patronDetails[0].patronName || 'N/A' : 'Not Linked';
      const displayedPatronNumber = patronDetails.length > 0 ? patronDetails[0].mobile_number1 || 'N/A' : 'N/A';
     const displayedPatronId = patronDetails.length > 0 ? patronDetails[0].id || 'N/A' : 'N/A';

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const { theme, setTheme } = useTheme();
   const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

   console.log("patrdon", patronDetails)
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    bio: 'I enjoy traveling, fine dining, and collecting art.',
    accountType: 'Premium (Annual)',
    memberSince: 'January 15, 2023',
    nextBilling: 'January 15, 2024',
    paymentMethod: 'Visa ending in 4242'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    weeklyDigest: true,
    taskReminders: true
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'userDetails', label: 'User Details', icon: FileUser },
    // { id: 'preferences', label: 'Preferences', icon: Shield },
     { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
    console.log('Profile saved:', profileData);
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        {/* <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Update your personal details and profile picture.</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                {/* <User className="w-16 h-16 text-muted-foreground" /> */}
                <img  src={patronDetails[0]?.profileImage} className="w-18 h-18 text-muted-foreground"/>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button variant="outline" size="sm" disabled={!isEditing}>
              Change Photo
            </Button>
          </div>

          {/* Form Fields */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="fullName"
                value={displayedPatronName}
                onChange={(e) => setProfileData({...patronDetails, fullName: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={patronDetails[0]?.email1}
                onChange={(e) => setProfileData({...patronDetails, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={patronDetails[0]?.mobile_number1}
                onChange={(e) => setProfileData({...patronDetails, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </Label>
              <Input
                id="address"
                value={patronDetails[0]?.billingAddress}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={patronDetails[0]?.shortDescription}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                disabled={!isEditing}
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Account Information</h3>
          <p className="text-sm text-muted-foreground">Manage your account details and subscription.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Account Service Type</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Crown className="w-3 h-3 mr-1" />
                  {patronDetails[0]?.serviceType}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">User Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
             <div>
              <Label className="text-sm font-medium text-foreground">Billing Name</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.billingName}</p>
            </div>
          </div>


          <div className="space-y-4">
             <div>
              <Label className="text-sm font-medium text-foreground">Assign LM Name</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.assignedLM}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Operation City</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.operationCity}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Operation Billing Address</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.opBillingAddress}</p>
            </div>
          </div>
          
          
        </div>

        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Billing History
          </Button>
        </div> */}
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    // <div className="space-y-6">
    //   <div className="bg-card border border-border rounded-lg p-6">
    //     <h3 className="text-lg font-semibold text-card-foreground mb-4">General Preferences</h3>
    //     <div className="space-y-4">
    //       <div className="flex items-center justify-between">
    //         <div>
    //           <Label className="text-sm font-medium text-foreground">Language</Label>
    //           <p className="text-sm text-muted-foreground">Choose your preferred language</p>
    //         </div>
    //         <select className="px-3 py-2 border border-input bg-background rounded-md text-sm">
    //           <option>English (US)</option>
    //           <option>Spanish</option>
    //           <option>French</option>
    //         </select>
    //       </div>

    //       <div className="flex items-center justify-between">
    //         <div>
    //           <Label className="text-sm font-medium text-foreground">Time Zone</Label>
    //           <p className="text-sm text-muted-foreground">Set your local time zone</p>
    //         </div>
    //         <select className="px-3 py-2 border border-input bg-background rounded-md text-sm">
    //           <option>Eastern Time (ET)</option>
    //           <option>Central Time (CT)</option>
    //           <option>Mountain Time (MT)</option>
    //           <option>Pacific Time (PT)</option>
    //         </select>
    //       </div>

    //       <div className="flex items-center justify-between">
    //         <div>
    //           <Label className="text-sm font-medium text-foreground">Date Format</Label>
    //           <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
    //         </div>
    //         <select className="px-3 py-2 border border-input bg-background rounded-md text-sm">
    //           <option>MM/DD/YYYY</option>
    //           <option>DD/MM/YYYY</option>
    //           <option>YYYY-MM-DD</option>
    //         </select>
    //       </div>
    //     </div>
    //   </div>
    // </div>
<>
    <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Account Information</h3>
          <p className="text-sm text-muted-foreground">Manage your account details and subscription.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Account Service Type</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Crown className="w-3 h-3 mr-1" />
                  {patronDetails[0]?.serviceType}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
              <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
            
             <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Operation City</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.operationCity}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Operation Billing Address</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.opBillingAddress}</p>
            </div>
              <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
            
             <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
          </div>
          
        </div>

        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Billing History
          </Button>
        </div> */}

        
      </div>


       <div className="bg-card border border-border rounded-lg p-6 mt-5">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Account Information</h3>
          <p className="text-sm text-muted-foreground">Manage your account details and subscription.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Account Service Type</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Crown className="w-3 h-3 mr-1" />
                  {patronDetails[0]?.serviceType}
                </Badge>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>

             <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>

             <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronType}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Operation City</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.operationCity}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Operation Billing Address</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.opBillingAddress}</p>
            </div>
          </div>
          
          
        </div>

        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Billing History
          </Button>
        </div> */}

        
      </div>


</>
  );

  const renderUserDetailsTab = () => (
    // <div className="space-y-6">
    //   <div className="bg-card border border-border rounded-lg p-6">
    //     <h3 className="text-lg font-semibold text-card-foreground mb-4">Notification Preferences</h3>
    //     <div className="space-y-6">
    //       {Object.entries(preferences).map(([key, value]) => (
    //         <div key={key} className="flex items-center justify-between">
    //           <div>
    //             <Label className="text-sm font-medium text-foreground capitalize">
    //               {key.replace(/([A-Z])/g, ' $1').trim()}
    //             </Label>
    //             <p className="text-sm text-muted-foreground">
    //               {key === 'emailNotifications' && 'Receive notifications via email'}
    //               {key === 'pushNotifications' && 'Receive push notifications in your browser'}
    //               {key === 'smsNotifications' && 'Receive notifications via SMS'}
    //               {key === 'marketingEmails' && 'Receive promotional emails and updates'}
    //               {key === 'weeklyDigest' && 'Get a weekly summary of your activity'}
    //               {key === 'taskReminders' && 'Receive reminders for upcoming tasks'}
    //             </p>
    //           </div>
    //           <button
    //             onClick={() => handlePreferenceChange(key)}
    //             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
    //               value ? 'bg-primary' : 'bg-muted'
    //             }`}
    //           >
    //             <span
    //               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
    //                 value ? 'translate-x-6' : 'translate-x-1'
    //               }`}
    //             />
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
    <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">User Information</h3>
          <p className="text-sm text-muted-foreground">Manage your User details and subscription.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">ID</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {/* <Crown className="w-3 h-3 mr-1" /> */}
                  {patronDetails[0]?.newPatronID}
                </Badge>
              </div>
            </div>

             <div>
              <Label className="text-sm font-medium text-foreground">Occupation</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.occupation}</p>
            </div>
              <div>
              <Label className="text-sm font-medium text-foreground">First Name</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronFirstName}</p>
            </div>
              <div>
              <Label className="text-sm font-medium text-foreground">Last Name</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronLastName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Interests</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.interests}</p>
            </div>
           
          </div>

          <div className="space-y-4">
              <div>
              <Label className="text-sm font-medium text-foreground">Status</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.patronStatus}</p>
            </div>
           

           <div>
              <Label className="text-sm font-medium text-foreground">Gender</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.gender}</p>
            </div>
             <div>
              <Label className="text-sm font-medium text-foreground">maritalStatus</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.maritalStatus}</p>
            </div>
              <div>
              <Label className="text-sm font-medium text-foreground">Hobbies</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.hobbies}</p>
            </div>
            
             {/* <div>
              <Label className="text-sm font-medium text-foreground">Patron Type</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.gender}</p>
            </div> */}
          </div>
          
        </div>

        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Billing History
          </Button>
        </div> */}

        
      </div>


       <div className="bg-card border border-border rounded-lg p-6 mt-5">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Address</h3>
          <p className="text-sm text-muted-foreground">Address</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">Address Line 1</Label>
              <div className="flex items-center gap-2 mt-1">
                {/* <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Crown className="w-3 h-3 mr-1" /> */}
                  {patronDetails[0]?.addressLine1}
                {/* </Badge> */}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Address Line 2</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.addressLine2}</p>
            </div>

             <div>
              <Label className="text-sm font-medium text-foreground">City</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.city}</p>
            </div>

             
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">PinCode</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.pinCode}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">State</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.state}</p>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground">Countrys</Label>
              <p className="text-sm text-muted-foreground mt-1">{patronDetails[0]?.country}</p>
            </div>
          </div>
          
          
        </div>

        {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Billing History
          </Button>
        </div> */}

        
      </div>


</>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6 ">
      <div className="flex bg-card border border-border rounded-lg p-6">
        <h4 className='text-lg font-semibold text-card-foreground p-2'>Theme</h4>
  <button
              onClick={toggleTheme}
              className="rounded-md p-2 ml-4 text-foreground hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
         

      {/* <h3 className="text-lg font-semibold text-card-foreground mb-4">Change Password</h3> */}
        {/* <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={security.currentPassword}
                onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={security.newPassword}
              onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={security.confirmPassword}
              onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
            />
          </div>

          <Button>Update Password</Button>
        </div> */}
      </div>

      {/* <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-foreground">Enable 2FA</Label>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setSecurity({...security, twoFactorEnabled: !security.twoFactorEnabled})}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              security.twoFactorEnabled ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div> */}
    </div>
  );

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile & Preferences</h1>
                <p className="mt-2 text-muted-foreground">Manage your account settings and preferences</p>
              </div>
              
              {/* <Button className="hidden sm:flex">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button> */}
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'userDetails' && renderUserDetailsTab()}
            {/* {activeTab === 'preferences' && renderPreferencesTab()} */}
            {activeTab === 'settings' && renderSecurityTab()}
          </div>
        </div>

        {/* Mobile Save Button */}
        {/* <div className="sm:hidden fixed bottom-4 right-4">
          <Button className="rounded-full shadow-lg">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div> */}
      </div>
    </ProtectedLayout>
  );
}