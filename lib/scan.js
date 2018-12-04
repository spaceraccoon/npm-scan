'use strict'
const path = require('path')

const getPackages = require('./utils/getPackages')
const recursiveWalk = require('./utils/recursiveWalk')

module.exports = function scan () {
  const packagesDir = 'node_modules'

  const packages = getPackages(packagesDir)

  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))

  let i = 0
  let iMax = packagePaths.length
  
  for (; i < iMax; i++) {
    recursiveWalk(packagePaths[i], function(filePath) {
      console.log(`Scanning ${filePath}`)
    })
  }
}