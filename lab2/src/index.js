const fs = require('fs');
const Enigma = require('./Enigma');
global.amountOfSymbols = 256;

const filePath = process.argv[2];
let enigma = new Enigma('config.txt');

const data = fs.readFileSync(filePath);
console.log();


fs.writeFileSync(filePath.slice(-8) === '.encoded' ?
    filePath.substring(0, filePath.length - 8) + '.decoded' :
    filePath + '.encoded',
    new Buffer(enigma.encode(data)));
