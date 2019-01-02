# Space Kids

This repository contains tools for working with the files for the 1994 game "Space Kids".
Right now, it only contains scripts for ripping data from files included with the game.
Tools are planned that will make it possible to modify the game.

## Getting the Latest Dump

A dump of the current game files we're able to extract is available [here](https://github.com/rbong/space-kids/releases/tag/v0.0.0).

## Contributing

### Help Needed

We have a lot of issues that we need help with right now!
Even if you aren't a developer, if you think you can help, or even if you just have more information, please let us know.
You can let us know if you found something by [submitting an issue](https://github.com/rbong/space-kids/issues/new), and you can submit any code changes via [pull requests](https://help.github.com/articles/creating-a-pull-request/).
All the issues we need help with are listed below.

  - The names of the data dump files which contain character voices are named according to what is said or what sound is made in the file.
    It would be nice if they were named according to what character makes the sound and in what context (if any) the sound is used within the game.
    Additionally, the "MIDI" songs ripped from the game are named only according to what order they were originally placed in.
    Preferably the songs would be named according to the context in which they are used in the game, or if that does not apply, named more descriptively.
    If you have the time to help with this, the sounds are available in the [latest data dump](https://github.com/rbong/space-kids/releases/tag/v0.0.0) in the "sounds/wav" folder and the songs are in the "midi/wav" folder.
    You can [download the game here](https://github.com/rbong/space-kids/archive/master.zip) (available under "bin/") and use [DOSBox](https://www.dosbox.com/) to play it to discover where these sounds and songs come from.
    You could also view gameplay videos ([1](https://youtu.be/GqXl8nAMVkQ), [2](https://youtu.be/jgD-ELVHoVI)).
  - We don't know what the file formats used in the "cells", "scenes", or "sfx" files are at all or how to read them.
    These are contained in the "CELS1.0", "SCENES.0", and "SFXA.0" archive files, respectively
    Please see [this issue](https://github.com/rbong/space-kids/issues/2) for more details.
    If you believe you would be able to find out what these formats are after looking at them through research or experience, please read the issue and let us know what you find.
  - We don't have a complete understanding of the ".0" file format used by the game.
    This means that we can't currently rip all of the files or generate all of the files included with the game.
    For a complete understanding of this problem, please see [this issue](https://github.com/rbong/space-kids/issues/1).
    If you think you can figure out how this file format is structured by looking at its contents, please give it a read and help out if you can.
  - We don't have very nice tooling for ripping or generating the MIDI-like files contained within the game.
    We also do not have a way to create the ".AD" soundfont file.
    If you find a better way to rip or create these files than using MIDPAK through DOSBox, let us know.
  - Development tools are very Linux focused right now.
    I don't have a Windows machine.
    If you have a Windows machine and you can help us with cross-system compatibility, please help us out by pushing fixes for any problems you face.

### Helpful Resources

  - [DOS Game Modding Wiki](http://www.shikadi.net/moddingwiki/Main_Page)
  - [Video Game Music Preservation Foundation Wiki](http://www.vgmpf.com/Wiki/index.php)
  - [xxd](https://linux.die.net/man/1/xxd) is a program for snooping into binary files on Linux
  - [radare2](http://beta.rada.re/en/latest/) is a reversing software framework that can be used to help modify the game code.
    You can find more resources for working with radare2 at [awesome-radare2](https://github.com/dukebarman/awesome-radare2).
  - [DOSBox](https://www.dosbox.com/) is a program for running DOS programs
  - [Midpak](http://www.vgmpf.com/Wiki/index.php?title=Midpak) is a DOS program needed to play the MIDI-like files included with the game

If you know of more programs and references that could be helpful, please submit an [issue](https://github.com/rbong/space-kids/issues/new) or [pull request](https://help.github.com/articles/creating-a-pull-request/).

### Developer Scripts

**Ripping Data Files**

This will split some of the ".0" archive files included with the game.
You must have Linux and [Node](https://nodejs.org/) installed.
Files will be available in the "dump/" directory.

```bash
./scripts/dumpData.js
```
