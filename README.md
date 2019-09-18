<div align="center">

# Port Scout

Port Scout is an easy way to get available ports with different needs.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/port-scout.svg?style=flat)](https://www.npmjs.com/package/port-scout)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/port-scout/badge.svg)](https://snyk.io/test/github/robertcorponoi/port-scout)
[![NPM downloads](https://img.shields.io/npm/dm/port-scout.svg?style=flat)](https://www.npmjs.com/package/port-scout)
<a href="https://badge.fury.io/js/port-scout"><img src="https://img.shields.io/github/issues/robertcorponoi/port-scout.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/port-scout"><img src="https://img.shields.io/github/license/robertcorponoi/port-scout.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

## **Table of contents**

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [CLI Usage](#cli-usage)

## **Install**

To install port-scout to use in your project locally, you can use:

```bash
$ npm install port-scout
```

If you plan on using port-scout as a CLI utility, you can install it globally to have access to the `port-scout` command anywhere:

```bash
$ npm install -g port-scout
```

## **Usage**

Port Scout is exported as a series of functions so you can just require the `port-scout` module and use the method you desire to retrieve the port you want.

**Note** All port scouting methods are async and so will have to be wrapped in an async function call.

```js
const scouter = require('port-scout');

async function main() {

  const webPort = await scouter.web();

}

main();
```

## **API**

### **web**

Checks common web ports to see what port is available and returns it.

**Example**

```js
async function main() {

  const webPort = await scouter.web();

}

main();
```

### **random**

Tries random ports and returns the first available one. Ports 1-1024 are automatically avoided unless specified.

| param           	| type    	| description                                               	| default 	|
|-----------------	|---------	|-----------------------------------------------------------	|---------	|
| allowRestricted 	| boolean 	| If set to true, this will allow ports 1-1024 to be tried. 	| false   	|

**Example**

```js
async function main() {

  const randomPort = await scouter.random();

}

main();
```

### **range**

Checks a provided range of ports for the first available port and returns it.

| param 	| type   	| description                              	| default 	|
|-------	|--------	|------------------------------------------	|---------	|
| start 	| number 	| The start of the range of ports to check 	|         	|
| end   	| number 	| The end of the range of ports to check   	| 65535   	|

**Example**

```js
async function main() {

  const rangePort = await scouter.range(3050, 3075);

}

main();
```

## **CLI Usage**

Port can be used as a command line utility to retrieve an available port using one of its various methods and print it to the console like so:

```bash
$ port=scout -w
```

The customize the way ports are retrieved you can use a combination of the flags below:

```
-w, --web                : Returns a common web server port that can be used, these are normally in the low 3000s or 8080s.
-r, --random             : Returns a random port that can be used at the time of calling this.
-a, --range <start,end>  : Returns the first available port between a start and end value.
-f, --force              : This can be used in conjunction with the random or range flag to override the default rule of not allowing a port between 1 - 1024 to be tested.
```

**Example**

For example, if you would like to get the first available port between 3050 and 3075 you can use:

```bash
$ port-scout -r 3050,3075
```