console.log(__dirname);
const url = 'fake-logger-service.io/log';

function log(message) {
  console.log(message);
}

module.exports = log;
