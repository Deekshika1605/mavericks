import React, { useState } from 'react';

// Reusable Course Card component
const CourseCard = ({ title, description, progress, totalLessons, duration, locked, onStartLearning, onTakeQuiz, onAssessment }) => (
    <div className={`bg-gray-50 p-6 rounded-xl shadow-sm border ${locked ? 'border-gray-200' : 'border-orange-500'}`}>
        <div className="flex items-center mb-2">
            <h3 className={`text-lg font-semibold ${locked ? 'text-gray-400' : 'text-gray-800'}`}>{title}</h3>
            {locked && <span className="ml-2 text-xs font-medium text-white bg-gray-400 px-2 py-1 rounded-full">Locked</span>}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className={`h-2.5 rounded-full transition-all duration-500 ${
                locked ? 'bg-gray-400' : 'bg-blue-500'
            }`} style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>{totalLessons} Chapters</span>
            <span>{duration}</span>
        </div>
        <div className="flex gap-2">
            <button
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 ${
                    locked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                onClick={onStartLearning}
                disabled={locked}
            >
                Start Learning
            </button>
            <button
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 ${
                    locked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={onTakeQuiz}
                disabled={locked}
            >
                Take Quiz
            </button>
            <button
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition duration-200 ${
                    locked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
                onClick={onAssessment}
                disabled={locked}
            >
                Assessment
            </button>
        </div>
    </div>
);

const FullStackCourse = ({ onBackToDomainSelection, onStartCourse }) => {
    // This is a simple way to manage state for the courses.
    // In a real application, this would come from a backend.
    const [courses, setCourses] = useState([
        { id: 1, title: 'HTML Fundamentals', description: 'Complete a journey through web pages with HTML structure and semantic markups.', totalLessons: '8 Chapters', duration: '2-3 weeks', progress: 0, locked: false },
        { id: 2, title: 'CSS Styling', description: 'Create beautiful and elegant layouts with CSS, including responsive design and modern techniques.', totalLessons: '6 Chapters', duration: '2-3 weeks', progress: 0, locked: true },
        { id: 3, title: 'Javascript Programming', description: 'Dive into programming with Javascript fundamentals, ES6+ and DOM manipulation.', totalLessons: '10 Chapters', duration: '4-5 weeks', progress: 0, locked: true },
        { id: 4, title: 'React Development', description: 'Build dynamic user interfaces with React components, hooks, and state management.', totalLessons: '8 Chapters', duration: '3-4 weeks', progress: 0, locked: true },
    ]);

    // Function to simulate unlocking the next course
    const handleCourseCompletion = (courseId) => {
        setCourses(prevCourses => {
            const nextCourses = prevCourses.map(course => {
                if (course.id === courseId) {
                    return { ...course, progress: 100, locked: false };
                }
                // Unlock the next course
                if (course.id === courseId + 1) {
                    return { ...course, locked: false };
                }
                return course;
            });
            return nextCourses;
        });
    };

    const handleStartCourse = (course) => {
        // Here, we would navigate to the specific course content page
        onStartCourse(course.id, handleCourseCompletion);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Full Stack Development Course</h2>
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">Complete modules sequentially to earn your certificate.</p>
                <button
                    className="flex items-center text-orange-500 hover:underline"
                    onClick={onBackToDomainSelection}
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to Courses
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        progress={course.progress}
                        totalLessons={course.totalLessons}
                        duration={course.duration}
                        locked={course.locked}
                        onStartLearning={() => handleStartCourse(course)}
                        onTakeQuiz={() => console.log('Take Quiz for', course.title)}
                        onAssessment={() => console.log('Assessment for', course.title)}
                    />
                ))}
            </div>

            {/* Final Project Section */}
            <div className="bg-orange-50 p-6 rounded-xl shadow-md mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Final Project</h3>
                <p className="text-gray-600 mb-4">
                    Put everything together and build a complete web application using HTML, CSS, Javascript, and React. This capstone project will showcase all the skills you've learned throughout the course.
                </p>
                <button
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200 cursor-not-allowed opacity-50"
                    disabled
                >
                    Complete All Modules First
                </button>
                <p className="text-sm text-gray-500 mt-2">All 4 modules completed</p>
            </div>
        </div>
    );
};

export default FullStackCourse;