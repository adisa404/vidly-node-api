const express = require('express');
const debug = require('debug')('vidly:startup');
const morgan = require('morgan');
const genres = require('./routes/genres');

let app = express();

app.use(express.json());

// enable debugging only in development environment
// this always on top, before registering all routes
// https://github.com/expressjs/morgan/issues/168

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port} ...`));