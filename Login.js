import React, { useState, useEffect } from 'react';
import InputField from './InputField'; // Assuming you've created a separate InputField.js

const Login = ({ onNavigateToSignup, onLoginSuccess }) => {
    const [accountType, setAccountType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
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

export default Login;