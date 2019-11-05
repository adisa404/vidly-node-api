// path module

const path = require('path');
let pathObj = path.parse(__filename);

console.log(pathObj);

// os module

const os = require('os');
let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`free memory ${freeMemory}`);
console.log(`total memory ${totalMemory}`);
