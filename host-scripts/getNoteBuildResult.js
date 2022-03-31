function getNoteBuildResult (stdout) {
  let lines = stdout.trim().split('\n')
  let lastLine = lines[(lines.length - 1)].trim()
  
  let json = lastLine.slice(lastLine.indexOf('=') + 1)
  try {
    return JSON.parse(json)
  }
  catch (e) {
    console.error('Docker error.')
  }
}

module.exports = getNoteBuildResult
