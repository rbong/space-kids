#!/usr/bin/env node

'use strict';

const path = require('path');
const childProcess = require('child_process');

const utils = require('./utils');
const filenames = require('./dataFilenames');

const binDir = path.join(__dirname, '../bin');
const dumpDir = path.join(__dirname, '../dump');

const soundDir = path.join(dumpDir, 'sounds/voc/');
utils.mkdir(soundDir);
utils.splitDataFile(
  path.join(binDir, 'SNDS.0'),
  i => path.join(soundDir, i + ' ' + filenames.sounds[i] + '.voc'));
utils.sh(path.join(__dirname, 'convertSounds.sh'));

const midiDir = path.join(dumpDir, 'midi/xmi/');
utils.mkdir(midiDir);
utils.splitDataFile(
  path.join(binDir, 'MIDI.0'),
  i => path.join(midiDir, 'space kids ' + i + '.xmi'));

const sfxDir = path.join(dumpDir, 'sfx/');
utils.mkdir(sfxDir);
utils.splitDataFile(
  path.join(binDir, 'SFXA.0'),
  i => path.join(sfxDir, 'space kids ' + i + '.sfx'));

const cellDir = path.join(dumpDir, 'cells/');
utils.mkdir(cellDir);
utils.splitDataFile(
  path.join(binDir, 'CELS1.0'),
  i => path.join(cellDir, 'space kids ' + i + '.cell'));

// const sceneDir = path.join(dumpDir, 'scenes/');
// utils.mkdir(sceneDir);
// utils.splitDataFile(
//   path.join(binDir, 'SCENES.0'),
//   i => path.join(sceneDir, 'space kids ' + i + '.scene'));
