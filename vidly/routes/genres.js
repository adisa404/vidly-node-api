const router = require('express').Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const genresSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
});

const Genres = mongoose.model('Genre', genresSchema);

// register routes
router.get('/', async (req, res) => {
  const genres = await Genres.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre)
    return res.status(400).send('genre with the given Id was not found.');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let genre = new Genres({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  // validation before updating
  const { error } = validateGenre(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await Genres.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(400).send('The genre with the given ID was not found');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genres.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('genre not found');

  res.send(genre);
});

function validateGenre(genre) {
  // validate
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
