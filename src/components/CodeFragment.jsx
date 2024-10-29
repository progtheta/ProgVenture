// components/CodeFragment.js
import React from 'react';
import { Code } from 'lucide-react';

const CodeFragment = ({ collected }) => (
    <div className={`
    absolute top-4 right-4 
    w-12 h-12 
    bg-gradient-to-br from-purple-500 to-blue-500 
    rounded-lg shadow-lg 
    flex items-center justify-center
    transform transition-all duration-500
    ${collected ? 'scale-110 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'}
  `}>
        <Code className="w-6 h-6 text-white" />
    </div>
);

export default CodeFragment;
