const config = require('./../config/config.js')

const guestNotePathPrefix = '/app/notes/'
const path = require('path')

function getTargetPathInHost(targetPath) {
  // /app/notes/20220302/20220302.docx
  if (targetPath.startsWith(guestNotePathPrefix)) {
    targetPath = path.resolve(config.noteFolder, targetPath.slice(guestNotePathPrefix.length))
  } 
  return targetPath
}

module.exports = getTargetPathInHost