/*
get all the published courses,
15$ or more,
or have the word "by" in their title
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
  return await Course.find({ isPublished: true }).or([
    { name: { $regex: /.*by.*/i } },
    {
      price: { $gt: 15 }
    }
  ]);
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
