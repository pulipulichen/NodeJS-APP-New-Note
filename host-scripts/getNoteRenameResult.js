function getNoteRenameResult (stdout) {
  let lines = stdout.trim().split('\n')
  let lastLine = lines[(lines.length - 1)].trim()
  
  let json = lastLine.slice(lastLine.indexOf('=') + 1)
  return json
}

module.exports = getNoteRenameResult