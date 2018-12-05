'use strict'

/**
 * Pretty prints the results.
 *
 * @param {array} results
 */
 
function printResults (results) {
  let totalVulns = 0
  let lowVulns = 0
  let medVulns = 0
  let highVulns = 0
  for (const packageName in results) {
    if (results[packageName].length !== 0) {
      let priorityStr
      let i = 0
      let packageVulns = results[packageName].length
      totalVulns += packageVulns

      console.log(`\n\x1b[31m${packageVulns}\x1b[0m vulnerabilit${packageVulns === 1 ? 'y' : 'ies'} found in ${packageName}\x1b[0m`)
      for (; i < packageVulns; i++) {
        if (results[packageName][i].priority === 1) {
          lowVulns++
          priorityStr = 'Low'
        } else if (results[packageName][i].priority === 2) {
          medVulns++
          priorityStr = '\x1b[33mMedium\x1b[0m'
        } else {
          highVulns++
          priorityStr = '\x1b[31mHigh\x1b[0m'
        }

        console.log(`\n\x1b[1m${priorityStr}\t\t\x1b[1m${results[packageName][i].name}\x1b[0m`)
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
  console.log(`\nFound ${vulnStr} vulnerabilit${totalVulns === 1 ? 'y' : 'ies'} (${lowVulns} low, ${medVulns} \x1b[33mmedium\x1b[0m, ${highVulns} \x1b[31mhigh\x1b[0m) in ${Object.keys(results).length} scanned packages.`)
}

/**
 * Module exports.
 */
 
module.exports = printResults