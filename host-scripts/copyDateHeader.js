const ncp = require("copy-paste")
const path = require('path')

function copyDateHeader(hostPath) {
  let filename = path.basename(hostPath)
  if (filename.indexOf('.') > 0) {
    filename = filename.slice(0, filename.indexOf('.'))
  }
  
  ncp.copy(filename + ' ', function () { })
}

module.exports = copyDateHeader