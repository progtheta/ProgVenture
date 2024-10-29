// components/Button.js
import React from 'react';

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md focus:outline-none focus:ring transition ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;
