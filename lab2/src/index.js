global.amountOfSymbols = 26;

// const {createConfig} = require('./utils/utils');
const Enigma = require('./Enigma');

// createConfig('config.txt');
let enigma = new Enigma('test.txt');

enigma.encode('DOXSPCJBRG');