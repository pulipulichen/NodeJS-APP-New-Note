const open = require('open')
const os = require('os')
const { exec } = require("child_process")
const fs = require('fs')

function getLinuxNotepadPath () {
  const candicates = [
    '/usr/bin/gedit',
    '/usr/bin/kate',
  ]
  
  for (let i = 0; i < candicates.length; i++) {
    let candicate = candicates[i]
    if (fs.existsSync(candicate)) {
      return candicate
    }
  }
}

async function openFile (filePath, editor) {
  
  if (editor === 'notepad') {
    if (os.platform() === 'win32') {
      //editor = "C:\\Windows\\System32\\notepad.exe"
      editor = "notepad.exe"
    }
    else if (os.platform() === 'linux') {
      let editorPath = getLinuxNotepadPath()
      
      if (editorPath) {
        editor = editorPath
      }
    }
  }
  
  if (filePath.startsWith('"') && filePath.endsWith('"')) {
    filePath = filePath.slice(1, -1)
  }
  
  if (!editor) {
    await open(filePath)
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

module.exports = openFile