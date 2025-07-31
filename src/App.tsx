import React, { useState } from 'react';
import { Shield, Search, Users, Star, Clock, MapPin, Filter, User, Menu, X, CheckCircle, AlertTriangle, Mail, Lock, Phone, GraduationCap, Home } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  ethicsScore: number;
  flexScore: number;
  hourlyRate: string;
  tags: string[];
  isVerified: boolean;
  postedTime: string;
  description: string;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Content Writer (Part-time)",
    company: "EduTech Solutions",
    location: "Remote",
    type: "Part-time",
    ethicsScore: 4.8,
    flexScore: 95,
    hourlyRate: "₹300-500",
    tags: ["Student-friendly", "Flexible hours", "Writing"],
    isVerified: true,
    postedTime: "2 hours ago",
    description: "Create engaging educational content for online courses. Perfect for students with flexible scheduling."
  },
  {
    id: 2,
    title: "Virtual Assistant",
    company: "StartupHub",
    location: "Remote",
    type: "Contract",
    ethicsScore: 4.6,
    flexScore: 88,
    hourlyRate: "₹250-400",
    tags: ["Homemaker-friendly", "Data entry", "Communication"],
    isVerified: true,
    postedTime: "5 hours ago",
    description: "Support growing startups with administrative tasks. Work from home with flexible hours."
  },
  {
    id: 3,
    title: "Online Tutor - Mathematics",
    company: "LearnPoint",
    location: "Remote",
    type: "Part-time",
    ethicsScore: 4.9,
    flexScore: 92,
    hourlyRate: "₹400-600",
    tags: ["Student-friendly", "Teaching", "Evenings"],
    isVerified: true,
    postedTime: "1 day ago",
    description: "Teach high school mathematics online. Choose your own schedule and student preferences."
  }
];

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    userType: 'student' 
  });
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    whyInterested: '',
    availability: ''
  });

  const filterOptions = ["Remote", "Part-time", "Student-friendly", "Homemaker-friendly", "Verified"];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.every(filter => 
                            job.tags.includes(filter) || 
                            job.location === filter || 
                            job.type === filter ||
                            (filter === "Verified" && job.isVerified)
                          );
    return matchesSearch && matchesFilters;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, this would be an API call
    if (loginForm.email && loginForm.password) {
      setIsAuthenticated(true);
      setCurrentUser({ email: loginForm.email, name: loginForm.email.split('@')[0] });
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup - in real app, this would be an API call
    if (signupForm.fullName && signupForm.email && signupForm.password) {
      setIsAuthenticated(true);
      setCurrentUser({ 
        email: signupForm.email, 
        name: signupForm.fullName,
        userType: signupForm.userType 
      });
      setIsSignupOpen(false);
      setSignupForm({ fullName: '', email: '', password: '', userType: 'student' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setIsApplyFormOpen(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate application submission - in real app, this would be an API call
    alert(`Application submitted successfully for ${selectedJob?.title} at ${selectedJob?.company}!`);
    setIsApplyFormOpen(false);
    setSelectedJob(null);
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      experience: '',
      whyInterested: '',
      availability: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-teal-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SafeHire</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Apne liye kamao, bina kisi ke jugaad</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#jobs" className="text-gray-700 hover:text-teal-600 transition-colors">Jobs</a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">About</a>
              <a href="#employers" className="text-gray-700 hover:text-teal-600 transition-colors">For Employers</a>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsSignupOpen(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <a href="#jobs" className="block text-gray-700">Jobs</a>
              <a href="#about" className="block text-gray-700">About</a>
              <a href="#employers" className="block text-gray-700">For Employers</a>
              {!isAuthenticated ? (
                <div className="flex space-x-3 pt-3">
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg text-center"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setIsSignupOpen(true)}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg text-center"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="pt-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work You Can Trust.<br />
            <span className="text-teal-200">Flexibility You Deserve.</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-teal-100">
            Join 50,000+ students and homemakers building safe, flexible careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsSignupOpen(true)}
              className="px-8 py-3 bg-white text-teal-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start for Free
            </button>
            <p className="text-teal-100">No scams. No surprises. Just safe work.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Why SafeHire?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Verified Jobs Only</h4>
              <p className="text-gray-600">Every job is manually reviewed. No scams, no fake listings, just legitimate opportunities.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Ethical Score System</h4>
              <p className="text-gray-600">Community-rated employers with transparency first. See ethics scores before you apply.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">FlexiFit Matching</h4>
              <p className="text-gray-600">AI-powered matching based on your schedule, skills, and lifestyle needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section id="jobs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">Find Your Perfect Job</h3>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map(filter => (
                    <button
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedFilters.includes(filter)
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h4>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <span className="font-medium">{job.company}</span>
                          {job.isVerified && (
                            <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-xs text-green-700 font-medium">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <span>•</span>
                          <span>{job.type}</span>
                          <span>•</span>
                          <span>{job.postedTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-teal-600 mb-1">{job.hourlyRate}/hr</div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 text-orange-500" />
                          <span className="text-sm font-medium">Ethics: {job.ethicsScore}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">FlexiFit: {job.flexScore}%</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                          Save
                        </button>
                        <button 
                          onClick={() => handleApplyNow(job)}
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h4>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-bold">SafeHire</span>
              </div>
              <p className="text-gray-400">Empowering students and homemakers with safe, flexible work opportunities.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Job Seekers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Career Resources</a></li>
                <li><a href="#" className="hover:text-white">Skill Assessment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Employers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Post a Job</a></li>
                <li><a href="#" className="hover:text-white">Ethics Badge</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Report Issue</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SafeHire. All rights reserved. Made with ❤️ for students and homemakers.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Welcome Back</h3>
              <button onClick={() => setIsLoginOpen(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <button 
                onClick={() => {setIsLoginOpen(false); setIsSignupOpen(true);}}
                className="text-teal-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Join SafeHire</h3>
              <button onClick={() => setIsSignupOpen(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => setSignupForm({...signupForm, userType: 'student'})}
                  className={`p-3 border rounded-lg transition-colors text-center ${
                    signupForm.userType === 'student' 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
                  }`}
                >
                  <GraduationCap className="h-6 w-6 mx-auto mb-1 text-teal-600" />
                  <span className="text-sm font-medium">Student</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setSignupForm({...signupForm, userType: 'homemaker'})}
                  className={`p-3 border rounded-lg transition-colors text-center ${
                    signupForm.userType === 'homemaker' 
                      ? 'border-teal-500 bg-teal-50' 
                      : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'
                  }`}
                >
                  <Home className="h-6 w-6 mx-auto mb-1 text-teal-600" />
                  <span className="text-sm font-medium">Homemaker</span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Account
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <button 
                onClick={() => {setIsSignupOpen(false); setIsLoginOpen(true);}}
                className="text-teal-600 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Apply Now Modal */}
      {isApplyFormOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">Apply for {selectedJob.title}</h3>
                <p className="text-gray-600">{selectedJob.company}</p>
              </div>
              <button onClick={() => setIsApplyFormOpen(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={applyForm.phone}
                    onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <select
                    value={applyForm.experience}
                    onChange={(e) => setApplyForm({...applyForm, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why are you interested in this position? *</label>
                <textarea
                  value={applyForm.whyInterested}
                  onChange={(e) => setApplyForm({...applyForm, whyInterested: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={3}
                  placeholder="Tell us why you're interested in this role..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
                <textarea
                  value={applyForm.availability}
                  onChange={(e) => setApplyForm({...applyForm, availability: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  rows={2}
                  placeholder="When are you available to work? (e.g., Weekdays 6-10 PM, Weekends all day)"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsApplyFormOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;