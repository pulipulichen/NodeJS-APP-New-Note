/* global process */

const watchFileChange = require('./../watchFileChange.js')
const fs = require('fs')

async function watchNewNote() {
  let notePath = process.env.GUEST_NOTE_PATH
  console.log('watchNewNote', notePath)
  //fs.writeFileSync('/app/notes/test3.txt', 'ok', 'utf-8')
  let renameFile = await watchFileChange(notePath)
  
  console.log(`NOTE_RENAME=${renameFile}`)
  process.exit()
  //console.log(process.env.GUEST_NOTE_PATH)
}

watchNewNote()