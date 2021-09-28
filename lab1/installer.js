const machine = require('node-machine-id');
const fs = require('fs');

// Function: machineId(original)
// original <Boolean>, If true return original value of machine id,
// otherwise return hashed value (sha-256), default: false

fs.writeFileSync('./key.txt', machine.machineIdSync());