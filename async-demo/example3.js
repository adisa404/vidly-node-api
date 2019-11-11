console.log('Before');

const user = getUser(1);
console.log(user); // undefined ... will not work. So how do we get a result of an async operation?

//1. callbacks
//2. promises
//3. Async/Await

function getUser(id) {
  setTimeout(() => {
    console.log('call to db');
    return { id: id, name: 'disa404' };
  }, 2000);
}

console.log('After');
