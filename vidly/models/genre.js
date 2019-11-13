const mongoose = require('mongoose');
const Joi = require('joi');

const genresSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
});

const Genres = mongoose.model('Genre', genresSchema);

function validateGenre(genre) {
  // validate
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

exports.Genres = Genres;
exports.validate = validateGenre;
