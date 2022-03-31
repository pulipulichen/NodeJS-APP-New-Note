const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

const getFolder = require('./../getFolder.js')
const copyTemplateToFolder = require('./../copyTemplateToFolder.js')
const watchFileChange = require('./../watchFileChange.js')
const config = require('./../../config/config.js')

async function main() {
  let folder = await getFolder()

  let templatePath = path.resolve(config.template.sheet)
  let {targetPath, exists} = copyTemplateToFolder(folder, templatePath)
  
  //if (noteFile) {
  //  watchFileChange(noteFile)
  //}
  console.log(`NOTE_BUILD_RESULT=${JSON.stringify({targetPath, exists})}`)
}

main()
