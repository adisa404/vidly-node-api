// promisses
console.log('before');

const p = new Promise((resolve, reject) => {
  // some async work
  setTimeout(() => {
    resolve(1);
  }, 2000);
  //reject(new Error(''));
});

p.then(result => console.log('result', result));

console.log('after');

//output:
//before
//after
//result 1
