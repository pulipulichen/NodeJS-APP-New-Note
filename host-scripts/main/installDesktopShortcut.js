/* global __dirname */


const createDesktopShortcut = require('create-desktop-shortcuts');

const fs = require('fs')
const path = require('path')
const os = require('os')
const {getDesktopFolder, getHomeFolder} = require('platform-folders')

function main () {
  createShortcut('New Note', 'Add a new note', {
    windows: {
      filePath: path.resolve(__dirname, './../../bin/new-note.exe'),
      icon: path.resolve(__dirname, './../../img/notes.ico'),
    },
    linux: {
      filePath: path.resolve(__dirname, './../../bin/new-note.sh'),
      icon: path.resolve(__dirname, './../../img/notes.png'),
    },
  })
  
  createShortcut('New Sheet', 'Add a new sheet', {
    windows: {
      filePath: path.resolve(__dirname, './../../bin/new-sheet.exe'),
      icon: path.resolve(__dirname, './../../img/sheet.ico'),
    },
    linux: {
      filePath: path.resolve(__dirname, './../../bin/new-sheet.sh'),
      icon: path.resolve(__dirname, './../../img/sheet.png'),
    },
  })
  
  createShortcut('Note Opener', 'Open a note', {
//    windows: {
//      filePath: path.resolve(__dirname, './../../bin/new-note.exe'),
//      icon: path.resolve(__dirname, './../../img/notes.ico'),
//    },
    linux: {
      filePath: path.resolve(__dirname, './../../bin/note-opener.sh'),
      icon: path.resolve(__dirname, './../../img/notes.png'),
    },
  })
}

function createShortcut(name, comment, config) {
  if (os.platform() === 'linux') {
    let targetPath = path.resolve(getHomeFolder(), '.local/share/applications', name + ".desktop")
    if (fs.existsSync(targetPath)) {
      return false
    }
  }
  
  let baseConfig = {}
  
  if (config.windows) {
    baseConfig.windows = config.windows
    baseConfig.windows.name = name
    baseConfig.windows.comment = comment
  }
  if (config.linux) {
    baseConfig.linux = config.linux
    baseConfig.linux.name = name
    baseConfig.linux.comment = comment
    baseConfig.linux.type = 'Application'
  }
  
  //console.log(baseConfig)
  const shortcutsCreated = createDesktopShortcut(baseConfig);
  
  if (os.platform() === 'linux') {
    let desktopPath = path.resolve(getDesktopFolder(), name + ".desktop")
    
    // ~danny/.local/share/applications/newitem.desktop
    let targetPath = path.resolve(getHomeFolder(), '.local/share/applications', name + ".desktop")
    fs.renameSync(desktopPath, targetPath)
  }
  
  // ~danny/.local/share/applications/newitem.desktop

  if (shortcutsCreated) {
    console.log('Everything worked correctly!');
  } else {
    console.log('Could not create the icon or set its permissions (in Linux if "chmod" is set to true, or not set)');
  }
}

main()