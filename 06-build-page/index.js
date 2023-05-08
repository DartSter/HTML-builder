const {
  writeFile,
  readFile,
  mkdir,
  readdir,
  appendFile,
  copyFile,
  rm,
  access,
} = require('node:fs/promises');
const path = require('node:path');
const { constants } = require('node:fs');
const pathToTamplate = path.resolve(__dirname, 'template.html');
const directory = path.resolve(__dirname, 'project-dist');
const pathToStyles = path.resolve(__dirname, 'styles');
const wf = async (path, data) => {
  await writeFile(path, data, 'utf-8');
};

(async () => {
  try {
    await access(directory, constants.F_OK);
    await rm(directory, { recursive: true });
  } catch (error) {
    } finally {
    mkdir(path.resolve(directory), { recursive: true })
      .then(() => wf(path.resolve(directory, 'index.html'), ''))
      .then(() => readFile(pathToTamplate, 'utf-8'))
      .then((data) => wf(path.resolve(directory, 'index.html'), data))
      .then(() =>
        readFile(pathToTamplate, { encoding: 'utf-8' }, (err) => {
          if (err) console.log(err);
          return;
        }).then((data) => data.match(/{{\w*}}/g))
      )
      .then(async (data) => {
        let base = await readFile(pathToTamplate, 'utf-8');
        await data.forEach(async (item) => {
          await readFile(
            path.resolve(
              __dirname,
              'components',
              `${item.slice(2, item.length - 2)}.html`
            ),
            'utf-8'
          ).then((data) => {
            base = base.replace(item, data);
            wf(path.resolve(directory, 'index.html'), base);
          });
        });
      })
      .then(() => wf(path.resolve(directory, 'style.css'), ''))
      .then(() => readdir(pathToStyles, { withFileTypes: true }))
      .then((data) =>
        data
          .filter((item) => item.isFile() && item.name.slice(-3) === 'css')
          .map((item) => item.name)
      )
      .then((data) =>
        data.map((item) =>
          readFile(path.resolve(pathToStyles, item), {
            encoding: 'utf-8',
          }).then((data) =>
            appendFile(path.resolve(directory, 'style.css'), data, {
              encoding: 'utf-8',
            })
          )
        )
      )
      .then(() => mkdir(path.resolve(directory, 'assets'), { recursive: true }))
      .then(() => readdir(path.resolve(__dirname, 'assets')))
      .then((data) =>
        data.map(async (item, index) => {
          await mkdir(path.resolve(directory, 'assets', data[index]), {
            recursive: true,
          });
          await readdir(path.resolve(__dirname, 'assets', data[index])).then(
            (dir) =>
              dir.map((item) => {
                copyFile(
                  path.resolve(__dirname, 'assets', data[index], item),
                  path.resolve(directory, 'assets', data[index], item)
                );
              })
          );
        })
      );
  }
})();
