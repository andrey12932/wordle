import React, { ReactNode } from 'react';

interface StartWindowProps {
    header: string;
    body?: string;
    hide: (hide: boolean) => void;
    isInfo: boolean;
    diffChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    difficulty: number;
    button: string;
    handleNewWord: () => void;
}

const StartWindow: React.FC<StartWindowProps> = ({header, body, hide, isInfo, diffChange, difficulty, button, handleNewWord}) => {
    const inform = <>
        <div className="boxes">
            <div className="square green"></div><span className="square__text">  - буква на верном месте</span>
            <div className="square yellow"></div><span className="square__text">  - буква есть в слове</span>
            <div className="square black"></div><span className="square__text">  - буквы нет в слове</span>
        </div>
        <button className="restart" onClick={handleNewWord}>{button}</button>
    </>

    const diffComp = <>
        <div className="difficulty">
            Сложность: {difficulty} <br />
            <input type="range" name="dif" id="dif" max={4} min={1} value={difficulty} onChange={diffChange} />
        </div>
        <button className="restart" onClick={handleNewWord}>{button}</button>
    </>

    return (
        <div className="modal">
            <h2 className="modal-header">
                {header}
            </h2>
            <div className="modal-body">
                { (header !== "Еще раз" && header !== "Как играть") && body && <span>{body}</span>}
                {isInfo ? inform : diffComp}
            </div>
            {header === "Еще раз" && <div className="modal__close" onClick={() => hide(true)}>
                X
            </div>}
        </div>
    );
}

export default StartWindow;