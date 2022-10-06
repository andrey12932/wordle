import React from 'react';

interface LetterProps {
    letter: string;
    color: string;
}

const Letter: React.FC<LetterProps> = ({letter, color}) => {
    return (
        <div className={`letter ${color}`}>
            {letter}
        </div>
    );
}

export default Letter;