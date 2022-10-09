import React, { useEffect, useState } from 'react';
import Word from './Word';
import logic from '../logic/Logic';
import Keyboard from './Keyboard';
import StartWindow from './StartWindow';

const GameField = () => {
    const [guess, setGuess] = useState<string>('');
    const [wordsArr, setWordsArr] = useState<Array<string>>([]);
    const [win, setWin] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [trynum, setTrynum] = useState<number>(0);
    const [modalText, setModalText] = useState<string>('Новая игра');
    const [hasListener, setHasListener] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!showModal && !hasListener) 
            setEventHandler(true);
        let arr = wordsArr
        setWin(false);
        if (arr.length === 6) 
            losing();
    });

    function keyPressHandler(e: KeyboardEvent) {
        if (/Key|Period|Comma|Quote|Semicolon|BracketLeft|BracketRight/.test(e.code) && e.key !== 'Enter' && guess.length < 5) {
            addLetter(engToRu(e.key));
            setEventHandler(false);
        }
        else if (e.key === 'Enter') {
            confirm();
            if (logic.isExisting(guess.toLocaleLowerCase()))
                setEventHandler(false);
        } else if (/Backspace/.test(e.code) && guess.length > 0) {
            removeLetter();
            //newkey(e.key)
            setEventHandler(false)
        }
    }

    function setEventHandler(set: boolean) {
        if (set && !hasListener) {
            document.addEventListener('keydown', keyPressHandler);
            setHasListener(true);
        }
        else {
            document.removeEventListener('keydown', keyPressHandler);
            setHasListener(false);
        }
    }

    function losing() {
        setModalText('Упс! Вы проиграли');
        setGuess('');
        setWordsArr([]);
        /*logic.generateWord(difficulty);*/
        hideModal(false);
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
            hideModal(false);
            setWin(true)
            setModalText('Победа!');
            setTrynum(0)
        } else if (logic.isExisting(guess.toLocaleLowerCase())) {
            setWordsArr(wordsArr.concat([guess]));
            setGuess('');
            setTrynum(1+trynum);
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
        hideModal(true);
    }

    function difficultyChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setDifficulty(parseInt(e.target.value));
        logic.generateWord(parseInt(e.target.value))
        setGuess('');
    }

    function hideModal(hide: boolean) {
        if (hide)
            setModalText('Новая игра');
        setShowModal(!hide);
    }

    function showSettings() {
        hideModal(false);
        setModalText('Настройки');
    }

    const diffComp = <>
        <div className="difficulty">
            Сложность: {difficulty} <br />
            <input type="range" name="dif" id="dif" max={4} min={1} value={difficulty} onChange={difficultyChangeHandler} />
        </div>
        <button className="restart" onClick={handleNewWord}>Новая игра</button>
    </>

    return (
        <>
            <header className='header'>
                <div className="header-content">
                    <h1 className='header-title'>FiveLetters</h1>
                    <div className="header-buttons">
                        <div className="header-buttons__restart" onClick={handleNewWord}>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="35px" height="35px"><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"/></svg>
                        </div>
                        <div className="header-buttons__settings" onClick={showSettings}>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="40px" height="40px"><path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"/></svg>
                        </div>
                    </div>
                </div>
            </header>
            <div className='field'>
                {showModal && <StartWindow 
                    header={modalText} 
                    comp={diffComp}
                    hide={hideModal}
                    body={'Загаданое слово: ' + logic.word}
                />}
                
                <div className='words'>
                    {
                        wordsArr.map((el, idx) =>
                            <Word word={el} key={idx} entered />    
                        )
                    }
                    { win || <Word word={guess} />}
                </div>
                <Keyboard 
                    add={addLetter} 
                    remove={removeLetter} 
                    confirm={confirm}
                />
            </div>
        </>
    );
}

export default GameField;