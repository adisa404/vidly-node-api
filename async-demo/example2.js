console.log('Before');

getUser(1);

function getUser(id) {
  setTimeout(() => {
    console.log('call to db');
    return { id: id, name: 'disa404' };
  }, 2000);
}

console.log('After');
