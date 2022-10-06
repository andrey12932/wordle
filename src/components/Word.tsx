import React from 'react';
import Letter from './Letter';
import logic from '../logic/Logic';

interface WordProps {
    word: string;
    entered?: boolean;
}

const Word: React.FC<WordProps> = ({word, entered}) => {
    return (
        <div className="word">
            <Letter letter={word[0] || ''} color={ entered ? logic.checkLetter(word, 0) : ''} />
            <Letter letter={word[1] || ''} color={ entered ? logic.checkLetter(word, 1) : ''} />
            <Letter letter={word[2] || ''} color={ entered ? logic.checkLetter(word, 2) : ''} />
            <Letter letter={word[3] || ''} color={ entered ? logic.checkLetter(word, 3) : ''} />
            <Letter letter={word[4] || ''} color={ entered ? logic.checkLetter(word, 4) : ''} />
        </div>
    );
}

export default Word;