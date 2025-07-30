import React from 'react';

const DomainSelection = ({ onSelectDomain, onBackToDashboard }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Choose Your Domain Specific Course</h2>
            <div className="flex justify-center gap-6 mb-8">
                {/* Full Stack Development Card */}
                <div 
                    className="flex-1 bg-gray-100 rounded-xl p-6 text-center cursor-pointer transition duration-300 hover:shadow-lg hover:bg-orange-100 border-2 border-transparent hover:border-orange-500"
                    onClick={() => onSelectDomain('fullstack')}
                >
                    <svg className="w-16 h-16 mx-auto mb-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L1 21h22L12 2zm0 13l-4-4h8l-4 4z"/>
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Full Stack Development</h3>
                    <p className="text-gray-600 text-sm mb-4">Master complete web development with both front-end and back-end technologies.</p>
                    <ul className="text-left text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>HTML, CSS, JavaScript</li>
                        <li>React, Node.js, Databases</li>
                        <li>Building APIs and servers</li>
                    </ul>
                </div>
                {/* Java Development Card */}
                <div 
                    className="flex-1 bg-gray-100 rounded-xl p-6 text-center cursor-pointer transition duration-300 hover:shadow-lg hover:bg-orange-100 border-2 border-transparent hover:border-orange-500"
                    onClick={() => onSelectDomain('java')}
                >
                    <svg className="w-16 h-16 mx-auto mb-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8v-2l-4-4-4 4v2h8zM16 10H8v4h8v-4zM8 16v2l4 4 4-4v-2H8z"/>
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Java Development</h3>
                    <p className="text-gray-600 text-sm mb-4">Build powerful and scalable applications using the Java programming language.</p>
                    <ul className="text-left text-sm text-gray-700 list-disc list-inside space-y-1">
                        <li>Core Java concepts</li>
                        <li>Object-Oriented Programming</li>
                        <li>Spring Framework, databases</li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
                    onClick={onBackToDashboard}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default DomainSelection;