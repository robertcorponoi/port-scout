'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
// @ts-ignore
const num_step_1 = __importDefault(require("num-step"));
const utils_1 = require("./utils");
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
    web() {
        return __awaiter(this, void 0, void 0, function* () {
            const stepper = new num_step_1.default([3000, 8000, 8080]);
            let port = 3000;
            let amountToStep = 1;
            let success = false;
            while (!success) {
                try {
                    success = yield checkPort(port);
                    return port;
                }
                catch (err) {
                    amountToStep++;
                    port = stepper.step(amountToStep);
                }
            }
        });
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
    random(allowRestricted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const min = allowRestricted ? 1 : 1025;
            const max = 65535;
            let port = utils_1.randomInteger(min, max);
            let success = false;
            while (!success) {
                try {
                    success = yield checkPort(port);
                    return port;
                }
                catch (err) {
                    port = utils_1.randomInteger(min, max);
                }
            }
            return port;
        });
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
    range(start, end = 65535) {
        return __awaiter(this, void 0, void 0, function* () {
            let port = start;
            let success = false;
            while (!success) {
                try {
                    success = yield checkPort(port);
                    if (port > end)
                        throw new Error('Unable to find an available port in the specified range');
                    return port;
                }
                catch (err) {
                    port++;
                }
            }
            return port;
        });
    },
};
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
function checkPort(port) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE')
                reject(err);
        });
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        server.listen(port);
    });
}
//# sourceMappingURL=index.js.map