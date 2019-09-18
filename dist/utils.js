'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a random integer between a minimum and maximum value.
 *
 * @param {number} min The minimum integer that can be returned.
 * @param {number} max The maximum integer that can be returned.
 *
 * @returns {number}
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randomInteger = randomInteger;
//# sourceMappingURL=utils.js.map