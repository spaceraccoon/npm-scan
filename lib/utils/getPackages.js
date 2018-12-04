'use strict'
const fs = require('fs')

module.exports = function getPackages (packagesDir) {
  return fs.readdirSync(packagesDir)
}
