const open = require('open')
const os = require('os')
const { exec } = require("child_process")
const fs = require('fs')
const config = require('./../config/config.js')

function getCandicatePath () {
  if (config.editor && config.editor.note) {
    return config.editor.note
  }

  const candicates = [
    '/usr/bin/wps',
  ]
  
  for (let i = 0; i < candicates.length; i++) {
    let candicate = candicates[i]
    if (fs.existsSync(candicate)) {
      return candicate
    }
  }
}

async function openWithOffice (filePath) {
  if (filePath.startsWith('"') && filePath.endsWith('"')) {
    filePath = filePath.slice(1, -1)
  }
  
  let editor = getCandicatePath()
  
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

module.exports = openWithOffice
