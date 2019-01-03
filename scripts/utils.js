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
  let bytes = data.slice(Number(nBytes));
  return join ? bytes.join('') : bytes;
}

function shiftBytes(data, nBytes = 1, join = false) {
  let bytes = data.splice(0, Number(nBytes));
  return join ? bytes.join('') : bytes;
}

function shiftU16(data) {
  return Buffer.from(shiftBytes(data, 2, true), 'hex').readUInt8();
}

function shiftU32(data) {
  return Buffer.from(shiftBytes(data, 4, true), 'hex').readUInt16LE();
}

function shiftU48(data) {
  return Buffer.from(shiftBytes(data, 6, true) + '00', 'hex').readUInt32LE();
}

function shiftU64(data) {
  return Buffer.from(shiftBytes(data, 8, true), 'hex').readUInt32LE();
}

function toUInt(value, bytes = 1) {
  const be = Number(value).toString(16).padStart(bytes, '0').split('');
  if (be.length > bytes) {
    throw new Error('UInt out of range');
  }
  let le = '';
  while (be.length) {
    le = be.splice(0, 2).join('') + le;
  }
  return le;
}

function toU16(value) {
  return toUInt(value, 2);
}

function toU32(value) {
  return toUInt(value, 4);
}

function toU48(value) {
  return toUInt(value, 6);
}

function toU64(value) {
  return toUInt(value, 8);
}

function splitDataFile(file, getName) {
  console.log('splitting', file);
  const originalData = readDataFile(file);
  let data = Array.from(originalData);

  const fatSize = shiftU32(data);
  const nFiles = fatSize / 4;
  const fat = [];
  for (let i = 0; i < nFiles; i++) {
    fat[i] = shiftU48(data);
    // Unknown value
    shiftU16(data);
  }

  for (let i = 0; i < nFiles; i++) {
    data = sliceBytes(originalData, fat[i]);
    const size = shiftU32(data);
    const chunk = shiftBytes(data, size);
    console.log('read', size, 'bytes starting from', '0x' + fat[i].toString(16));
    const name = getName(i);
    writeDataFile(name, chunk);
    console.log('wrote bytes to', name);
  }
  return nFiles;
}

function makeDataFile(output, files) {
  const headerSize = files.length * 4;

  let fat = toU32(headerSize);
  let fileOffset = headerSize + 2;
  let fileData = '';
  files.forEach((file) => {
    console.info('packing', file);
    // Last two bytes of each file entry are unknown
    fat += toU48(fileOffset) + '00';
    const data = fs.readFileSync(file, 'hex');
    const size = data.length / 2;

    fileData += toU32(size);
    fileData += data;
    fileOffset += 2 + size;
    console.log('read', size, 'bytes');
  });

  console.info('writing data file', output);

  return fs.writeFileSync(output, fat + fileData, 'hex');
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
  shiftU16,
  shiftU32,
  shiftU48,
  shiftU64,
  toUInt,
  toU16,
  toU32,
  toU48,
  toU64,
  splitDataFile,
  makeDataFile,
  sh,
  mkdir
};
