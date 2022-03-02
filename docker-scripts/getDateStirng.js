const dayjs = require('dayjs')

function getDateStirng() {
  return dayjs().format('YYYYMMDD')
}

module.exports = getDateStirng