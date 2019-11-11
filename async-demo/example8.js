// rewrite example 6 with async and await
console.log('Before');

async function getData() {
  try {
    const user = await getUser(1);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

getData();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('call to db');
      resolve({ id: id, name: 'disa404' }); // returning result of async operation with this line
    }, 2000);
  });
}

console.log('After');
