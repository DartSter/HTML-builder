const path = require('node:path');
const { writeFile, readFile, appendFile } = require('node:fs/promises');
const { readdir } = require('node:fs/promises');

const pathToStyles = path.resolve(__dirname, 'styles');
const distanation = path.resolve(__dirname, 'project-dist');

writeFile(path.resolve(distanation, 'bundle.css'), '', { encoding: 'utf-8' })
  .then(() => readdir(pathToStyles, { withFileTypes: true }))
  .then((data) =>
    data
      .filter((item) => item.isFile() && item.name.slice(-3) === 'css')
      .map((item) => item.name)
  )
  .then((data) =>
    data.map((item) =>
      readFile(path.resolve(pathToStyles, item), { encoding: 'utf-8' }).then(
        (data) =>
          appendFile(path.resolve(distanation, 'bundle.css'), data, {
            encoding: 'utf-8',
          })
      )
    )
  );
