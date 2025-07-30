import React from 'react';

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

export default InputField;