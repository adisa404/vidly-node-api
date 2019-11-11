/*
get all the published backed courses,
sort them by name,
pick only their name and author,
and display them
*/

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/MongoExercises')
  .then(() => console.log('Connected to MongoDb!'))
  .catch(err => console.log('Error connectiing to db', err));

const courseSchema = mongoose.Schema({
  _id: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true }) // find only published courses
    .sort({ name: 1 }) // sort by name 1 indicates asc, -1 desc
    .select({ name: 1, author: 1 }); // only get name and author
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
