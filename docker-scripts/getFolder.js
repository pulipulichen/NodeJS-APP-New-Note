const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

const config = require('./../config/config.js')
let noteFolder = config.noteFolder
if (fs.existsSync(noteFolder) === false) {
  noteFolder = '/app/notes'
}

// 1. get current date string
const getDateStirng = require('./getDateStirng.js')

//console.log(getDateStirng())
//fs.writeFileSync('/app/notes/test.txt', 'test', 'utf-8')

// 2. Create directory

const { promises: { readdir } } = require('fs')

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

async function getFolder() {
  let folderName = dayjs().format('YYYYMMDD')
  
  // 確認資料夾是否存在
  //if (fs.existsSync(folderPath) === false 
  //        || fs.lstatSync(folderPath).isDirectory() === false) {
  //  fs.mkdirSync(folderPath, { recursive: true })
  //}
  
  let folders = await getDirectories(noteFolder)
  
  //fs.writeFileSync('/app/notes/test.txt', JSON.stringify(folders), 'utf-8')
  //console.log(folders)
  
  for (let i = 0; i < folders.length; i++) {
    let folder = folders[i]
    
    if (folder.startsWith(folderName)) {
      return path.resolve(noteFolder, folder)
    }
  }
  
  let folderPath = path.resolve(noteFolder, folderName)
  fs.mkdirSync(folderPath, { recursive: true })
  return folderPath
}

module.exports = getFolder