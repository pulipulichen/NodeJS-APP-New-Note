const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

const getFolder = require('./../getFolder.js')
const copyTemplateToFolder = require('./../copyTemplateToFolder.js')
const watchFileChange = require('./../watchFileChange.js')

async function main() {
  let folder = await getFolder()
  let noteFile = copyTemplateToFolder(folder, 'note-new.docx')
  
  if (noteFile) {
    watchFileChange(noteFile)
  }
  
}

main()