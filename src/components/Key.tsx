import React, { useState } from 'react';

interface KeyProps {
    letter: string;
    func?: (() => void) | ((letter: string) => void);
    status?: string | 'unpressed';
}

const Key: React.FC<KeyProps> = ({letter, status, func}) => {

    const [isPressed, setIsPressed] = useState<boolean>(false);

    return (
        <div
            className={"key " + status + ((isPressed) ? ' pressed': '')} 
            id={letter === '\u2714'? 'enter': ''} 
            onClick={func ? () => func(letter): () => {}}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
        >
            {letter}
        </div>
    );
}

export default Key;