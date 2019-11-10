const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const courses = require('./courses');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// every route that starts with /api/courses should be handled by the courses router
app.use('/api/courses', courses);

// enable debugging only in development environment
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}

debug(`app name: ${config.get('name')}`);

// register routes
app.get('/', (req, res) => res.send('hello world'));

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port} ...`));
