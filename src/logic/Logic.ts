import raw from "raw.macro";

class Logic {
    public word: string = '';
    private freqWordsArr: Array<string> = raw('../dictionaries/freq.txt').split('\n');
    private fullWordsArr: Array<string> = raw('../dictionaries/all.txt').split('\n');
    private wordsOptions: Array<string>;
    private blackSet: Set<string> = new Set();
    private yellowSet: Set<string> = new Set();
    private greenSet: Set<string> = new Set();

    constructor() {
        this.wordsOptions = this.freqWordsArr.slice(0, 200);
        this.generateWord(1);
        console.log(this.word)
    }

    isCorrect(guess: string): boolean {
        return guess === this.word;
    }

    isExisting(guess: string): boolean {
        for (let i = 0; i < this.fullWordsArr.length; i++)
            if (guess === this.fullWordsArr[i])
                return true;
        return false;
    }

    generateWord(difficulty: number): void {
        this.wordsOptions = this.freqWordsArr.slice((difficulty - 1) * 487, 487 * difficulty)
        this.word = this.wordsOptions[Math.random() * this.wordsOptions.length << 0].toUpperCase();
        this.blackSet = new Set();
        this.yellowSet = new Set();
        this.greenSet = new Set();
    }
    
    checkLetter( word: string , index: number): string {
        let res = 'black';
        let letter = word[index];
        if (this.word.includes(letter)) {
            res = 'yellow';
            if (letter === this.word[index])
                res = 'green';
        }
        switch (res) {
            case 'black': 
                this.blackSet.add(letter); break;
            case 'yellow': 
                if (!this.greenSet.has(letter)) this.yellowSet.add(letter); break;
            case 'green': 
                if (this.yellowSet.has(letter)) {
                    this.yellowSet.delete(letter);
                }
                this.greenSet.add(letter); break;
        }
        return res;
    }

    getBlack(): Set<string> {
        return this.blackSet;
    }

    getYellow(): Set<string> {
        return this.yellowSet;
    }

    getGreen(): Set<string> {
        return this.greenSet;
    }
}

export default new Logic();