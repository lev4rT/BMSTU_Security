const fs = require('fs');
const machine = require('node-machine-id');

fs.readFile('./key.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err, 'Oops, something went wrong');
        return;
    }
    if (machine.machineIdSync() !== data) {
        console.log('You dont have a license. Please, buy it');
        return;
    }
    require('terminal-parrot');
});