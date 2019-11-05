const logger = require('./logger');

console.log('logger', logger);
console.log('logger.log');

logger.log('disa');

//
function sayHello() {
  console.log('yellow');
}

sayHello();

function logModuleObject() {
  console.log(module); // global.module
}

//logModuleObject();
