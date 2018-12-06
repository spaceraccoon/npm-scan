'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveScan = require('./utils/recursiveScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')
// const { PerformanceObserver, performance } = require('perf_hooks')

// const obs = new PerformanceObserver((items) => {
//   console.log(`${items.getEntries()[0].name} took ${items.getEntries()[0].duration}m`)
//   performance.clearMarks()
// })
// obs.observe({ entryTypes: ['measure'] })

/**
 * Scan node_modules directory for vulnerabilities.
 */

function scan () {
  // performance.mark('Start scan')

  const packagesDir = 'node_modules'

  const packages = getPackages(packagesDir)

  const packagePaths = packages.map((packageName) => path.join(packagesDir, packageName))

  let i = 0
  let iMax = packagePaths.length
  let results = {}

  for (; i < iMax; i++) {
    results[packages[i]] = recursiveScan(packages[i], packagePaths[i], heuristics)
  }
  printResults(results)
  // performance.mark('End scan')
  // performance.measure('Scan', 'Start scan', 'End scan')
}

/**
 * Module exports.
 */

module.exports = scan
