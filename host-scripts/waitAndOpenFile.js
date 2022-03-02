const path = require('path')
const fs = require('fs')

const getFolder = require('./../docker-scripts/getFolder.js')
const getDateStirng = require('./../docker-scripts/getDateStirng.js')

const config = require('./../config/config.js')

const openFile = require('./openFile.js')
const openExplorer = require('./openExplorer.js')

async function waitAndOpenFile(template) {
  let folder = await getFolder()
  let notePath = await getNoteFile(folder, template)
  
  if (!notePath) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await waitAndOpenFile(template))
      }, 1000)
    })
  }
  
  openFile(notePath)
  openExplorer(path.dirname(notePath))
}

const getFilesInDirectory = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => (!dirent.isDirectory()))
    .map(dirent => dirent.name)

async function getNoteFile (folder, template) {
  let ext = path.extname(template)
  
  let defaultNotePath = path.resolve(folder, getDateStirng() + ext)
  if (fs.existsSync(defaultNotePath)) {
    return defaultNotePath
  }
  
  let files = await getFilesInDirectory(folder)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    if (file.endsWith(ext)) {
      return file
    }
  }
  return false
}

module.exports = waitAndOpenFile