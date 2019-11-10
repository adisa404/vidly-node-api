const express = require('express');
const Joi = require('joi');
const debug = require('debug')('vidly:startup');
const morgan = require('morgan');

let app = express();

app.use(express.json());

// enable debugging only in development environment
// this always on top, before registering all routes
// https://github.com/expressjs/morgan/issues/168

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}

const genres = [
  { id: 1, name: 'Acion' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

// register routes
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  res.send(genres.find(g => g.id === parseInt(req.body.id)));
});

app.post('api/genres', (req, res) => {
  const { error } = validateGenre(reg.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

app.put('api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.body.id));
  if (!genre)
    return res.status(400).send('The genre with the given ID was not found');
  const { error } = validateGenre(reg.body);
  if (error) res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.body.id));
  if (!genre) return res.status(404).send('genre not found');

  genres.splice(genres.indexOf(genre), 1);

  res.send(genre); // send updated array?
});

function validateGenre(genre) {
  // validate
  const schema = {
    title: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port} ...`));
