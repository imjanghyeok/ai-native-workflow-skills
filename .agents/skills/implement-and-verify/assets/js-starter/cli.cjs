'use strict';
const fs = require('node:fs');
const { analyze } = require('./core.cjs');

function main(argv) {
  try {
    if (argv.length !== 1) throw new Error('usage: node cli.cjs INPUT.json');
    const text = fs.readFileSync(argv[0], 'utf8').replace(/^\uFEFF/, '');
    console.log(JSON.stringify(analyze(JSON.parse(text)), null, 2));
    return 0;
  } catch (error) {
    console.error(error.message);
    return 2;
  }
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));
module.exports = { main };
