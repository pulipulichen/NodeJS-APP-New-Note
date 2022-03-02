const open = require('open')
const os = require('os')
const { exec } = require("child_process")
const fs = require('fs')

const openExplorerNPM = require('open-file-explorer')

function getLinuxExplorerPath () {
  const candicates = [
    '/usr/bin/dolphin',
  ]
  
  for (let i = 0; i < candicates.length; i++) {
    let candicate = candicates[i]
    if (fs.existsSync(candicate)) {
      return candicate
    }
  }
}

async function openExplorer (filePath) {
  if (!os.platform() === 'linux') {
    return openExplorerNPM(filePath)
  }
  
  if (filePath.startsWith('"') && filePath.endsWith('"')) {
    filePath = filePath.slice(1, -1)
  }
  
  let editor = getLinuxExplorerPath()
  
  if (!editor) {
    await openExplorerNPM(filePath)
  }
  else {
    let command = `${editor} "${filePath}"`
    
    return new Promise(resolve => {
      exec(command, (error, stdout, stderr) => {
        resolve()
      })
    })
  }
}

module.exports = openExplorer