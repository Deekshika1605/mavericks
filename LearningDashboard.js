import React, { useState } from 'react';

const LearningDashboard = ({ user, onLogout, onDomainSpecificCourse }) => {
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
                        {/* Course Card 2 (Domain Specific) - Added new onClick handler */}
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
                            <button
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                                onClick={onDomainSpecificCourse} // New handler to navigate to domain selection
                            >
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
                <section className="bg-white p-6 rounded-xl shadow-md mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-800">Completed: JavaScript Fundamentals</p>
                                <p className="text-sm text-gray-600">Foundation Course</p>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-b-0">
                            <div>
                                <p className="font-medium text-gray-800">Quiz Score: 8/10</p>
                                <p className="text-sm text-gray-600">Daily Quiz</p>
                            </div>
                            <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
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

export default LearningDashboard;