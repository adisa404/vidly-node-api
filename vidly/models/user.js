const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024 // higher number bc it's hashed
  }
});

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

const Users = mongoose.model('User', usersSchema);

function validateUser (user) {
  // validate
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email() //check for valid email
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.Users = Users;
exports.validate = validateUser;
exports.usersSchema = usersSchema;
