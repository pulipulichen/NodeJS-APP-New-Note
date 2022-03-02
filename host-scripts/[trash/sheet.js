/* global process */

const fs = require('fs')
const path = require('path')
const { exec } = require("child_process")

const openFile = require('./openFile.js')
const tempDirectory = require('temp-dir')
const openExplorer = require('open-file-explorer')

let isConfigExists = true
if (fs.existsSync(path.resolve('./config.js')) === false) {
  let warningFile = path.resolve(tempDirectory, 'nodejs-app-new-note-error.txt')

  //if (fs.existsSync(warningFile) === false) {
  fs.writeFileSync(warningFile, 'Please create config.js from config.example.js')
  //}

  console.log(warningFile)
  openFile(warningFile, 'notepad')
  openExplorer(path.resolve('./'))
  //process.exit()
  isConfigExists = false
}

let config

const dayjs = require('dayjs')

const ncp = require("copy-paste")

async function main() {
  if (isConfigExists === false) {
    return false
  }
  
  config = require('./config.js')
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

  await openFile(warningFile)
}

async function createNewNote () {
  let folderName = dayjs().format('YYYYMMDD')
  let folderPath = path.resolve(config.noteFolder, folderName)
  
  // 確認資料夾是否存在
  if (fs.existsSync(folderPath) === false 
          || fs.lstatSync(folderPath).isDirectory() === false) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
  
  let ext = path.extname(config.template.sheet)
  
  let notePath = path.resolve(folderPath, folderName + ext)
  //console.log(notePath, fs.existsSync(notePath))
  if (fs.existsSync(notePath) === false) {
    //let baseName = folderName
    //notePath = path.resolve(folderName, baseName + ext)
    
    //console.log(path.resolve(config.template), notePath)
    
    //copy(folderName + ' ')
    ncp.copy(folderName + ' ', function () { })

    fs.copyFileSync(path.resolve(config.template.sheet), notePath)
  }
  
  openExplorer(folderPath, () => {})
  //console.log('open', notePath)
  if (!config.editor) {
    await openFile(notePath)
  }
  else {
    exec(`"${config.editor}" "${notePath}"`, (error, stdout, stderr) => {})
  }
}

main()