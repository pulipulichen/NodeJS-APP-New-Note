/* global __dirname, process */

const { exec } = require("child_process")
const path = require('path')

process.chdir(path.resolve(__dirname, '../'))

const checkConfig = require('./checkConfig.js')
if (checkConfig() === false) {
  process.exit()
}

const config = require('./../config/config.js')
process.env['NOTES_PATH'] = config.noteFolder

//console.log(path.resolve(__dirname, '../'), 2)
exec(`MY_UID="$(id -u)" MY_GID="$(id -g)" docker-compose run app npm run note-docker-exec`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return false
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return false
    }
    console.log(`stdout: ${stdout}`);
});

//const waitAndOpenFile = require('./waitAndOpenFile.js')
//setTimeout(() => {
//  waitAndOpenFile('note-new.docx')
//}, 1000)