const dayjs = require('dayjs')

function getDateStirng() {
  //return dayjs().format('YYYYMMDD')
  console.log(dayjs().format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'))
}

getDateStirng()