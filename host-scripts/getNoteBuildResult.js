function getNoteBuildResult (stdout) {
  let lines = stdout.trim().split('\n')
  let lastLine = lines[(lines.length - 1)].trim()
  
  let json = lastLine.slice(lastLine.indexOf('=') + 1)
  let result = JSON.parse(json)

  return result
}

module.exports = getNoteBuildResult
