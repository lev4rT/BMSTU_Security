const fs = require('fs');
global.amountOfSymbols = 256;

((configFileName) => {
    const config = {
        firstRotorWheel: {
        },
        firstRotorCurrentSymbol: Math.floor(Math.random() * global.amountOfSymbols),
        firstRotorSymbolToSpin: Math.floor(Math.random() * global.amountOfSymbols),
        secondRotorWheel: {
        },
        secondRotorCurrentSymbol: Math.floor(Math.random() * global.amountOfSymbols),
        secondRotorSymbolToSpin: Math.floor(Math.random() * global.amountOfSymbols),
        thirdRotorWheel: {
        },
        thirdRotorCurrentSymbol: Math.floor(Math.random() * global.amountOfSymbols),
        thirdRotorSymbolToSpin: Math.floor(Math.random() * global.amountOfSymbols),
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
})('config.txt');