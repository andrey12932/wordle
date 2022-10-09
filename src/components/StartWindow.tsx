import React, { ReactNode } from 'react';

interface StartWindowProps {
    header: string;
    body?: string;
    comp?: ReactNode;
    hide: (hide: boolean) => void;
}

const StartWindow: React.FC<StartWindowProps> = ({header, body, comp, hide}) => {
    return (
        <div className="modal">
            <h2 className="modal-header">
                {header}
            </h2>
            <div className="modal-body">
                { body && <span>{ header !== "Настройки" && body}</span>}
                {comp}
            </div>
            {header !== "Настройки" || <div className="modal__close" onClick={() => hide(true)}>
                X
            </div>}
        </div>
    );
}

export default StartWindow;