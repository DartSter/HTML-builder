const path = require('node:path');
const { copyFile, mkdir, rm } = require('node:fs/promises');
const { readdir } = require('node:fs/promises');
const newFolderPath = path.resolve(__dirname, 'files-copy');

mkdir(newFolderPath, { recursive: true })
  .then(() => rm(newFolderPath, { recursive: true }))
  .then(() => mkdir(newFolderPath, { recursive: true }))
  .then(() => readdir(path.resolve(__dirname, 'files')))
  .then((data) =>
    data.map((item) => {
      copyFile(
        path.resolve(__dirname, 'files', item),
        path.resolve(newFolderPath, item)
      );
    })
  );
