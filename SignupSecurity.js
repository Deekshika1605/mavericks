import React, { useState } from 'react';
import InputField from './InputField'; // Assuming you've created a separate InputField.js

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

export default SignupSecurity;