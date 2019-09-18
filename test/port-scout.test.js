'use strict'

const net = require('net');
const chai = require('chai');
const scanner = require('../dist/index');

const servers = [];

afterEach(async () => await clearPorts());

describe('Finding available web ports', () => {

  it('should find port 3000 as the first available web port', async () => {

    const port = await scanner.web();

    chai.expect(port).to.equal(3000);

  });

  it('should find port 3003 as the first available web port as 3000, 3001, and 3002 are taken by a test process', async () => {

    occupyPort(3000);
    occupyPort(3001);
    occupyPort(3002);

    const port = await scanner.web();

    clearPorts();

    chai.expect(port).to.equal(3003);

  });

});

describe('Finding available random ports', () => {

  it('should find an available random port', async () => {

    const port = await scanner.random();

    chai.expect(port).to.be.greaterThan(1024) && chai.expect(port).to.be.lessThan(65536);

  });

  it('should find an available random port without restrictions', async () => {

    const port = await scanner.random();

    chai.expect(port).to.be.greaterThan(0) && chai.expect(port).to.be.lessThan(65536);

  });

});

describe('Finding available ports in a range', () => {

  it('should find an available port between 4000 and 4010', async () => {

    const port = await scanner.range(4000, 4010);

    chai.expect(port).to.be.greaterThan(3999) && chai.expect(port).to.be.lessThan(4011);

  });

  it('should find an available port between 4000 and the default end of 65535', async () => {

    const port = await scanner.range(4000);

    chai.expect(port).to.be.greaterThan(3999) && chai.expect(port).to.be.lessThan(65536);

  });

});


/**
 * Makes a port unavailable for testing purposes.
 * 
 * @param {number} port The port that should become unavailable.
 */
async function occupyPort(port) {

  const server = net.createServer();

  servers.push(server);

  await server.listen(port);

}

/**
 * Clears all testing ports and makes them available again.
 */
async function clearPorts() {

  servers.map(async server => {

    await server.close();

  });

}