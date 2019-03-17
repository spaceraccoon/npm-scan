'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')

/**
 * Outputs the results to JSON file.
 *
 * @param {object} results
 */

function writeResults (results, filePath) {
  // only write if suspicious items are found
  if (Object.values(results).flat().length !== 0) {
    let output = {
      results
    }

    fs.writeFileSync(filePath, JSON.stringify(output, null, 4), 'utf8')
  }
}

/**
 * Module exports.
 */

module.exports = writeResults
