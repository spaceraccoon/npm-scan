'use strict'

/**
 * Pretty prints the results.
 *
 * @param {array} results
 */

function printResults (results) {
  let totalVulns = 0

  for (const packageName in results) {
    if (results[packageName].length !== 0) {
      let i = 0
      let packageVulns = results[packageName].length
      totalVulns += packageVulns

      console.log(`\n\x1b[31m${packageVulns}\x1b[0m vulnerabilit${packageVulns === 1 ? 'y' : 'ies'} found in ${packageName}\x1b[0m`)
      for (; i < packageVulns; i++) {
        console.log(`Description\t${results[packageName][i].message}`.padStart(10))
        console.log(`More Info\t${results[packageName][i].reference}`)
        console.log(`Package\t\t${packageName}`)
        console.log(`File Path\t${results[packageName][i].filePath}`)
      }
    }
  }
  let vulnStr
  if (totalVulns === 0) {
    vulnStr = '0'
  } else if (totalVulns <= 10) {
    vulnStr = `\x1b[33m${totalVulns}\x1b[0m`
  } else {
    vulnStr = `\x1b[31m${totalVulns}\x1b[0m`
  }
  console.log(`\nFound ${vulnStr} vulnerabilit${totalVulns === 1 ? 'y' : 'ies'} in ${Object.keys(results).length} scanned packages.`)
}

/**
 * Module exports.
 */

module.exports = printResults
