const Joi = require('joi');
const mongoose = require('mongoose');
const { genresSchema } = require('./genre');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  genre: { type: genresSchema, required: true },
  numberInStock: { type: Number, required: true, min: 0, max: 5000 },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 5000 }
});

const Movies = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  // validate
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movies = Movies;
