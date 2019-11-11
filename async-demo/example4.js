// using callbacks

console.log('Before');

getUser(1, user => {
  console.log('user', user);
});

function getUser(id, callback) {
  setTimeout(() => {
    console.log('call to db');
    callback({ id: id, name: 'disa404' });
  }, 2000);
}

console.log('After');
