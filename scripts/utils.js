'use strict';

const fs = require('fs');
const childProcess = require('child_process');

function readDataFile(file) {
  return fs.readFileSync(file, 'hex').split('');
}

function writeDataFile(file, data) {
  return fs.writeFileSync(file, data.join(''), 'hex');
}

function sliceBytes(data, nBytes = 1, join = false) {
  let bytes = data.slice(Number(nBytes) * 2);
  return join ? bytes.join('') : bytes;
}

function shiftBytes(data, nBytes = 1, join = false) {
  let bytes = data.splice(0, Number(nBytes) * 2);
  return join ? bytes.join('') : bytes;
}

function shiftU8(data) {
  return Buffer.from(shiftBytes(data, 1, true), 'hex').readUInt8();
}

function shiftU16(data) {
  return Buffer.from(shiftBytes(data, 2, true), 'hex').readUInt16LE();
}

function shiftU24(data) {
  return Buffer.from(shiftBytes(data, 3, true) + '00', 'hex').readUInt32LE();
}

function shiftU32(data) {
  return Buffer.from(shiftBytes(data, 4, true), 'hex').readUInt32LE();
}

function splitDataFile(file, getName) {
  console.log('splitting', file);
  const originalData = readDataFile(file);
  let data = Array.from(originalData);

  const fatSize = shiftU16(data);
  const nFiles = fatSize / 4;
  const fat = [];
  for (let i = 0; i < nFiles; i++) {
    fat[i] = shiftU24(data);
    // Unknown value
    shiftU8(data);
  }

  for (let i = 0; i < nFiles; i++) {
    data = sliceBytes(originalData, fat[i]);
    const size = shiftU16(data);
    const chunk = shiftBytes(data, size);
    console.log('read', size, 'bytes starting from', '0x' + fat[i].toString(16));
    const name = getName(i);
    writeDataFile(name, chunk);
    console.log('wrote bytes to', name);
  }
  return nFiles;
}

function sh(cmd) {
  return childProcess.execSync(cmd, { stdio: 'inherit' });
}

function mkdir(dir) {
  return sh('mkdir -p "' + dir + '"');
}

module.exports = {
  readDataFile,
  writeDataFile,
  sliceBytes,
  shiftBytes,
  shiftU8,
  shiftU16,
  shiftU24,
  shiftU32,
  splitDataFile,
  sh,
  mkdir
};
