const getArgv = require('./../cli/getArgv.js')
const openFile = require('./../openFile.js')

const openWithLibreOffice = require('./../openWithLibreOffice.js')
const openWithOffice = require('./../openWithOffice.js')

function openNote() {
  getArgv().forEach(filePath => {
    if (filePath.endsWith('.note.docx') || 
        filePath.endsWith('.note.xlsx')) {
      return openWithLibreOffice(filePath)
    }
    else {
      return openWithOffice(filePath)
    }
  })
}

openNote()