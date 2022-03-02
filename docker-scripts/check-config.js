function checkConfig() {
  let isConfigExists = true
  if (fs.existsSync(path.resolve('./config.js')) === false) {
    let warningFile = path.resolve(tempDirectory, 'nodejs-app-new-note-error.txt')

    //if (fs.existsSync(warningFile) === false) {
    fs.writeFileSync(warningFile, 'Please create config.js from config.example.js')
    //}

    console.log(warningFile)
    openFile(warningFile, 'notepad')
    openExplorer(path.resolve('./'))
    //process.exit()
    isConfigExists = false
  }
  return isConfigExists
}

module.exports = checkConfig