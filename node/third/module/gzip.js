const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./README.md');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./README.md.gz');
readStream.pipe(zlibStream).pipe(writeStream);