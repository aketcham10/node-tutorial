const fs = require('fs');

const readStream = fs.createReadStream('./docs/large.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/large-copy.txt');

// readStream.on('data', (chunk) => {
//     console.log('----- NEW CHUNK -----');
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// })

readStream.pipe(writeStream);