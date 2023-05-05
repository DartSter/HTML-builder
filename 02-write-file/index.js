const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });
const creatFile = (pathToFile, answer) => {
  fs.writeFile(pathToFile, '', (err) => {
    if (err) {
      console.log(err);
    }
  });
  writebleStream.write(`${answer}\n`);
};
const writebleStream = fs.createWriteStream(
  path.resolve(__dirname, 'buffer.txt'),
  {
    encoding: 'utf-8',
  }
);
rl.question('Hello! Say something\n', (answer) => {
  if (answer === 'exit') {
    rl.close();
    return;
  }
  creatFile(path.resolve(__dirname, 'buffer.txt'), answer);
  output.write(`Recorded ${answer}\nIs there anything else you want to say?\n`);
});

rl.on('line', (data) => {
  if (data === 'exit') {
    rl.close();
    return;
  }
  if (!data) {
    console.log(`Nothing to say?\n`);
    return;
  }
  writebleStream.write(`${data}\n`);
  output.write(`Recorded ${data}\nGreat! Anything else you want to say?\n`);
});

rl.on('close', () => {
  output.write('\nGoodbye! Nice to meet you');
  writebleStream.end();
});
