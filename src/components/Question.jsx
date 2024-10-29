import React from 'react';
import { motion } from 'framer-motion';

function Question({ level, onAnswer }) {
    const { question, options, correctAnswer, outcome, image } = level;

    const handleOptionClick = (index) => {
        const isCorrect = index === correctAnswer;
        onAnswer(isCorrect);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="question"
        >
            <h2>{level.title}</h2>
            {image && <img src={image} alt="Level visual" className="level-image" />}
            <p>{question}</p>
            <div className="options">
                {options.map((option, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
            <p>{outcome}</p>
        </motion.div>
    );
}

export default Question;
