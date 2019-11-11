// rewrite example 4
// use promises intead of callbacks

console.log('Before');

const p = getUser(1);
console.log(
  p
    .then(user => console.log('result', user))
    .catch(err => console.log('Error', err.message))
);

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('call to db');
      resolve({ id: id, name: 'disa404' }); // returning result of async operation with this line
    }, 2000);
  });
}

console.log('After');
