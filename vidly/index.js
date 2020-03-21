const express = require('express');
const debug = require('debug')('vidly:startup');
const morgan = require('morgan');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');

console.log(config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
  console.error('FATAL:error jwtPrivateKey is not defined ');

  process.exit(1);
}

let app = express();

app.use(express.json());

// enable debugging only in development environment
// this always on top, before registering all routes
// https://github.com/expressjs/morgan/issues/168

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}
const dbConnectionString = config.get('db');
mongoose
  .connect(dbConnectionString)
  .then(() => console.log(`Connected to MongoDb ${dbConnectionString}`))
  .catch(err => console.log(`Error connectiing to ${dbConnectionString}`, err));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => debug(`Listening on port ${port} ...`));

module.exports = server;
