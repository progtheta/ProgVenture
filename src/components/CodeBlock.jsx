// components/CodeBlock.js
import React from 'react';
import { Sparkles } from 'lucide-react';

const CodeBlock = ({ code, language = 'c' }) => (
    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto relative group">
        <div className="absolute top-2 right-2 text-gray-500 text-xs">{language}</div>
        <pre className="whitespace-pre-wrap">{code}</pre>
        <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
);

export default CodeBlock;
