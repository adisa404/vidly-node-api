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

in case of usifng more namepsaces we set
export DEBUG=namespace1,namespace2

### refactoring express app

- put routes for /courses to courses.js
- not using let app = express(); in e ery file
- using the Routes method instead. -> express.Router();
- export router and require in index.js

in index.js
const courses = require('./courses');

app.use('/api/courses', courses);

### Sync and Async Programming

#### Sync

```js
console.log('Before'); // executes first
console.log('After'); // exectutes when line above is executed
```

#### Async

```js
console.log('Before');

setTimeout(() => {
  // setTimeout is async by default, when run it schedules a task to run in the future
  console.log('call to db');
}, 2000);

console.log('After');
```

outcome:
Before
After
call to db

js is singlethreaded, so writing async maintanable code is important

### Getting the result of an async operation

1. callbacks
2. promises
3. Async/Await

#### callbacks

- use callback function to get the result

#### promises

- promise: an object that holds the eventual result of an async operation
  this obj can be in 3 states

1. pending
2. fullfilled
3. rejected

Jedino sto shvatam za ove promises je da nece prije vremena zatraziti value, nego kad se zavrsi async, primjer:
example5 output
before
after
result 1

promise.then().catch()

### refactoring from callback to promise

- we use resolve function instead of callback function ex. 6

### consuming promisses

- we cannot use this const user = getUser(1);
- we need to use primise.then()

### settled promises

- we can simulate that a promise is already resolved with Promise.resolve({id:1});
- this is useful for unit tests (ex7)

### running promises in parallel

Promise.all([p1,p2]); - Wait for an array of promises for complete

#### async and await

- if a func returns a pomise we can use the await keyword ex8
- await is only valid in async function
- wrap await in async func

### mongoose exercises

mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray
I will rename this to my db
--->
mongoimport --db MongoExercises --collection courses --drop --file exercise-data.json --jsonArray

exercises 1:
get all the published backed courses,
sort them by name,
pick only their name and author,
and display them

### define schema

```js
const courseSchema = mongoose.Schema({
  _id: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});
```

### add new course object to db

```js
const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
  const course = new Course({ name: 'adisa' });
  const result = await course.save();
}

createCourse();
```

### updating a document

#### query first:

- find by id
- modify properties
- save()

#### update first:

- update the doc in the db directly

* mongo db update operators
  https://docs.mongodb.com/manual/reference/operator/update/

  instead of Course.Update we can use Course.FindByIdAndUpdate. This will get the doc and update it. But to get the updated doc we need to pass, new: true as the second parameter

### validation

- ask for validation - force valication with course.validate()
- we will use Joi for rest apis, and mongoose validation in saving itd

schema type options

### use mongoose in genres.js

- install mongoose
  mongoose instance
  connection string
  schema

in api calls use updateGenre

### create models

(Single Responsibility Principle)
model related stuff into models

### create API for movies

- use genres schema from genre.js

POST
only with genreId

```json
{
  "title": "Hello Movie 3",
  "genreId": "5dcafc2db663f80f67b9e590",
  "dailyRentalRate": 2,
  "numberInStock": 0
}
```

PUT

```json
{
  "title": "Change First Movie",
  "genreId": "5dcafc2db663f80f67b9e590",
  "dailyRentalRate": 2,
  "numberInStock": 0
}
```

### transactions

svaka promjena u db je transakcija

when we have to save two changes into the db, but onme can fail.
That's why we need transactions, to wrap the procedure into one tranbsaction, that means either the both chanes happen or none. If the first one changed it needs to be rolled back. If we don't wrap it into a transaction we will not be able to roll it back.

In mongodb there are no transactions

for mongodb there is a term `two phased commit`

there is an npm package that simulates a transaction for mongodb `fawn`

### joi-objectid

npm i joi-objectid
