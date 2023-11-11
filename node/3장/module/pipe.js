const fs = require('fs');

const readStream = fs.createReadStream('./README.md');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);