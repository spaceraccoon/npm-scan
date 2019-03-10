'use strict'

/**
 * Pretty prints the results.
 *
 * @param {array} results
 */

function printResults (results, verbose) {
  const resultsLength = results.length

  for (let i = 0; i < resultsLength; i++) {
    console.log(`Package\t\t${results[i].packageName}`)
    console.log(`Description\t${results[i].message}`.padStart(10))
    if (verbose) {
      console.log(`More Info\t${results[i].reference}`)
    }
    console.log(`File Path\t${results[i].filePath}\n`)
  }

  let vulnStr
  if (resultsLength === 0) {
    vulnStr = '0'
  } else if (resultsLength <= 10) {
    vulnStr = `\x1b[33m${resultsLength}\x1b[0m`
  } else {
    vulnStr = `\x1b[31m${resultsLength}\x1b[0m`
  }
  console.log(`\nFound ${vulnStr} suspicious item${resultsLength === 1 ? '' : 's'}.`)
}

/**
 * Module exports.
 */

module.exports = printResults
