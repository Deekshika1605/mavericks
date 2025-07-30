import React, { useState } from 'react';
import InputField from './InputField'; // Assuming you've created a separate InputField.js

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

export default SignupPersonalInfo;