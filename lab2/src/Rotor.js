class Rotor {
    #wheel
    #currentChar
    #charToSpin

    constructor(wheel, currentChar, charToSpin) {
        this.#wheel = wheel;
        this.#currentChar = currentChar;
        this.#charToSpin = charToSpin;
    }

    get wheel() {
        return this.#wheel;
    }

    get currentSymbol() {
        return this.#currentChar.charCodeAt(0) - 'A'.charCodeAt(0);
    }

    /**
     * @returns {boolean} - the need to rotate the next rotor
     */
    spin() {
        this.#currentChar = this.#currentChar !== 'Z' ? String.fromCharCode(this.#currentChar.charCodeAt(0) + 1) : 'A';
        return this.#currentChar === this.#charToSpin
    }

    getSymbolReversed(symbol) {
        for (let key in this.#wheel) {
            if (this.#wheel[key] === symbol) {
                return key;
            }
        }
    }
}

module.exports = Rotor;
