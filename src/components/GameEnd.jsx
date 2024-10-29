// components/GameEnd.js
import React from 'react';
import Button from './Button';
import Card from './Card';
import CodeBlock from './CodeBlock';
import { Trophy, XCircle } from 'lucide-react';
import ParticleEffect from './ParticleEffect';

const GameEnd = ({ gameState, score, levels, resetGame }) => {
    const isVictory = gameState === 'victory';

    return (
        <Card className={`max-w-2xl mx-auto p-8 ${isVictory ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-gradient-to-br from-red-500 to-gray-800 text-white'}`}>
            <div className="text-center space-y-6">
                {isVictory ? (
                    <>
                        <Trophy className="w-20 h-20 mx-auto text-yellow-300 animate-bounce" />
                        <h1 className="text-3xl font-bold">Victory!</h1>
                        <p className="text-xl">
                            Congratulations, brave Code Knight! You have restored the Lost Code and saved Binarya!
                        </p>
                    </>
                ) : (
                    <>
                        <XCircle className="w-20 h-20 mx-auto text-red-300 animate-pulse" />
                        <h1 className="text-3xl font-bold">Game Over</h1>
                        <p className="text-xl">
                            Your journey ends here, but the Lost Code still awaits a worthy knight...
                        </p>
                    </>
                )}
                <CodeBlock code={isVictory ? "// The Lost Code has been restored!" : "// Error: Knight needs more training\nreturn GAME_OVER;"} />
                <ParticleEffect active={isVictory} />
                <p className="text-lg">Score: {score}/{levels.length}</p>
                <Button onClick={resetGame} className={`bg-white ${isVictory ? 'text-blue-600 hover:bg-blue-100' : 'text-red-600 hover:bg-red-100'}`}>
                    {isVictory ? 'Play Again' : 'Try Again'}
                </Button>
            </div>
        </Card>
    );
};

export default GameEnd;
