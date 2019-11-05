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

// fs module

const fs = require('fs');

let readFiles = fs.readdirSync('./');
console.log(readFiles);

// readdir (async by default)

// all async methods take functions as their last argument.
// node will call the callback function when that async operation completes
fs.readdir('./', function(err, files) {
  if (err) console.log('error', err);
  else console.log('result', files);
});

// events module
const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

// register a listener
logger.on('logging', arg => {
  console.log('listener called', arg);
});

logger.log('adisa sending a message');
