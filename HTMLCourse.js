import React, { useState } from 'react';

const HTMLCourse = ({ onBackToCourse, onChapterComplete }) => {
    const [chapterCompleted, setChapterCompleted] = useState(false);

    const handleCompleteChapter = () => {
        setChapterCompleted(true);
        // This will trigger the parent component to update the progress
        // in a real app, this would update state on the backend
        onChapterComplete(); 
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">HTML Fundamentals</h2>
                <button
                    className="flex items-center text-orange-500 hover:underline"
                    onClick={onBackToCourse}
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Back to Modules
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <p className="text-sm font-medium text-gray-600 mb-2">Chapter 1 of 1</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: chapterCompleted ? '100%' : '17%' }}></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="prose max-w-none text-gray-800">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Introduction to HTML</h3>
                <p>HTML (HyperText Markup Language) is the foundation of all web pages. It provides the structure and meaning to web content through elements and tags.</p>
                
                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Learning Objectives</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>Understand what HTML is and its role in web development.</li>
                    <li>Learn the difference between markup and programming languages.</li>
                    <li>Recognize the structure of HTML elements and tags.</li>
                    <li>Understand the importance of semantic HTML.</li>
                    <li>Read standards to ensure consistency across browsers.</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Detailed Content</h4>
                <p>
                    HTML stands for HyperText Markup Language and serves as the backbone of web development. Created by Tim Berners-Lee in 1991, HTML has evolved significantly over the years. HTML is a markup language, not a programming language. It uses tags to define different parts of content and gives semantic meaning to text, images, and other media. The "&lt;tags&gt;" part refers to keys that connect web pages to one another, either within a single website or between websites. This is what makes the web a "web" of connected documents. HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag (for example, &lt;h1&gt;This is a Heading&lt;/h1&gt;).
                </p>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-4 mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Practice Exercise</h4>
                    <p className="text-gray-700">
                        Create a simple `.html` file with a heading that says "Welcome to HTML" and save it as `index.html`. Open it in a web browser to see your first web page.
                    </p>
                </div>
                
                <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Points</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>HTML stands for HyperText Markup Language.</li>
                        <li>HTML elements are the building blocks of web pages.</li>
                        <li>Tags define how page content should be displayed and what it means.</li>
                        <li>HTML provides semantic meaning to content.</li>
                        <li>Web standards ensure consistency across browsers.</li>
                    </ul>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
                    onClick={onBackToCourse}
                >
                    Previous Chapter
                </button>
                <button
                    className={`bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ${chapterCompleted ? 'hover:bg-orange-600' : 'cursor-not-allowed opacity-50'}`}
                    onClick={handleCompleteChapter}
                    disabled={!chapterCompleted}
                >
                    {chapterCompleted ? 'Chapter Completed' : 'Mark as Complete'}
                </button>
            </div>
            {/* Conditional "Next Chapter" button */}
            {chapterCompleted && (
                 <div className="text-center mt-4">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                        onClick={onBackToCourse} // For this demo, let's just go back to the course list
                    >
                        Next Chapter
                    </button>
                 </div>
            )}
        </div>
    );
};

export default HTMLCourse;