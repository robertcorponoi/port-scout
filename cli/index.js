'use strict'

const scanner = require('../dist/index');

/**
 * Wraps the Port module so that the CLI can more easily work with it.
 * 
 * @param {string} type The type of port checking service to use (web, random, range, etc).
 * @param {Array<*>} args Any extra arguments passed to the type of service checking used.
 */
module.exports = async (type, args) => {

  const port = await scanner[type](...args);

  return port;

};