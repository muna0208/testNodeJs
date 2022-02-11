
const math = require('./math.js');
console.log("test 1: "+math.sum(2,3));

const fs = require('fs');
const data = fs.readFileSync('./test/data.txt', 'utf8');
console.log("test 2: "+data);

const data3 = fs.readFile('./test/data.txt','utf8', function(err, data2) {
    console.log("test 3: "+data2);
});

console.log("test 4: "+data3);
