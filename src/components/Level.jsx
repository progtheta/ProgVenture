// components/Level.js
import React from 'react';
import Button from './Button';
import CodeBlock from './CodeBlock';

const Level = ({
    level,
    handleAnswer,
    isAnimating,
    collectedFragment,
    showParticles,
    feedback
}) => {
    return (
        <div className={`space-y-4 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {/* Level Header */}
            <div className="flex items-center space-x-3">
                {level.icon}
                <h2 className="text-2xl font-bold">{level.title}</h2>
            </div>
            <p className="text-gray-600">{level.description}</p>
            <CodeBlock code={level.code} />

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
                {level.options.map((option, index) => (
                    <Button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full justify-start font-mono ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isAnimating}
                    >
                        {option}
                    </Button>
                ))}
            </div>

            {/* Feedback */}
            {feedback && (
                <div className={`text-center p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default Level;
