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
        this.#firstRotor = new Rotor(data.firstRotorWheel, data.firstRotorCurrentSymbol, data.firstRotorSymbolToSpin);
        this.#secondRotor = new Rotor(data.secondRotorWheel, data.secondRotorCurrentSymbol, data.secondRotorSymbolToSpin);
        this.#thirdRotor = new Rotor(data.thirdRotorWheel, data.thirdRotorCurrentSymbol, data.thirdRotorSymbolToSpin);
        this.#reflector = new Reflector(data.reflector);
    }

    encode(value) {
        let encodedValue = [];
        for (let symbol of value) {
            this.#firstRotor.spin() && this.#secondRotor.spin() && this.#thirdRotor.spin();
            let firstRotorStraightResult = this.#firstRotor.wheel[addModulo(symbol, this.#firstRotor.currentSymbol)];
            let secondRotorStraightResult = this.#secondRotor.wheel[addModulo(firstRotorStraightResult, diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol))];
            let thirdRotorStraightResult = this.#thirdRotor.wheel[addModulo(secondRotorStraightResult, diffModulo(this.#thirdRotor.currentSymbol, this.#secondRotor.currentSymbol))];
            let reflectorResult = this.#reflector.get(diffModulo(thirdRotorStraightResult, this.#thirdRotor.currentSymbol));

            let thirdRotorReverseResult = this.#thirdRotor.getSymbolReversed(addModulo(reflectorResult, this.#thirdRotor.currentSymbol));
            let secondRotorReverseResult = this.#secondRotor.getSymbolReversed(diffModulo(thirdRotorReverseResult, diffModulo(this.#thirdRotor.currentSymbol, this.#secondRotor.currentSymbol)));
            let firstRotorReverseResult = this.#firstRotor.getSymbolReversed(diffModulo(secondRotorReverseResult, diffModulo(this.#secondRotor.currentSymbol, this.#firstRotor.currentSymbol)));
            let result = diffModulo(firstRotorReverseResult, this.#firstRotor.currentSymbol);
            encodedValue.push(result);
        }
        return encodedValue;
    }
}

module.exports = Enigma;