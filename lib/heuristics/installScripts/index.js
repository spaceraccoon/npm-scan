'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Heuristic metadata.
 */

const name = 'installScripts'
const message = 'Package includes install scripts - you should verify them'
const reference = 'https://blog.usejournal.com/12-strange-things-that-can-happen-after-installing-an-npm-package-45de7fbf39f0'

/**
 * Scans the file for install scripts.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {object} Detected vulnerability for package.
 */

function run (packageName, filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  const packageManifest = JSON.parse(data)
  const installScripts = ['preinstall', 'install', 'postinstall', 'preuninstall', 'postuninstall', 'prepublish', 'preprepare', 'prepare', 'postprepare']
  let result = null

  if (packageManifest.scripts && Object.keys(packageManifest.scripts).some(script => installScripts.includes(script))) {
    result = {
      name,
      message,
      reference,
      packageName,
      filePath
    }
  }

  return result
}

/**
 * Module exports.
 */

module.exports = {
  name,
  message,
  reference,
  run
}
