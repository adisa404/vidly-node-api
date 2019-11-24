const express = require('express');
const debug = require('debug')('vidly:startup');
const morgan = require('morgan');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const mongoose = require('mongoose');

let app = express();

app.use(express.json());

// enable debugging only in development environment
// this always on top, before registering all routes
// https://github.com/expressjs/morgan/issues/168

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}

mongoose
  .connect('mongodb://localhost:27017/VidlyNode')
  .then(() => console.log('Connected to MongoDb VidlyNode!'))
  .catch(err => console.log('Error connectiing to db', err));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port} ...`));
