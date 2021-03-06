const open = require('open')
const os = require('os')
const { exec } = require("child_process")
const fs = require('fs')
const config = require('./../config/config.js')

function getCandicatePath (type = 'note') {
  if (config.editor && config.editor[type]) {
    return config.editor[type]
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
  
  // 先檢查類型
  let type = 'note'
  if (filePath.endsWith('.xlsx') || 
      filePath.endsWith('.xls')) {
    type = 'sheet'
  }

  let editor = getCandicatePath(type)
  
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
