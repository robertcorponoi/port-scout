'use strict'

/**
 * Returns a random integer between a minimum and maximum value.
 * 
 * @param {number} min The minimum integer that can be returned.
 * @param {number} max The maximum integer that can be returned.
 * 
 * @returns {number}
 */
export function randomInteger(min: number, max: number): number {

  return Math.floor(Math.random() * (max - min) + min);

}