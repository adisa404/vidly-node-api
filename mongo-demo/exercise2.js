/*
get all the published backed and frontend courses,
sort them by price desc,
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
  return await Course.find({
    isPublished: true,
    tags: { $in: ['frontend', 'backend'] }
  }) // find only published courses
    .sort({ price: 1 }) // sort by name 1 indicates asc, -1 desc or // -price
    .select('name author price'); // only get name and author
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
