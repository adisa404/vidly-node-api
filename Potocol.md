# vidly-node-api

## node

- a runtime environment for executing js code outside of the browser

- is asynchronous

- is single threaded

## node module system

log module object to see the properties

vars and functions are scoped to a module, unless we export it
and make it available outside of thius module

## load module

use require function
require('./logger')

first log the return value of the require function:
logger { log: [Function: log] }

but we can also export like this
module.exports = log;

now log is accessible as a function

## module wrapper function

every js file iw wraped in a module wrapper function at runtime.

so logger js is wrapped into:

```
(function (exports, require, module, __filename, __dirname){

})

```

this function is local to every module

sow we can refernce each of the parameteres

## path module

https://nodejs.org/api/path.html

use require('path'), since path is not a file, it will load the built in path module

## os module

require('os')

https://nodejs.org/api/os.html

## fs module

require('fs')

https://nodejs.org/api/fs.html

all async methods take functions as their last argument.
node will call the callback function when that async operation completes

always use async methods.

## events module

require('events') return value is the EventEmitter class

emit meaning - making a noise or produce something. In app we are signaling that an event has happened

if we run node app.js with emitter.emit('messageLogged'); nothing is going to happen

everytime we raise an event we need to register a listener
old syntax
.addListener()
more familiar sintax
.on(),
which takes the name of the venet and a callback function

arg recieve what we passed in emit { id: 1, url: 'http://' }
