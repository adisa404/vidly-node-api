const router = require('express').Router();

const genres = [
  { id: 1, name: 'Acion' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

// register routes
router.get('/api/genres', (req, res) => {
  res.send(genres);
});

router.get('/api/genres/:id', (req, res) => {
  res.send(genres.find(g => g.id === parseInt(req.body.id)));
});

router.post('api/genres', (req, res) => {
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

router.delete('/api/genres/:id', (req, res) => {
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

module.exports = router;
