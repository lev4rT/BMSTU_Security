const fs = require('fs');
const Reflector = require('./Reflector');
const Rotor = require('./Rotor');

const {addModulo, diffModulo} = require('./utils/utils');


class Enigma {
    #firstRotor;
    #secondRotor;
    #thirdRotor;
    #reflector;
    constructor(configFileName) {

        let data = JSON.parse(fs.readFileSync(configFileName).toString());
        this.#firstRotor = new Rotor(data.firstRotorWheel, data.firstRotorCurrentChar, data.firstRotorCharToSpin);
        this.#secondRotor = new Rotor(data.secondRotorWheel, data.secondRotorCurrentChar, data.secondRotorCharToSpin);
        this.#thirdRotor = new Rotor(data.thirdRotorWheel, data.thirdRotorCurrentChar, data.thirdRotorCharToSpin);
        this.#reflector = new Reflector(data.reflector);
    }

    encode(value) {
        let encodedValue = '';
        for (let char of value) {
            this.#firstRotor.spin() && this.#secondRotor.spin() && this.#thirdRotor.spin();
            let firstRotorStraightResult = this.#firstRotor.wheel[String.fromCharCode(addModulo(char.charCodeAt(0) - 'A'.charCodeAt(0), this.#firstRotor.currentSymbol) + 'A'.charCodeAt(0))];
            let secondRotorStraightResult = this.#secondRotor.wheel[String.fromCharCode(addModulo(firstRotorStraightResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol)) + 'A'.charCodeAt(0))];
            // console.log(addModulo(firstRotorStraightResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol)));
            // console.log(String.fromCharCode(addModulo(firstRotorStraightResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol)) + 'A'.charCodeAt(0)));
            let thirdRotorStraightResult = this.#thirdRotor.wheel[String.fromCharCode(addModulo(secondRotorStraightResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#thirdRotor.currentSymbol, this.#secondRotor.currentSymbol)) + 'A'.charCodeAt(0))];
            let reflectorResult = this.#reflector.get(String.fromCharCode(diffModulo(thirdRotorStraightResult.charCodeAt(0) - 'A'.charCodeAt(0), this.#thirdRotor.currentSymbol) + 'A'.charCodeAt(0)))

            let thirdRotorReverseResult = this.#thirdRotor.getSymbolReversed(String.fromCharCode(addModulo(reflectorResult.charCodeAt(0) - 'A'.charCodeAt(0), this.#thirdRotor.currentSymbol) + 'A'.charCodeAt(0)));
            let secondRotorReverseResult = this.#secondRotor.getSymbolReversed(String.fromCharCode(diffModulo(thirdRotorReverseResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#thirdRotor.currentSymbol, this.#secondRotor.currentSymbol)) + 'A'.charCodeAt(0)));
            let firstRotorReverseResult = this.#firstRotor.getSymbolReversed(String.fromCharCode(diffModulo(secondRotorReverseResult.charCodeAt(0) - 'A'.charCodeAt(0), diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol)) + 'A'.charCodeAt(0)));
            let result = String.fromCharCode(diffModulo(firstRotorReverseResult.charCodeAt(0) - 'A'.charCodeAt(0), this.#firstRotor.currentSymbol) + 'A'.charCodeAt(0));
            encodedValue += result;
        }
        console.log(encodedValue)
    }
}

module.exports = Enigma;