'use strict'

import * as net from 'net';
// @ts-ignore
import Stepper from 'num-step';
import { randomInteger } from './utils';

/**
 * Finds the first available port that should be used based on conditions specified by the user.
 */
module.exports = {

  /**
   * Checks common web ports to see what is available.
   * 
   * @async
   * 
   * @returns {number} Returns the first available web port.
   */
  async web(): Promise<number> {

    const stepper = new Stepper([3000, 8000, 8080]);

    let port: number = 3000;

    let amountToStep: number = 1;

    let success: boolean = false;

    while (!success) {

      try {

        success = await checkPort(port);

        return port;

      } catch (err) {

        amountToStep++;

        port = stepper.step(amountToStep);

      }

    }

  },

  /**
   * Tries random ports and returns the first available one.
   * 
   * @async
   * 
   * @param {boolean} [allowRestricted=false] If set to true, this will allow ports under 1024 to be tried.
   * 
   * @returns {number} Returns the first available random port.
   */
  async random(allowRestricted: boolean = false): Promise<number> {

    const min = allowRestricted ? 1 : 1025;
    const max = 65535;

    let port = randomInteger(min, max);

    let success: boolean = false;

    while (!success) {

      try {

        success = await checkPort(port);

        return port;

      } catch (err) {

        port = randomInteger(min, max);


      }

    }

    return port;

  },

  /**
   * Checks a provided range of ports for an available port.
   * 
   * @async
   * 
   * @param {number} start The start of the range of ports to check.
   * @param {number} [end=65535] The end of the range of ports to check.
   * 
   * @returns {number} Returns the first available port in the provided range.
   */
  async range(start: number, end: number = 65535): Promise<number> {

    let port: number = start;

    let success: boolean = false;

    while (!success) {

      try {

        success = await checkPort(port);

        if (port > end) throw new Error('Unable to find an available port in the specified range');

        return port;

      } catch (err) {

        port++;


      }

    }

    return port;

  },

}

/**
 * Checks to see what the first available port is according to the specified options.
 * 
 * @async
 * @private
 * 
 * @param {number} port The port number to check if available or not.
 * 
 * @returns {boolean}
 */
function checkPort(port: number): Promise < boolean > {

  return new Promise((resolve, reject) => {

    const server = net.createServer();

    server.once('error', (err: any) => {

      if (err.code === 'EADDRINUSE') reject(err);

    });

    server.once('listening', () => {

      server.close();

      resolve(true);

    });

    server.listen(port);

  });

}