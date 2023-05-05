const fs = require('fs');
const path = require('path');
const {stdout} = require('process')
const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

let result = '';
stream.on('data', (chunk) => {
  result += chunk;
});
stream.on('end', () => {
  stdout.write(result);
});

stream.on('error', (err) => {
  stdout.write(err.message);
});
