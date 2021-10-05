const fs = require("fs");
const addModulo = (symbol, toAdd) => {
    let tmp = symbol + toAdd;
    if (tmp >= global.amountOfSymbols) {
        tmp -= global.amountOfSymbols
    }
    return tmp;
}

const diffModulo = (firstSymbol, secondSymbol) => {
    let tmp = firstSymbol - secondSymbol;
    return tmp >= 0 ? tmp : tmp + global.amountOfSymbols;
}

const createConfig = (configFileName) => {
    const config = {
        firstRotorWheel: {
        },
        firstRotorCurrentSymbol: Math.random() % global.amountOfSymbols,
        firstRotorSymbolToSpin: Math.random() % global.amountOfSymbols,
        secondRotorWheel: {
        },
        secondRotorCurrentSymbol: Math.random() % global.amountOfSymbols,
        secondRotorSymbolToSpin: Math.random() % global.amountOfSymbols,
        thirdRotorWheel: {
        },
        thirdRotorCurrentSymbol: Math.random() % global.amountOfSymbols,
        thirdRotorSymbolToSpin: Math.random() % global.amountOfSymbols,
        reflector: {},
    }

    const bytesFirstRotor = Array.from({length: global.amountOfSymbols}, (_, index) => index).sort(() => Math.random() - 0.5);
    const bytesSecondRotor = Array.from({length: global.amountOfSymbols}, (_, index) => index).sort(() => Math.random() - 0.5);
    const bytesThirdRotor = Array.from({length: global.amountOfSymbols}, (_, index) => index).sort(() => Math.random() - 0.5);
    for (let i = 0; i < global.amountOfSymbols; ++i) {
        config.firstRotorWheel[i] = bytesFirstRotor[i];
        config.secondRotorWheel[i] = bytesSecondRotor[i];
        config.thirdRotorWheel[i] = bytesThirdRotor[i];
    }

    const bytesReflector = Array.from({length: global.amountOfSymbols / 2}, (_, index) => index).sort(() => Math.random() - 0.5);
    for (let i = 0; i < global.amountOfSymbols / 2; ++i) {
        config.reflector[i + global.amountOfSymbols / 2] = bytesReflector[i];
        config.reflector[bytesReflector[i]] = i + global.amountOfSymbols / 2;
    }

    fs.writeFileSync(configFileName, JSON.stringify(config))
}

module.exports = {addModulo, diffModulo, createConfig};

// This shit is for symbolic enigma
// const config = {
//     firstRotorWheel: {
//         'A': 'E',
//         'B': 'K',
//         'C': 'M',
//         'D': 'F',
//         'E': 'L',
//         'F': 'G',
//         'G': 'D',
//         'H': 'Q',
//         'I': 'V',
//         'J': 'Z',
//         'K': 'N',
//         'L': 'T',
//         'M': 'O',
//         'N': 'W',
//         'O': 'Y',
//         'P': 'H',
//         'Q': 'X',
//         'R': 'U',
//         'S': 'S',
//         'T': 'P',
//         'U': 'A',
//         'V': 'I',
//         'W': 'B',
//         'X': 'R',
//         'Y': 'C',
//         'Z': 'J',
//     },
//     firstRotorCurrentChar: 'Q',
//     firstRotorCharToSpin: 'R',
//     secondRotorWheel: {
//         'A': 'A',
//         'B': 'J',
//         'C': 'D',
//         'D': 'K',
//         'E': 'S',
//         'F': 'I',
//         'G': 'R',
//         'H': 'U',
//         'I': 'X',
//         'J': 'B',
//         'K': 'L',
//         'L': 'H',
//         'M': 'W',
//         'N': 'T',
//         'O': 'M',
//         'P': 'C',
//         'Q': 'Q',
//         'R': 'G',
//         'S': 'Z',
//         'T': 'N',
//         'U': 'P',
//         'V': 'Y',
//         'W': 'F',
//         'X': 'V',
//         'Y': 'O',
//         'Z': 'E',
//     },
//     secondRotorCurrentChar: 'U',
//     secondRotorCharToSpin: 'A',
//     thirdRotorWheel: {
//         'A': 'B',
//         'B': 'D',
//         'C': 'F',
//         'D': 'H',
//         'E': 'J',
//         'F': 'L',
//         'G': 'C',
//         'H': 'P',
//         'I': 'R',
//         'J': 'T',
//         'K': 'X',
//         'L': 'V',
//         'M': 'Z',
//         'N': 'N',
//         'O': 'Y',
//         'P': 'E',
//         'Q': 'I',
//         'R': 'W',
//         'S': 'G',
//         'T': 'A',
//         'U': 'K',
//         'V': 'M',
//         'W': 'U',
//         'X': 'S',
//         'Y': 'Q',
//         'Z': 'O',
//     },
//     thirdRotorCurrentChar: 'C',
//     thirdRotorCharToSpin: 'A',
//     reflector: {
//         'A': 'Y',
//         'B': 'R',
//         'C': 'U',
//         'D': 'H',
//         'E': 'Q',
//         'F': 'S',
//         'G': 'L',
//         'I': 'P',
//         'J': 'X',
//         'K': 'N',
//         'M': 'O',
//         'T': 'Z',
//         'V': 'W',
//         'Y': 'A',
//         'R': 'B',
//         'U': 'C',
//         'H': 'D',
//         'Q': 'E',
//         'S': 'F',
//         'L': 'G',
//         'P': 'I',
//         'X': 'J',
//         'N': 'K',
//         'O': 'M',
//         'Z': 'T',
//         'W': 'V',
//     },
// }