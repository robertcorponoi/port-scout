#!/usr/bin/env node

const scanner = require('../index');
const program = require('commander');
const pkg = require('../../package.json');

/**
 * Set the version to be pulled from the version key of the package.json so that it is always up to date with the
 * currently installed version of port.
 */
program.version(pkg.version);

/**
 * Flags that can be passed to port:
 * 
 * -w, --web                : Returns a common web server port that can be used, these are normally in the low 3000s or 8080s.
 * -r, --random             : Returns a random port that can be used at the time of calling this.
 * -a, --range <start,end>  : Returns the first available port between a start and end value.
 * -f, --force              : This can be used in conjunction with the random or range flag to override the default rule of not allowing a port between 1 - 1024 to be tested.
 * -v, --verbose            : Shows all logging output available while searching for an available port. (NOT YET AVAILABLE)
 */
program.option('-w, --web', 'Returns a common web server port that can be used, these are normally in the low 3000s or 8080s.');
program.option('-r, --random', 'Returns a random port that can be used at the time of calling this.');
program.option('-a, --range <start,end>', 'Returns the first available port between a start and end value.');
program.option('-f, --force', 'This can be used in conjunction with the random flag to override the default rule of not allowing a port between 1 - 1024 to be tested.', false);
// program.option('-v, --verbose', 'Shows all logging output available while searching for an available port.', false);

program.parse(process.argv);

let type = '';
let args = [];

/**
 * Set the type of scan to use and apply any additional arguments that may applyf or that scan.
 */
if (program.web) {

  type = 'web';

} else if (program.random) {

  type = 'random';

  if (program.force) args.push(true);

} else if (program.range) {

  type = 'range';

  const range = program.range.split(',');

  args = range;

}

/**
 * Finally run the scan and output the results to the console.
 */
const main = async () => {

  const port = await scanner(type, args);

  console.log(port);

};

main();