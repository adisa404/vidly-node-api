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

### Pseudo code for building an API

```javascript
// Build a web server
const express = require(‘express’);
const app = express();

// Creating a course
app.post(‘/api/courses’, (req, res) => {
    // Create the course and return the course object
    resn.send(course);
});

// Getting all the courses
app.get(‘/api/courses’, (req, res) => {
    // To read query string parameters (?sortBy=name)
    const sortBy = req.query.sortBy;
    // Return the courses
    res.send(courses);});
    // Getting a single course app.get(‘/api/courses/:id’, (req, res) => {
    const courseId = req.params.id;
    // Lookup the course
    // If not found, return 404
    res.status(404).send(‘Course not found.’);
    // Else, return the course object
    res.send(course);
});

// Updating a course
app.put(‘/api/courses/:id’, (req, res) => {
    // If course not found, return 404, otherwise update it
    // and return the updated object.
});

// Deleting a course
app.delete(‘/api/courses/:id’, (req, res) => {
    // If course not found, return 404, otherwise delete it
    // and return the deleted object.
});

```

### Middelware function

Concept of Middleware in Express

- Middleware function takes a request obj
  and either the returns a response to the client or passes the control to another middleware function

Middleware functions

#### built in

1. route handler function  
    (req, res) => {
   }

2. express.json()
   converts a request to a json object, and populates the req.body property

3. express.urlencoded();

4. express.static('public') - static folder

#### custom middleware functions

// the goal of every MWF is to terminate the request response cycle. if one MWF
calls another MWF that it terminates the cylce and the process is not hanging
// MWFs are called in sequence

#### third party middleware

helmet middleware - for setting headers

morgan middleware - for logging HTTP requests

### environment variables

app.get() - get method in app can give us a lot of information about the app

if this is not set console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
then app.get('env') is set, and by default it takes this variable

```javascript
// enable debugging only in development environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled');
}
``;
```

### confifuration

most popular package for managing configuration is 'rc'
very popular - 'config'

todos

- npm i config
- create fodler config
- add deafult.json
- add development.json
- add production.json
- add custom-configuration-variables.json (exact name) // we use thus to map the name of env variables

```json
{
  "mail": {
    "password": "app_password" // env variable name
  }
}
```

### debug information

todos:

- npm i debug
- debug insetad of console.log()
- require('debug')('namespace_name')
- export DEBUG=namespace_name

```javascript
require('debug')('app:startup');
```

in case of using more namepsaces we set
export DEBUG=namespace1,namespace2

### refactoring express app

- put routes for /courses to courses.js
- not using let app = express(); in e ery file
- using the Routes method instead. -> express.Router();
- export router and require in index.js

in index.js
const courses = require('./courses');

app.use('/api/courses', courses);
