// update course
// 1. query first adn 2. update first

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

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  // course.isPublished  = true; // this also works
  // course.author = 'disa';

  // another notation
  course.set({ isPublished: true, author: 'disa' });

  const result = await course.save();
  console.log(result);
}

updateCourse('5a68fdc3615eda645bc6bdec');

async function updateCourseUpdateFirst(id) {
  // update operators
  // https://docs.mongodb.com/manual/reference/operator/update/
  const result = await Course.update(
    { _id: id },
    {
      // const result and not const course. this is not the course obj this is
      // the result of the operation
      $set: { isPublished: false, author: 'disa404' }
    }
  );

  console.log('********************************', result);
}

updateCourseUpdateFirst('5a68fdd7bee8ea64649c2777');

async function deleteCourse(id) {
  const result = await Course.deleteOne({ _id: id }); // alternative findByIdAndRemove

  console.log('*****************************', result);
}

deleteCourse('5a68fde3f09ad7646ddec17e');
