const logger = require('./logger');

console.log('logger.log');

logger('disa');

//
function sayHello() {
  console.log('yellow');
}

sayHello();

function logModuleObject() {
  console.log(module); // global.module
}

//logModuleObject();
