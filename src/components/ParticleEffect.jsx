// components/ParticleEffect.js
import React from 'react';

const ParticleEffect = ({ active }) => {
    if (!active) return null;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `particle-float-${i} 1s ease-out forwards`
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleEffect;
