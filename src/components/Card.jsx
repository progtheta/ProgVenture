// components/Card.js
import React from 'react';

const Card = ({ children, className }) => (
    <div className={`p-4 rounded-lg shadow-lg bg-white ${className}`}>
        {children}
    </div>
);

export default Card;
