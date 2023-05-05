const path = require('node:path');
const { stdout } = require('node:process');
const { readdir, stat } = require('node:fs/promises');
const folder = path.resolve(__dirname, 'secret-folder');

const readSize = async (folderPath, file) =>
  stat(path.resolve(folderPath,file), (err, stats) => {
    if (err) {
      console.log(err);
      return;
    }
   return stats; 
  });

readdir(folder, { withFileTypes: true })
  .then((data) => data.filter((item) => item.isFile()))
  .then((data) => data.map((item) => item.name))
  .then((data) => data.map(async item => {
    const x = await readSize(folder, item)
    stdout.write(`${item.split('.')[0]}-${path.extname(item).slice(1)}-${Math.round(x.size/1024)}kb\n`);
  }))
  .catch((err) => stdout.write(err.massage));
