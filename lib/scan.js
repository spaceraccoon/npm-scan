'use strict'
const path = require('path')

const getPackages = require('./utils/getPackages')
const recursiveWalk = require('./utils/recursiveWalk')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')

module.exports = function scan () {
  const packagesDir = 'node_modules'

  const packages = getPackages(packagesDir)

  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))

  let i = 0
  let iMax = packagePaths.length
  let results = {}

  for (; i < iMax; i++) {
    results[packages[i]] = recursiveWalk(packages[i], packagePaths[i], function (packagename, filePath) {
      return heuristics.reduce(function (result, heuristic) {
        result = result.concat(heuristic.run(packagename, filePath))
        return result
      }, [])
    })
  }
  printResults(results)
}
