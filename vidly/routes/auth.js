const _ = require('lodash');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/user');

// register routes
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) res.status(400).send(error.details[0].message);

  // check if user is already registered
  let user = await Users.findOne({ email: req.body.email });
  console.log('user', user);
  if (!user) res.status(400).send('Invalid email or password.'); // we do not want to send 404, and to give to much info why the validation failed

  let success = await bcrypt.compare(req.body.password, user.password);

  console.log('success', success);
  if (!success) res.status(400).send('Invalid email or password.');

  // create token
  const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  console.log('validate', Joi.validate(req, schema));
  return Joi.validate(req, schema);
}

module.exports = router;
