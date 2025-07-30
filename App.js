import React, { useState, useEffect } from 'react';
import Login from './Login';
import SignupPersonalInfo from './SignupPersonalInfo';
import SignupSecurity from './SignupSecurity';
import LearningDashboard from './LearningDashboard';
import DomainSelection from './DomainSelection';
import FullStackCourse from './FullStackCourse';
import HTMLCourse from './HTMLCourse';

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

// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState('login'); 
    const [personalInfo, setPersonalInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useState(null); 
    const [accountType, setAccountType] = useState('');
    const [completedCourses, setCompletedCourses] = useState({}); // Stores course completion status
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleLoginSuccess = (user, type) => {
        setLoggedInUser(user);
        setAccountType(type);
        // Redirect based on account type
        if (type === 'student') {
            setCurrentPage('learning-dashboard');
        } else {
            setCurrentPage('dashboard');
        }
    };

    const handleRegistrationComplete = (user) => {
        setLoggedInUser(user);
        setAccountType('student'); 
        setCurrentPage('learning-dashboard');
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        setAccountType('');
        setCurrentPage('login');
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
    };

    const handleDomainSpecificCourse = () => {
        setCurrentPage('domain-selection');
    };

    const handleSelectDomain = (domain) => {
        if (domain === 'fullstack') {
            setCurrentPage('fullstack-course');
        }
        // Add logic for other domains if needed
    };

    const handleStartCourse = (courseId, onChapterCompleteCallback) => {
        setSelectedCourseId(courseId);
        setCurrentPage('html-course'); // For this demo, all courses lead to the HTMLCourse view
    };

    const handleChapterComplete = (courseId) => {
        setCompletedCourses(prev => ({ ...prev, [courseId]: true }));
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
                return <LearningDashboard user={loggedInUser} onLogout={handleLogout} onDomainSpecificCourse={handleDomainSpecificCourse} />;
            case 'domain-selection':
                return <DomainSelection onSelectDomain={handleSelectDomain} onBackToDashboard={() => setCurrentPage('learning-dashboard')} />;
            case 'fullstack-course':
                return <FullStackCourse onBackToDomainSelection={() => setCurrentPage('domain-selection')} onStartCourse={handleStartCourse} />;
            case 'html-course':
                return <HTMLCourse onBackToCourse={() => setCurrentPage('fullstack-course')} onChapterComplete={() => handleChapterComplete(selectedCourseId)} />;
            case 'dashboard':
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
