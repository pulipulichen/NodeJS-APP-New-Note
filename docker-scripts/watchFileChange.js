/* global process */

const fs = require('fs')
const path = require('path')

const textract = require('textract');

function watchFileChange(notePath) {
  
  fs.watchFile(notePath, async (curr, prev) => {
    // 先確認檔案是否還開啟 
    // 20220302.docx
    // .~lock.20220302.docx#
    
    let filename = path.basename(notePath)
    let lockerFilename = `.~lock.${filename}#`
    let lockerFilepath = path.resolve(path.dirname(notePath), lockerFilename)
    
    if (fs.existsSync(lockerFilepath)) {
      // 還在編輯中
      return false
    }
    
    //console.log(`${noteFile} file Changed`);
    //fs.writeFileSync('/app/notes/test.txt', JSON.stringify([notePath, 'changed']), 'utf-8')
    
    let newFilename = await parseFilenameFromFile(notePath)
    
    //fs.writeFileSync('/app/notes/test.txt', JSON.stringify([notePath, newFilename, 'changed']), 'utf-8')
    
    let dirname = path.dirname(notePath)
    
    fs.renameSync(notePath, path.resolve(dirname, newFilename + path.extname(notePath)))
    
    if (path.basename(dirname).length === 8) {
      fs.renameSync(dirname, path.resolve(path.dirname(dirname), newFilename))
    }
    
    process.exit()
  });
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

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line.startsWith(basename)) {
          resolve(line)
          return true
        }
      }
      resolve(lines[0].trim())
    })
  })

}

module.exports = watchFileChange