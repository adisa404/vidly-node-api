const _ = require('lodash');
const router = require('express').Router();
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const { Users, validate } = require('../models/user');

// register routes
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check if user is already registered
  let user = await Users.findOne({ email: req.body.email });
  if (user) res.status(400).send('User already registered');

  // user = new Users({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  user = new Users(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);

  user.password = password;

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
