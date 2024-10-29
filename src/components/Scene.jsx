// components/Scene.js
import React from 'react';

const Scene = ({ imagePath, children }) => (
    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200">
        <img
            src={imagePath || `/api/placeholder/800/400`}
            alt="Scene illustration"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
            {children}
        </div>
    </div>
);

export default Scene;
