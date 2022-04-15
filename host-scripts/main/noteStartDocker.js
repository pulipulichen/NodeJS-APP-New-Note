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

const setupTZ = require('./../setupTZ.js')
setupTZ()

const getNoteBuildResult = require('./../getNoteBuildResult.js')
const getNoteRenameResult = require('./../getNoteRenameResult.js')
const getTargetPathInHost = require('./../getTargetPathInHost.js')
const copyDateHeader = require('./../copyDateHeader.js')

const openFile = require('./../openFile.js')
const openExplorer = require('./../openExplorer.js')
const fs = require('fs')

//console.log(path.resolve(__dirname, '../'), 2)

let cmd1 = `MY_UID="$(id -u)" MY_GID="$(id -g)" docker-compose run app npm run docker-note-build`

exec(cmd1, (error, stdout, stderr) => {
  console.log('After docker-note-build')
  console.log(stdout)
  
  // 直接取得最後一行
  let {targetPath, exists} = getNoteBuildResult(stdout)
  
  let hostPath = getTargetPathInHost(targetPath)
  //console.log(1)
  
  //openExplorer(path.dirname(hostPath))
  
  //console.log(hostPath, path.dirname(hostPath), exists)
  
  if (!exists && config.enableRenameWatch) {  
    copyDateHeader(hostPath)
    
    process.env['GUEST_NOTE_PATH'] = targetPath
    
    let cmd2 = `MY_UID="$(id -u)" MY_GID="$(id -g)" docker-compose run app npm run docker-note-watch`
    console.log('docker-note-watch', cmd2)

    exec(cmd2, (error, stdout, stderr) => {
      //console.log('555不存在，開始watch')
      console.log('After watch', targetPath)
      
      //console.log(error, stderr, stdout)
      let guestRenamePath = getNoteRenameResult(stdout)
      let hostRenamePath = getTargetPathInHost(guestRenamePath)
      
      if (fs.existsSync(hostRenamePath) === false) {
        process.exit()
        return false
      }
       
      openFile(hostRenamePath)
      openExplorer(path.dirname(hostRenamePath))
      
      setTimeout(() => {
        process.exit()
      }, 3000)
    })
    
    openFile(hostPath)
    //console.log("After open file:" , hostPath)
  }
  else {
    openExplorer(path.dirname(hostPath))
  }
  
  //console.log('完成')
});



//const waitAndOpenFile = require('./waitAndOpenFile.js')
//setTimeout(() => {
//  waitAndOpenFile('note-new.docx')
//}, 1000)
