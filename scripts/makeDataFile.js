#!/usr/bin/env node

'use strict';

const utils = require('./utils');

if (process.argv.length < 4) {
  console.error('Usage: ./makeDataFile output ...files');
  process.exit(1);
}

const output = process.argv[2];
const files = process.argv.slice(3);

utils.makeDataFile(output, files);
