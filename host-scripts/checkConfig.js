const fs = require('fs')
const path = require('path')

const openFile = require('./openFile.js')
const openExplorer = require('./openExplorer.js')
const tempDirectory = require('temp-dir')
//const openExplorer = require('open-file-explorer')

function checkConfig() {
  let isConfigExists = true
  if (fs.existsSync(path.resolve(__dirname, './../config/config.js')) === false) {
    let warningFile = path.resolve(tempDirectory, 'nodejs-app-new-note-error.txt')

    if (fs.existsSync(warningFile) === false) {
      fs.writeFileSync(warningFile, 'Please create config.js from config.example.js')
    }

    //console.log(warningFile)
    
    //console.log(path.resolve(__dirname, './../'))
    openExplorer(path.resolve(__dirname, './../'))
    
    openFile(warningFile, 'notepad')
    
    //openExplorer('/tmp', () => {})
    
    //process.exit()
    isConfigExists = false
  }
  return isConfigExists
}

module.exports = checkConfig