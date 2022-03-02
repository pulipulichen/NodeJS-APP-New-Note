/* global __dirname, process */

const { exec } = require("child_process")
const path = require('path')

process.chdir(path.resolve(__dirname, '../'))

const checkConfig = require('./../checkConfig.js')
if (checkConfig() === false) {
  process.exit()
}

const config = require('./../../config/config.js')
process.env['NOTES_PATH'] = config.noteFolder

const getNoteBuildResult = require('./../getNoteBuildResult.js')
const getNoteRenameResult = require('./../getNoteRenameResult.js')
const getTargetPathInHost = require('./../getTargetPathInHost.js')
const copyDateHeader = require('./../copyDateHeader.js')

const openFile = require('./../openFile.js')
const openExplorer = require('./../openExplorer.js')

//console.log(path.resolve(__dirname, '../'), 2)
exec(`MY_UID="$(id -u)" MY_GID="$(id -g)" docker-compose run app npm run docker-sheet-build`, (error, stdout, stderr) => {
  console.log(stdout)
  
  // 直接取得最後一行
  let {targetPath} = getNoteBuildResult(stdout)
  
  let hostPath = getTargetPathInHost(targetPath)
  //console.log(1)
  
  openFile(hostPath)
  //console.log(2)
  openExplorer(path.dirname(hostPath))
});



//const waitAndOpenFile = require('./waitAndOpenFile.js')
//setTimeout(() => {
//  waitAndOpenFile('note-new.docx')
//}, 1000)