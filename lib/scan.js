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
  let results = {}
  
  for (; i < iMax; i++) {
    results[packages[i]] = recursiveWalk(packages[i], packagePaths[i], function(filePath) {
      if (Math.random() <= 0.1) {
        return {
          "filePath": filePath,
          "vulnerability": {
            "title": "VULNERABILITY"
          }
        }
      } else {
        return null
      }
    })
  }
  console.log(results)
}