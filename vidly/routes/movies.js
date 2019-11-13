const router = require('express').Router();
const { Movies, validate } = require('../models/movie');
const { Genres } = require('../models/genre');

// register routes
router.get('/', async (req, res) => {
  const movies = await Movies.find().sort('title');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById(req.params.id);
  if (!movie)
    return res.status(400).send('movie with the given Id was not found.');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  console.log(req.body);

  // check if genre exists
  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = new Movies({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.numberInStock
  });

  movie = await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  // validation before updating
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check if genre exists
  const genre = await Genres.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genre: { _id: genre._id, name: genre.name },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.numberInStock
      }
    },
    { new: true }
  );
  if (!movie)
    return res.status(400).send('The movie with the given ID was not found');

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send('movie not found');

  res.send(movie);
});

module.exports = router;
