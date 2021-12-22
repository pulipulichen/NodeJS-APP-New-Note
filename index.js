/* global process */

const config = require('./config.js')

const tempDirectory = require('temp-dir')
const open = require('open')
const dayjs = require('dayjs')

const fs = require('fs')
const path = require('path')

const ncp = require("copy-paste")
const openExplorer = require('open-file-explorer')

async function main() {
  //console.log(config.noteFolder, fs.lstatSync(config.noteFolder))
  if (!config.noteFolder) {
    //console.log('error')
    await openErrorMessage()
    return false
  }

  createNewNote()
  //console.log('Hello world.', config.noteFolder)
}

async function openErrorMessage() {
  let warningFile = path.resolve(tempDirectory, 'nodejs-app-new-note-error.txt')

  //if (fs.existsSync(warningFile) === false) {
  fs.writeFileSync(warningFile, 'config.js noteFolder error: ' + config.noteFolder)
  //}

  //console.log(warningFile)

  await open(warningFile)
}

async function createNewNote () {
  let folderName = dayjs().format('YYYYMMDD')
  let folderPath = path.resolve(config.noteFolder, folderName)
  
  // 確認資料夾是否存在
  if (fs.existsSync(folderPath) === false 
          || fs.lstatSync(folderPath).isDirectory() === false) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  
  let ext = path.extname(config.template)
  
  let notePath = path.resolve(folderPath, folderName + ext)
  //console.log(notePath, fs.existsSync(notePath))
  if (fs.existsSync(notePath) === false) {
    //let baseName = folderName
    //notePath = path.resolve(folderName, baseName + ext)
    
    //console.log(path.resolve(config.template), notePath)
    fs.copyFileSync(path.resolve(config.template), notePath)
  }
  
  //copy(folderName + ' ')
  ncp.copy(folderName + ' ', function () { })
  
  openExplorer(folderPath, () => {})
  await open(notePath)
}

main()