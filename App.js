import React, { useState, useEffect } from 'react';
// Utility function for input fields with Tailwind styling
const InputField = ({ label, type, placeholder, value, onChange, error, forgotLink, id }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            {forgotLink && (
                <a href="#" className="text-orange-500 text-sm hover:underline">
                    Forgot?
                </a>
            )}
        </div>
        <input
            type={type}
            id={id}
            className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-rounded'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
);

// Login Component
const Login = ({ onNavigateToSignup, onLoginSuccess }) => {
    const [accountType, setAccountType] = useState('student'); // Default to student as per image, but user can select admin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        // Load saved credentials from local storage
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email address is invalid.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = () => {
        if (!validateForm()) {
            return;
        }

        // --- SIMULATED LOGIN LOGIC (USING LOCAL STORAGE) ---
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userFound = registeredUsers.find(
            user => user.email === email && user.password === password
        );

        if (userFound) {
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }
            // Pass the full user object to onLoginSuccess to get fullName
            onLoginSuccess(userFound, accountType);
        } else {
            setLoginError("Invalid email or password. Please sign up if you don't have an account.");
        }
        // --- END SIMULATED LOGIN LOGIC ---
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">Choose Account Type</h2>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                        accountType === 'admin' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100 border-2 border-transparent'
                    }`}
                    onClick={() => setAccountType('admin')}
                >
                    <svg className="w-12 h-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span className="mt-2 text-gray-800 font-semibold">Admin</span>
                </button>
                <button
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                        accountType === 'student' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-gray-100 border-2 border-transparent'
                    }`}
                    onClick={() => setAccountType('student')}
                >
                    <svg className="w-12 h-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l11 6 11-6-11-6zm0 11.47L3.73 9 12 4.53 20.27 9 12 14.47zM12 16.53L3.73 11 12 6.53 20.27 11 12 16.53z"/>
                    </svg>
                    <span className="mt-2 text-gray-800 font-semibold">Student</span>
                </button>
            </div>

            <p className="text-gray-600 text-center mb-6">
                Hello {accountType}! Please fill out the form below to get started
            </p>

            <InputField
                id="email-login"
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />
            <InputField
                id="password-login"
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                forgotLink
            />

            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember Me
                </label>
            </div>

            {loginError && <p className="text-red-500 text-center text-sm mb-4">{loginError}</p>}

            <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                onClick={handleLogin}
            >
                Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
                No account?{' '}
                <button onClick={onNavigateToSignup} className="text-orange-500 hover:underline focus:outline-none">
                    Signup
                </button>
            </p>
        </div>
    );
};

// Signup Component - Personal Info Step
const SignupPersonalInfo = ({ onNext, onBackToLogin }) => {
    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateForm = () => {
        let isValid = true;
        setFullNameError('');
        setMobileNumberError('');
        setEmailError('');

        if (!fullName.trim()) {
            setFullNameError('Full name is required.');
            isValid = false;
        }

        if (!mobileNumber) {
            setMobileNumberError('Mobile number is required.');
            isValid = false;
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            setMobileNumberError('Mobile number must be 10 digits.');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email address is invalid.');
            isValid = false;
        }

        return isValid;
    };

    const handleContinue = () => {
        if (validateForm()) {
            onNext({ fullName, mobileNumber, email });
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex mb-6 rounded-xl overflow-hidden shadow-sm">
                <div className="flex-1 bg-orange-500 text-white p-3 text-center font-semibold rounded-l-xl">
                    <span className="mr-2">💡</span>Personal Info
                </div>
                <div className="flex-1 bg-gray-100 text-gray-600 p-3 text-center font-semibold rounded-r-xl">
                    <span className="mr-2">⭐</span>Security
                </div>
            </div>

            <InputField
                id="full-name"
                label="Your Name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={fullNameError}
            />
            <InputField
                id="mobile-number"
                label="Mobile Number"
                type="tel"
                placeholder="Your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                error={mobileNumberError}
            />
            <InputField
                id="email-signup"
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />

            <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 mt-4"
                onClick={handleContinue}
            >
                Continue to Security Setup
            </button>
            <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{' '}
                <button onClick={onBackToLogin} className="text-orange-500 hover:underline focus:outline-none">
                    Login
                </button>
            </p>
        </div>
    );
};

// Signup Component - Security Step
const SignupSecurity = ({ onBack, onCompleteRegistration, personalInfo }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [termsError, setTermsError] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const validateForm = () => {
        let isValid = true;
        setPasswordError('');
        setConfirmPasswordError('');
        setTermsError('');
        setRegistrationError('');

        // Password validation: at least 8 characters, one uppercase, one lowercase, one number, one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password is required.');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        }

        if (!agreeTerms) {
            setTermsError('You must agree to the terms and privacy policy.');
            isValid = false;
        }

        return isValid;
    };

    const handleCompleteRegistration = () => {
        if (!validateForm()) {
            return;
        }

        // --- SIMULATED REGISTRATION LOGIC (STORING IN LOCAL STORAGE) ---
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const newUser = {
            email: personalInfo.email,
            password: password, // In a real app, never store plain passwords! Hash them.
            fullName: personalInfo.fullName,
            mobileNumber: personalInfo.mobileNumber,
        };

        // Check if user already exists (simple email check)
        if (registeredUsers.some(user => user.email === newUser.email)) {
            setRegistrationError('User with this email already exists.');
            return;
        }

        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        console.log("Simulated registration successful. User stored in local storage:", newUser);
        // Using alert for simulation, replace with custom UI in production
        // alert("Registration Successful! You can now log in.");
        onCompleteRegistration(newUser); // Pass the full newUser object
        // --- END SIMULATED REGISTRATION LOGIC ---
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex mb-6 rounded-xl overflow-hidden shadow-sm">
                <div className="flex-1 bg-gray-100 text-gray-600 p-3 text-center font-semibold rounded-l-xl">
                    <span className="mr-2">💡</span>Personal Info
                </div>
                <div className="flex-1 bg-orange-500 text-white p-3 text-center font-semibold rounded-r-xl">
                    <span className="mr-2">⭐</span>Security
                </div>
            </div>

            <InputField
                id="create-password"
                label="Create Password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
            />
            <InputField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
            />

            <div className="mb-6 flex items-start">
                <input
                    type="checkbox"
                    id="agreeTerms"
                    className="mr-2 mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    I have read and agree to Byte Craft's{' '}
                    <a href="#" className="text-orange-500 hover:underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-orange-500 hover:underline">
                        Privacy Policy
                    </a>
                </label>
            </div>
            {termsError && <p className="text-red-500 text-xs italic mt-1 mb-4">{termsError}</p>}
            {registrationError && <p className="text-red-500 text-center text-sm mb-4">{registrationError}</p>}


            <div className="flex justify-between gap-4 mt-6">
                <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                    onClick={onBack}
                >
                    Back
                </button>
                <button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                    onClick={handleCompleteRegistration}
                >
                    Complete Registration
                </button>
            </div>
        </div>
    );
};

// Learning Dashboard Component (New)
const LearningDashboard = ({ user, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
            {/* Top Navigation Bar */}
            <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Learning Dashboard</h1>
                <div className="relative">
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {/* Replaced img with SVG icon */}
                        <svg className="w-10 h-10 text-gray-600 rounded-full border-2 border-orange-400 p-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                        </svg>
                        <span className="hidden sm:inline text-gray-800 font-medium">{user.fullName || 'User'}</span>
                        <svg className="w-4 h-4 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                            <div className="px-4 py-2 text-sm text-gray-700">
                                <p className="font-semibold">{user.fullName || 'User'}</p>
                                <p className="text-gray-500">{user.email || 'email@example.com'}</p>
                            </div>
                            <hr className="my-1" />
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Your Profile
                            </a>
                            <button
                                onClick={onLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Learning Journey</h2>
                    <p className="text-gray-600 mb-6">Continue your progress across different learning paths</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Course Card 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Foundation Course</h3>
                            <p className="text-gray-600 text-sm mb-4">Master the fundamentals with comprehensive learning modules</p>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>65% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                <span>13/20 Lessons</span>
                                <span>4 weeks</span>
                            </div>
                            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                Continue
                            </button>
                        </div>

                        {/* Course Card 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Domain Specific Course</h3>
                            <p className="text-gray-600 text-sm mb-4">Advanced concepts tailored to your field of expertise</p>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>40% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                <span>6/15 Lessons</span>
                                <span>6 weeks</span>
                            </div>
                            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                Continue
                            </button>
                        </div>

                        {/* Course Card 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Quiz</h3>
                            <p className="text-gray-600 text-sm mb-4">Test your knowledge with daily challenges and assessments</p>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>85% Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                <span>17/20 Lessons</span>
                                <span>Ongoing</span>
                            </div>
                            <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                Continue
                            </button>
                        </div>
                    </div>
                </section>

                {/* Recent Activity Section */}
                <section className="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {/* Activity Item 1 */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-800">Completed: JavaScript Fundamentals</p>
                                <p className="text-sm text-gray-600">Foundation Course</p>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        {/* Activity Item 2 */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-800">Quiz Score: 8/10</p>
                                <p className="text-sm text-gray-600">Daily Quiz</p>
                            </div>
                            <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                        {/* Activity Item 3 */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-800">Started: Advanced React Patterns</p>
                                <p className="text-sm text-gray-600">Domain Specific Course</p>
                            </div>
                            <span className="text-sm text-gray-500">3 days ago</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};


// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup-personal', 'signup-security', 'dashboard', 'learning-dashboard'
    const [personalInfo, setPersonalInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useState(null); // Stores { email, fullName, ... }
    const [accountType, setAccountType] = useState('');

    const handleLoginSuccess = (user, type) => {
        setLoggedInUser(user);
        setAccountType(type);
        // Redirect based on account type
        if (type === 'student') {
            setCurrentPage('learning-dashboard');
        } else {
            setCurrentPage('dashboard'); // Generic dashboard for admin, or another specific page
        }
    };

    const handleRegistrationComplete = (user) => {
        setLoggedInUser(user);
        setAccountType('student'); // Default to student after signup
        setCurrentPage('learning-dashboard'); // Redirect new users (students) to their dashboard
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setAccountType('');
        setCurrentPage('login');
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <Login onNavigateToSignup={() => setCurrentPage('signup-personal')} onLoginSuccess={handleLoginSuccess} />;
            case 'signup-personal':
                return <SignupPersonalInfo onNext={(info) => { setPersonalInfo(info); setCurrentPage('signup-security'); }} onBackToLogin={() => setCurrentPage('login')} />;
            case 'signup-security':
                return <SignupSecurity onBack={() => setCurrentPage('signup-personal')} onCompleteRegistration={handleRegistrationComplete} personalInfo={personalInfo} />;
            case 'learning-dashboard':
                // Pass the loggedInUser object to the LearningDashboard
                return <LearningDashboard user={loggedInUser} onLogout={handleLogout} />;
            case 'dashboard':
                // This is a generic dashboard, you might want to create a specific one for admins
                return (
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
                        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                            <h2 className="text-3xl font-bold text-blue-600 mb-4">Admin Dashboard</h2>
                            <p className="text-lg text-gray-700 mb-2">Welcome, Admin!</p>
                            <p className="text-xl font-semibold text-gray-900 mb-4">{loggedInUser?.email || 'admin@example.com'}</p>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                );
            default:
                return <Login onNavigateToSignup={() => setCurrentPage('signup-personal')} onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
            {renderPage()}
        </div>
    );
}

export default App;
