const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const courses = require('./routes/courses');
const home = require('./routes/home');
//const logger = require('./middleware/logger');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
//app.use(logger);

// enable debugging only in development environment
// this always on top
// https://github.com/expressjs/morgan/issues/168

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}

app.use('/', home);
// every route that starts with /api/courses should be handled by the courses router
app.use('/api/courses', courses);

debug(`app name: ${config.get('name')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port} ...`));
