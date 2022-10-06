import React from 'react';

interface KeyProps {
    letter: string;
    func?: (() => void) | ((letter: string) => void);
    status?: string | 'unpressed';
}

const Key: React.FC<KeyProps> = ({letter, status, func}) => {
    return (
        <div className={"key " + status} onClick={func ? () => func(letter): () => {}} >
            {letter}
        </div>
    );
}

export default Key;