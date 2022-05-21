/* global process */

const fs = require('fs')
const path = require('path')

const textract = require('textract');

function watchFileChange(notePath) {
  let isReadyToChange = false
  return new Promise(async (resolve) => {
    //console.log('watch', notePath)
    let doCloseWatcher = false

    let newFilename
    const watcher = fs.watchFile(notePath, async (curr, prev) => {
      if (isReadyToChange === true) {
        return false
      }

      // 先確認檔案是否還開啟 
      // 20220302.docx
      // .~lock.20220302.docx#

      let filename = path.basename(notePath)
      let lockerFilename = `.~lock.${filename}#`
      //console.log('lockerFilename', lockerFilename)
      let lockerFilepath = path.resolve(path.dirname(notePath), lockerFilename)
      //await sleep(3000)
      isReadyToChange = true
      while (fs.existsSync(lockerFilepath)) {
        // 還在編輯中
        await sleep(50)
      }

      //console.log(`${noteFile} file Changed`);
      //fs.writeFileSync('/app/notes/test.txt', JSON.stringify([notePath, 'changed']), 'utf-8')

      newFilename = await parseFilenameFromFile(notePath)

      //fs.writeFileSync('/app/notes/test.txt', JSON.stringify([notePath, newFilename, 'changed']), 'utf-8')

      let dirname = path.dirname(notePath)

      if (notePath === path.resolve(dirname, newFilename + '.note' + path.extname(notePath))) {
        resolve(notePath)
        watcher.close()
        doCloseWatcher = true
        //process.exit()
        return false
      }

      console.log('before rename')
      fs.renameSync(notePath, path.resolve(dirname, newFilename + '.note' + path.extname(notePath)))
      console.log('after rename')

      let folderName = path.basename(dirname)
      if (path.basename(dirname).length === 8) {
        folderName = newFilename
        console.log('before rename folder')
        fs.renameSync(dirname, path.resolve(path.dirname(dirname), newFilename))
        console.log('after rename folder')
      }

      //process.exit()
      // https://stackoverflow.com/a/53983383/6645399
      
      resolve(path.resolve(path.dirname(dirname), folderName, newFilename + '.note' + path.extname(notePath)))
      newFilename = path.resolve(path.dirname(dirname), folderName, newFilename + '.note' + path.extname(notePath))
      doCloseWatcher = true
      //process.exit()
      watcher.close() // 必須在最後
      return false
    });
    
    // watcher timeout
    setTimeout(() => {
      if (newFilename.indexOf('.note') === -1) {
        newFilename = path.resolve(path.dirname(dirname), folderName, newFilename + '.note' + path.extname(notePath))
      }
      console.log(newFilename)
      resolve(newFilename)
      watcher.close()
    }, 30 * 3 * 1000)

    while (doCloseWatcher === false) {
      await sleep(1000)
    }
    if (newFilename.indexOf('.note') === -1) {
      newFilename = path.resolve(path.dirname(dirname), folderName, newFilename + '.note' + path.extname(notePath))
    }
    console.log(newFilename)
    resolve(newFilename)
    watcher.close()
    //process.exit()
  })
}

async function parseFilenameFromFile(notePath) {
  let basename = path.basename(notePath)
  if (basename.indexOf(' ') >= 8) {
    basename = basename.slice(0, 8).trim()
  }
  
  return new Promise((resolve) => {
    textract.fromFileWithPath(notePath, {
      preserveLineBreaks: true
    }, function( error, text ) {
      
      let data = text

      //fs.writeFileSync('/app/notes/test2.txt', JSON.stringify([notePath, data, 'changed']), 'utf-8')

      data = data.trim()

      let lines = data.split('\n')
      let line

      for (let i = 0; i < lines.length; i++) {
        line = lines[i].trim()
        if (line.startsWith(basename)) {
          if (notePath.endsWith('.xlsx') && line.indexOf(',') > 0) {
            line = line.slice(0, line.indexOf(','))
          }
          fs.writeFileSync('/app/notes/test4.txt', JSON.stringify([notePath, line, 'changed']), 'utf-8')
          resolve(line)
          return true
        }
      }
      
      line = lines[0].trim()
      if (notePath.endsWith('.xlsx') && line.indexOf(',') > 0) {
        line = line.slice(0, line.indexOf(','))
      }
      resolve(line)
    })
  })

}

function sleep(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = watchFileChange