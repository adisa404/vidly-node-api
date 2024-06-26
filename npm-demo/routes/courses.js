const Joi = require('joi');
const express = require('express');

let router = express.Router();

const courses = [
  { id: 1, title: 'course1' },
  { id: 2, title: 'course2' },
  { id: 3, title: 'course3' },
  { id: 4, title: 'course4' },
  { id: 5, title: 'course5' }
];

// GET api/courses
router.get('/', (req, res) => {
  res.send(courses);
});

// GET api/courses/id
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send('The course with the given id was not found');
  res.send(course);
});

// POST /api/courses
router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    title: req.body.title
  };
  courses.push(course);
  res.send(course);
});

// PUT /api/courses/1
router.put('/:id', (req, res) => {
  // find course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send('The course with the given id was not found');

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // update course
  course.title = req.body.title;

  // send course
  res.send(course);
});

// DELETE /api/courses/1
router.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given id was not found');
  }

  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

function validateCourse(course) {
  // validate
  const schema = {
    title: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

module.exports = router;
