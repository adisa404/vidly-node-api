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

## http module

https://nodejs.org/api/http.html

# npm

## npm init

to add package.json

require('underscore')

require resolved this string first by assuming this is a

1. core module,
2. file of folder
3. node_modules

todos:

- npm init
- install underscore and mongoose
- add gitignore file

## versioning

"dependencies": {
"mongoose": "^5.7.8", // ^caret notation - install this or newer 5.x version
"underscore": "~1.9.1" // ~tilde notation - install this or newer 1.9.xnpm
}

## list installed npm version packages

npm list

## listing without depe dependencies

npm list --depth=0

## list outdated versions of all packages

npm outdated

## uninstall a package

npm un mongoose

## todos

- install express
- create index.js and define new routes
  get('/', (req, res) => )
- listen on port app.listen(3000);
- install nodemon for monitoring (we this we don't need to run node index.js everytime). To watch the files we run: nodemon index.js

## set environment variable

in terminal export PATH=5000 // didn't work

## validation with joi

const Joi = require('joi'); // pascal case since this returns a class

# joi object when a valid title is sent

```json
    { error: null,
    value: { title: 'new course' },
    then: [Function: then],
    catch: [Function: catch] }
```

# joi object when a invalid title is sent

```json
    { error:
    { ValidationError: child "title" fails because ["title" is required]......
    isJoi: true,
    name: 'ValidationError',
    details: [ [Object] ],
    _object: {},
    annotate: [Function] },
    value: {},
    then: [Function: then],
    catch: [Function: catch] }
```
