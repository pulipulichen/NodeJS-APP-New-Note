/* global __dirname */

const path = require('path')
const fs = require('fs')

const getDateStirng = require('./getDateStirng.js')
//const ncp = require("copy-paste")

function copyTemplateToFolder(folder, template) {
  let basename = getDateStirng()
  
  let ext = path.extname(template)
  
  let templatePath = path.resolve(__dirname, './../note-template', template)
  let targetPath = path.resolve(folder, basename + ext)
  //console.log(notePath, fs.existsSync(notePath))
  
  //fs.writeFileSync('/app/notes/test.txt', JSON.stringify([templatePath, targetPath]), 'utf-8')
  
  let exists = fs.existsSync(targetPath)
  if (exists === false) {
    //let baseName = folderName
    //notePath = path.resolve(folderName, baseName + ext)
    
    //console.log(path.resolve(config.template), notePath)
    
    //copy(folderName + ' ')
    let stringToCopy = basename
    if (stringToCopy.indexOf(' ') === -1) {
      stringToCopy = stringToCopy + ' '
    }
    
    //ncp.copy(stringToCopy, function () { })
    fs.copyFileSync(templatePath, targetPath)
  }
  
  if (path.basename(path.dirname(targetPath)).length === 8) {
    exists = false
  }
  
  return {
    targetPath,
    exists
  }
}

module.exports = copyTemplateToFolder