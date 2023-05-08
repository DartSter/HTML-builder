const path = require('node:path');
const { copyFile, mkdir, rm, access } = require('node:fs/promises');
const fs = require('fs');
const { constants } = require('node:fs');
const { readdir } = require('node:fs/promises');
const newFolderPath = path.resolve(__dirname, 'files-copy');

(async()=>  {try {
  await access(newFolderPath, constants.F_OK);
  await rm(newFolderPath, { recursive: true });
  await mkdir(newFolderPath, { recursive: true });
} catch (error) {
  mkdir(newFolderPath, { recursive: true });
} finally {
  readdir(path.resolve(__dirname, 'files')).then((data) =>
    data.map((item) => {
      copyFile(
        path.resolve(__dirname, 'files', item),
        path.resolve(newFolderPath, item)
      );
    })
  );
}})()

