class Rotor {
    #wheel
    #currentSymbol
    #symbolToSpin

    constructor(wheel, currentChar, charToSpin) {
        this.#wheel = wheel;
        this.#currentSymbol = currentChar;
        this.#symbolToSpin = charToSpin;
    }

    get wheel() {
        return this.#wheel;
    }

    get currentSymbol() {
        return this.#currentSymbol;
    }

    /**
     * @returns {boolean} - the need to rotate the next rotor
     */
    spin() {
        this.#currentSymbol = this.#currentSymbol !== global.amountOfSymbols - 1 ? this.#currentSymbol + 1 : 0;
        return this.#currentSymbol === this.#symbolToSpin
    }

    getSymbolReversed(symbol) {
        for (let key in this.#wheel) {
            if (this.#wheel[key] == symbol) {
                return key;
            }
        }
    }
}

module.exports = Rotor;
