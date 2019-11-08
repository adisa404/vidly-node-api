const Joi = require('joi');
const express = require('express');

let app = express();

app.use(express.json());

const courses = [
  { id: 1, title: 'course1' },
  { id: 2, title: 'course2' },
  { id: 3, title: 'course3' },
  { id: 4, title: 'course4' },
  { id: 5, title: 'course5' }
];
// register routes

app.get('/', (req, res) => res.send('hello world'));

// GET api/courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// GET api/courses/id
app.get('/api/courses/:id', (req, res) => {
  const course = res.send(courses.find(c => c.id === parseInt(req.params.id)));

  if (!course)
    res.status(404).send('The course with the given id was not found');
  res.send(course);
});

// POST /api/courses
app.post('/api/courses', (req, res) => {
  const schema = {
    title: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    title: req.body.title
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
