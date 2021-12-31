const open = require('open')
const os = require('os')
const { exec } = require("child_process")

async function openFile (filePath, editor) {
  
  if (editor === 'notepad') {
    if (os.platform() === 'win32') {
      //editor = "C:\\Windows\\System32\\notepad.exe"
      editor = "notepad.exe"
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
    console.log(command)
    return new Promise(resolve => {
      exec(command, (error, stdout, stderr) => {
        resolve()
      })
    })
    
  }
}

module.exports = openFile