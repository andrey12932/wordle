import React from 'react';
import logic from '../logic/Logic';
import Key from './Key';

interface KeyboardProps {
    add: (letter: string) => void;
    remove: () => void;
    confirm: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({add, remove, confirm}) => {

    function color(letter: string) {
        if (logic.getBlack().has(letter)) {
            return 'black'
        } else if (logic.getYellow().has(letter)) {
            return 'yellow'
        } else if (logic.getGreen().has(letter)) {
            return 'green'
        }
        return 'unpressed';
    }

    return (
        <div className="keyboard">
            <div className="keyboard-line">
                <Key letter='Й' status={color('Й')} func={add}/>
                <Key letter='Ц' status={color('Ц')} func={add}/>
                <Key letter='У' status={color('У')} func={add}/>
                <Key letter='К' status={color('К')} func={add}/>
                <Key letter='Е' status={color('Е')} func={add}/>
                <Key letter='Н' status={color('Н')} func={add}/>
                <Key letter='Г' status={color('Г')} func={add}/>
                <Key letter='Ш' status={color('Ш')} func={add}/>
                <Key letter='Щ' status={color('Щ')} func={add}/>
                <Key letter='З' status={color('З')} func={add}/>
                <Key letter='Х' status={color('Х')} func={add}/>
                <Key letter='Ъ' status={color('Ъ')} func={add}/>
            </div>
            <div className="keyboard-line">
                <Key letter='Ф' status={color('Ф')} func={add}/>
                <Key letter='Ы' status={color('Ы')} func={add}/>
                <Key letter='В' status={color('В')} func={add}/>
                <Key letter='А' status={color('А')} func={add}/>
                <Key letter='П' status={color('П')} func={add}/>
                <Key letter='Р' status={color('Р')} func={add}/>
                <Key letter='О' status={color('О')} func={add}/>
                <Key letter='Л' status={color('Л')} func={add}/>
                <Key letter='Д' status={color('Д')} func={add}/>
                <Key letter='Ж' status={color('Ж')} func={add}/>
                <Key letter='Э' status={color('Э')} func={add}/>
                <Key letter={'\u2190'} func={remove}/>
            </div>
            <div className="keyboard-line">
                <Key letter='Я' status={color('Я')} func={add}/>
                <Key letter='Ч' status={color('Ч')} func={add}/>
                <Key letter='С' status={color('С')} func={add}/>
                <Key letter='М' status={color('М')} func={add}/>
                <Key letter='И' status={color('И')} func={add}/>
                <Key letter='Т' status={color('Т')} func={add}/>
                <Key letter='Ь' status={color('Ь')} func={add}/>
                <Key letter='Б' status={color('Б')} func={add}/>
                <Key letter='Ю' status={color('Ю')} func={add}/>
                <Key letter={'\u2714'} status={'green'} func={confirm}/>
            </div>
        </div>
    );
}

export default Keyboard;