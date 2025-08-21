import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { 
  User, 
  GraduationCap, 
  Camera, 
  Link, 
  Settings, 
  Save, 
  X, 
  RotateCcw,
  Calendar as CalendarIcon,
  Plus,
  Trash2
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";

interface PersonalInfo {
  fullName: string;
  academicDesignation: string;
  department: string;
  payScale: string;
  highestQualification: string;
  dateOfAppointment: Date | undefined;
  phoneNumber: string;
  emailAddress: string;
  officeAddress: string;
  postalAddress: string;
}

interface AcademicInfo {
  researchInterests: string;
  specializationAreas: string[];
  performancePeriodStart: Date | undefined;
  performancePeriodEnd: Date | undefined;
}

interface ResearchLinks {
  googleScholar: string;
  orcidId: string;
  researchGate: string;
  linkedIn: string;
  personalWebsite: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  researchUpdates: boolean;
  systemAlerts: boolean;
  departmentNews: boolean;
}

type PrivacySetting = 'public' | 'university' | 'private';

type ActiveSection = 'personal' | 'academic' | 'picture' | 'research' | 'settings';

const academicDesignations = [
  'Prof.',
  'Associate Prof.',
  'Assistant Prof.',
  'Lecturer'
];

const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Business Administration',
  'Economics',
  'English Literature',
  'Psychology',
  'Sociology'
];

const payScales = ['TTS', 'BPS', 'SPS', 'Contract'];

const qualifications = ['PhD', 'MS', 'MPhil', 'Masters', 'Bachelor'];

const specializationOptions = [
  'Machine Learning',
  'Data Science',
  'Software Engineering',
  'Computer Networks',
  'Database Systems',
  'Human-Computer Interaction',
  'Cybersecurity',
  'Artificial Intelligence',
  'Web Development',
  'Mobile Development'
];

export function ProfileManagement() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [hasChanges, setHasChanges] = useState(false);
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face");

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "Dr. John Smith",
    academicDesignation: "Assistant Prof.",
    department: "Computer Science",
    payScale: "BPS",
    highestQualification: "PhD",
    dateOfAppointment: new Date(2021, 8, 15),
    phoneNumber: "+1-555-123-4567",
    emailAddress: "john.smith@university.edu",
    officeAddress: "Room 204, Engineering Building, North Campus",
    postalAddress: "123 University Avenue, Academic City, State 12345, United States"
  });

  const [academicInfo, setAcademicInfo] = useState<AcademicInfo>({
    researchInterests: "My research focuses on artificial intelligence and machine learning applications in computer vision, with particular emphasis on deep learning architectures for image recognition and natural language processing. I am also interested in developing efficient algorithms for real-time data processing and exploring the applications of AI in sustainable technology solutions.",
    specializationAreas: ["Machine Learning", "Data Science", "Artificial Intelligence"],
    performancePeriodStart: new Date(2024, 0, 1),
    performancePeriodEnd: new Date(2024, 11, 31)
  });

  const [researchLinks, setResearchLinks] = useState<ResearchLinks>({
    googleScholar: "https://scholar.google.com/citations?user=example123",
    orcidId: "0000-0000-0000-1234",
    researchGate: "https://www.researchgate.net/profile/John-Smith-123",
    linkedIn: "https://linkedin.com/in/john-smith-phd",
    personalWebsite: "https://johnsmith-research.edu"
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    researchUpdates: true,
    systemAlerts: false,
    departmentNews: true
  });

  const [privacySetting, setPrivacySetting] = useState<PrivacySetting>('university');

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string | Date) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleAcademicInfoChange = (field: keyof AcademicInfo, value: string | Date | string[]) => {
    setAcademicInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleResearchLinksChange = (field: keyof ResearchLinks, value: string) => {
    setResearchLinks(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const addSpecialization = (area: string) => {
    if (!academicInfo.specializationAreas.includes(area)) {
      handleAcademicInfoChange('specializationAreas', [...academicInfo.specializationAreas, area]);
    }
  };

  const removeSpecialization = (area: string) => {
    handleAcademicInfoChange('specializationAreas', academicInfo.specializationAreas.filter(a => a !== area));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\+]?[(]?[\d\s\-\(\)]{10,}$/.test(phone);
  };

  const validateOrcid = (orcid: string) => {
    return /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(orcid);
  };

  const handleSave = () => {
    // Validation
    if (!personalInfo.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    
    if (!validateEmail(personalInfo.emailAddress)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePhone(personalInfo.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (researchLinks.orcidId && !validateOrcid(researchLinks.orcidId)) {
      toast.error("Please enter a valid ORCID ID (format: 0000-0000-0000-0000)");
      return;
    }

    toast.success("Profile updated successfully!");
    setHasChanges(false);
  };

  const handleCancel = () => {
    // Reset to original values (in a real app, you'd restore from saved state)
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
    toast.info("Profile reset to defaults");
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    toast.success("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleImageUpload = () => {
    toast.info("Image upload functionality would be implemented here");
  };

  const sidebarItems = [
    { id: 'personal' as const, label: 'Personal Information', icon: User },
    { id: 'academic' as const, label: 'Academic Information', icon: GraduationCap },
    { id: 'picture' as const, label: 'Profile Picture', icon: Camera },
    { id: 'research' as const, label: 'Research Profile Links', icon: Link },
    { id: 'settings' as const, label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-xl font-medium text-card-foreground">Profile Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your academic profile</p>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-card-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header with Action Buttons */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-medium text-foreground">
                  {sidebarItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-muted-foreground">Update your profile information</p>
              </div>
              
              {hasChanges && (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleCancel} className="text-sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="text-sm bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {/* Personal Information Section */}
            {activeSection === 'personal' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                        className="bg-input-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="designation">Academic Designation</Label>
                      <Select
                        value={personalInfo.academicDesignation}
                        onValueChange={(value) => handlePersonalInfoChange('academicDesignation', value)}
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {academicDesignations.map((designation) => (
                            <SelectItem key={designation} value={designation}>
                              {designation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={personalInfo.department}
                        onValueChange={(value) => handlePersonalInfoChange('department', value)}
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payScale">Pay Scale</Label>
                      <Select
                        value={personalInfo.payScale}
                        onValueChange={(value) => handlePersonalInfoChange('payScale', value)}
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {payScales.map((scale) => (
                            <SelectItem key={scale} value={scale}>
                              {scale}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualification">Highest Qualification</Label>
                      <Select
                        value={personalInfo.highestQualification}
                        onValueChange={(value) => handlePersonalInfoChange('highestQualification', value)}
                      >
                        <SelectTrigger className="bg-input-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {qualifications.map((qual) => (
                            <SelectItem key={qual} value={qual}>
                              {qual}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date of Appointment</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left bg-input-background"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {personalInfo.dateOfAppointment ? format(personalInfo.dateOfAppointment, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={personalInfo.dateOfAppointment}
                            onSelect={(date) => handlePersonalInfoChange('dateOfAppointment', date || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-medium text-lg">Contact Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={personalInfo.phoneNumber}
                          onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
                          className="bg-input-background"
                          placeholder="+1-555-123-4567"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalInfo.emailAddress}
                          onChange={(e) => handlePersonalInfoChange('emailAddress', e.target.value)}
                          className="bg-input-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="officeAddress">Office Address</Label>
                      <Textarea
                        id="officeAddress"
                        value={personalInfo.officeAddress}
                        onChange={(e) => handlePersonalInfoChange('officeAddress', e.target.value)}
                        className="bg-input-background min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalAddress">Postal Address</Label>
                      <Textarea
                        id="postalAddress"
                        value={personalInfo.postalAddress}
                        onChange={(e) => handlePersonalInfoChange('postalAddress', e.target.value)}
                        className="bg-input-background min-h-[80px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Academic Information Section */}
            {activeSection === 'academic' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Academic Information
                  </CardTitle>
                  <CardDescription>
                    Manage your research interests and academic details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="researchInterests">Research Interests</Label>
                    <Textarea
                      id="researchInterests"
                      value={academicInfo.researchInterests}
                      onChange={(e) => handleAcademicInfoChange('researchInterests', e.target.value)}
                      className="bg-input-background min-h-[120px]"
                      placeholder="Describe your research interests and areas of expertise..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Specialization Areas</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {academicInfo.specializationAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="flex items-center gap-1">
                          {area}
                          <button
                            onClick={() => removeSpecialization(area)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={addSpecialization}>
                      <SelectTrigger className="bg-input-background">
                        <SelectValue placeholder="Add specialization area" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializationOptions
                          .filter(option => !academicInfo.specializationAreas.includes(option))
                          .map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Current Performance Reporting Period</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left bg-input-background"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {academicInfo.performancePeriodStart ? format(academicInfo.performancePeriodStart, "PPP") : "Pick start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={academicInfo.performancePeriodStart}
                              onSelect={(date) => handleAcademicInfoChange('performancePeriodStart', date || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm">End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left bg-input-background"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {academicInfo.performancePeriodEnd ? format(academicInfo.performancePeriodEnd, "PPP") : "Pick end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={academicInfo.performancePeriodEnd}
                              onSelect={(date) => handleAcademicInfoChange('performancePeriodEnd', date || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Picture Section */}
            {activeSection === 'picture' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Profile Picture
                  </CardTitle>
                  <CardDescription>
                    Upload and manage your profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={profileImage} alt="Profile" />
                      <AvatarFallback className="text-2xl">
                        {personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="text-center space-y-2">
                      <Button onClick={handleImageUpload} className="bg-primary hover:bg-primary/90">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload New Picture
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Recommended: Square image, at least 400x400px
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supported formats: JPG, PNG (max 5MB)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Research Profile Links Section */}
            {activeSection === 'research' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="w-5 h-5 text-primary" />
                    Research Profile Links
                  </CardTitle>
                  <CardDescription>
                    Add links to your academic and research profiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="googleScholar">Google Scholar Profile URL</Label>
                    <Input
                      id="googleScholar"
                      type="url"
                      value={researchLinks.googleScholar}
                      onChange={(e) => handleResearchLinksChange('googleScholar', e.target.value)}
                      className="bg-input-background"
                      placeholder="https://scholar.google.com/citations?user=..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orcid">ORCID ID</Label>
                    <Input
                      id="orcid"
                      value={researchLinks.orcidId}
                      onChange={(e) => handleResearchLinksChange('orcidId', e.target.value)}
                      className="bg-input-background"
                      placeholder="0000-0000-0000-0000"
                    />
                    <p className="text-sm text-muted-foreground">
                      Format: 0000-0000-0000-0000
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="researchGate">ResearchGate Profile URL</Label>
                    <Input
                      id="researchGate"
                      type="url"
                      value={researchLinks.researchGate}
                      onChange={(e) => handleResearchLinksChange('researchGate', e.target.value)}
                      className="bg-input-background"
                      placeholder="https://www.researchgate.net/profile/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn Profile URL</Label>
                    <Input
                      id="linkedIn"
                      type="url"
                      value={researchLinks.linkedIn}
                      onChange={(e) => handleResearchLinksChange('linkedIn', e.target.value)}
                      className="bg-input-background"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalWebsite">Personal Website URL</Label>
                    <Input
                      id="personalWebsite"
                      type="url"
                      value={researchLinks.personalWebsite}
                      onChange={(e) => handleResearchLinksChange('personalWebsite', e.target.value)}
                      className="bg-input-background"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                {/* Password Change */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your account password for security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                        className="bg-input-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                        className="bg-input-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                        className="bg-input-background"
                      />
                    </div>
                    
                    <Button 
                      onClick={handlePasswordChange}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Change Password
                    </Button>
                  </CardContent>
                </Card>

                {/* Email Notifications */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Email Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive general email notifications
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Research Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about research opportunities
                        </p>
                      </div>
                      <Switch
                        checked={notifications.researchUpdates}
                        onCheckedChange={(checked) => handleNotificationChange('researchUpdates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Important system notifications
                        </p>
                      </div>
                      <Switch
                        checked={notifications.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange('systemAlerts', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Department News</Label>
                        <p className="text-sm text-muted-foreground">
                          Updates from your department
                        </p>
                      </div>
                      <Switch
                        checked={notifications.departmentNews}
                        onCheckedChange={(checked) => handleNotificationChange('departmentNews', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy Settings */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control who can see your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={privacySetting}
                      onValueChange={(value: PrivacySetting) => {
                        setPrivacySetting(value);
                        setHasChanges(true);
                      }}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="flex-1">
                          <div>
                            <div className="font-medium">Public</div>
                            <div className="text-sm text-muted-foreground">
                              Anyone can view your profile
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="university" id="university" />
                        <Label htmlFor="university" className="flex-1">
                          <div>
                            <div className="font-medium">University-only</div>
                            <div className="text-sm text-muted-foreground">
                              Only university members can view your profile
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private" className="flex-1">
                          <div>
                            <div className="font-medium">Private</div>
                            <div className="text-sm text-muted-foreground">
                              Only you can view your profile
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="px-6 bg-primary hover:bg-primary/90"
                >
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}