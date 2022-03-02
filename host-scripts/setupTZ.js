/* global process */

var { DateTime } = require('luxon');

function setupTZ() {
  let d = DateTime.local();
  process.env['TZ'] = d.zoneName
}

module.exports = setupTZ