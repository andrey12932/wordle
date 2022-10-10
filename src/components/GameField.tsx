import React, { useEffect, useState } from 'react';
import Word from './Word';
import logic from '../logic/Logic';
import Keyboard from './Keyboard';
import StartWindow from './StartWindow';

const GameField = () => {
    const [button, setButton] = useState<string>('НАЧАТЬ');
    const [difficulty, setDifficulty] = useState<number>(1);

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
            <input type="range" name="dif" id="dif" max={4} min={1} value={difficulty} onChange={difficultyChangeHandler} />
        </div>
        <button className="restart" onClick={handleNewWord}>{button}</button>
    </>


    const [guess, setGuess] = useState<string>('');
    const [wordsArr, setWordsArr] = useState<Array<string>>([]);
    const [win, setWin] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [trynum, setTrynum] = useState<number>(0);
    const [modalText, setModalText] = useState<string>('Новая игра');
    const [hasListener, setHasListener] = useState<boolean>(false);
    const [modalComp, setModalComp] = useState(diffComp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!showModal && !hasListener) 
            setEventHandler(true);
        let arr = wordsArr
        setWin(false);
        if (arr.length === 6) 
            losing();
    });

    useEffect(() => {
        info();
    }, []);

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
        setModalComp(diffComp);
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
            setModalComp(diffComp);
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
        setButton('НОВАЯ ИГРА');
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
        setModalComp(diffComp);
        hideModal(false);
        setModalText('Еще раз');
    }

    function info() {
        setModalComp(inform);
        hideModal(false);
        setModalText('Как играть');
    }

    return (
        <>
            <header className='header'>
                <div className="header-content">
                    <h1 className='header-title' onClick={handleNewWord}>FiveLetters</h1>
                    <div className="header-buttons">
                        <div className="header-buttons__restart" onClick={showSettings}>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="40px" height="40px"><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"/></svg>
                        </div>
                        <div className="header-buttons__info" onClick={info}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 512 512"><path className="cls-1" d="M448,76.56A38.44,38.44,0,0,1,486.4,115v230.4a38.44,38.44,0,0,1-38.4,38.4H66.2l-7.5,7.5-33.1,33.1V115A38.44,38.44,0,0,1,64,76.56H448M448,51H64A64,64,0,0,0,0,115V443.21A17.78,17.78,0,0,0,17.92,461a17.42,17.42,0,0,0,12.45-5.25L76.8,409.36H448a64,64,0,0,0,64-64V115a64,64,0,0,0-64-64Z"/><path className="cls-1" d="M332.8,191.76H179.2a12.8,12.8,0,0,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"/><path className="cls-1" d="M332.8,243H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"/><path className="cls-1" d="M332.8,294.16H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,0,1,0,25.6Z"/></svg>
                        </div>
                    </div>
                </div>
            </header>
            <div className='field'>
                {showModal && <StartWindow 
                    header={modalText} 
                    comp={modalComp}
                    hide={hideModal}
                    body={ trynum !== 0 ? 'Загаданое слово: ' + logic.word : undefined}
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