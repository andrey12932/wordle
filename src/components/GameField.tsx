import React, { useEffect, useState } from 'react';
import Word from './Word';
import logic from '../logic/Logic';
import Keyboard from './Keyboard';

const GameField = () => {
    const [guess, setGuess] = useState<string>('');
    const [wordsArr, setWordsArr] = useState<Array<string>>([]);
    const [win, setWin] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<number>(0);

    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler)
    });

    function keyPressHandler(e: KeyboardEvent) {
        if (/Key|Period|Comma|Quote|Semicolon|BracketLeft|BracketRight/.test(e.code) && e.key !== 'Enter' && guess.length < 5) {
            addLetter(engToRu(e.key));
            document.removeEventListener('keydown', keyPressHandler);
        }
        else if (e.key === 'Enter') {
            confirm();
        } else if (/Backspace/.test(e.code) && guess.length > 0) {
            removeLetter();
            document.removeEventListener('keydown', keyPressHandler)
        }
    }

    function addLetter(letter: string): void {
        setGuess((guess + letter).toLocaleUpperCase());
    }

    function removeLetter(): void {
        let removed = guess.slice(0, guess.length - 1);
        setGuess(removed);
    }

    function confirm() {
        if (logic.isCorrect(guess.toLocaleUpperCase())){
            setWordsArr(wordsArr.concat([guess]));
            setWin(true)
            alert('Win');
        } else if (logic.isExisting(guess.toLocaleLowerCase())) {
            setWordsArr(wordsArr.concat([guess]));
            setGuess('');
        }
    }

    function engToRu(letter: string): string {
        let replace = [
            "й","ц","у","к","е","н","г","ш","щ","з","х","ъ",
            "ф","ы","в","а","п","р","о","л","д","ж","э",
            "я","ч","с","м","и","т","ь","б","ю"
        ];
        let search = [
            "q","w","e","r","t","y","u","i","o","p","[","]",
            "a","s","d","f","g","h","j","k","l",";","'",
            "z","x","c","v","b","n","m",",","."
        ];
        if (search.includes(letter.toLowerCase()))
            return replace[search.indexOf(letter.toLocaleLowerCase())];
        else return letter;
    }

    function handleNewWord() {
        logic.generateWord(difficulty);
        console.log(logic.word)
        setWordsArr([]);
        setGuess('');
    }

    function difficultyChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setDifficulty(parseInt(e.target.value));
        logic.generateWord(parseInt(e.target.value))
        setGuess('');
    }

    return (
        <div className='field'>
            <button className="restart" onClick={handleNewWord}>restart</button>
            <div className="difficulty">
                Сложность:
                <input type="range" name="dif" id="dif" max={4} min={1} value={difficulty} onChange={difficultyChangeHandler} />
            </div>
            <div className='words'>
                {
                    wordsArr.map((el, idx) =>
                        <Word word={el} key={idx} entered />    
                    )
                }
                { win || <Word word={guess} />}
            </div>
            <Keyboard add={addLetter} remove={removeLetter} confirm={confirm} />
        </div>
    );
}

export default GameField;