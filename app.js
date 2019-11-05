const log = require('./logger');

console.log('logger.log');

log('disa');

//
function sayHello() {
  console.log('yellow');
}

sayHello();

function logModuleObject() {
  console.log(module); // global.module
}

//logModuleObject();
