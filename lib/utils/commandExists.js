'use strict'

/**
 * Module dependencies.
 */

var execSync = require('child_process').execSync

const isUsingWindows = process.platform === 'win32'

/**
 * Check if command exists on Unix.
 *
 * @param {string} command
 * @return {boolean}
 */

function commandExistsUnix (command) {
  try {
    var stdout = execSync('command -v ' + command +
      ' 2>/dev/null' +
      ' && { echo >&1 ' + command + '; exit 0; }'
    )
    return !!stdout
  } catch (error) {
    return false
  }
}

/**
 * Check if command exists on Windows.
 *
 * @param {string} command
 * @return {boolean}
 */

function commandExistsWindows (command) {
  try {
    var stdout = execSync('where ' + command, { stdio: [] })
    return !!stdout
  } catch (error) {
    return false
  }
}

/**
 * Check if command exists.
 *
 * @param {string} command
 * @return {boolean}
 */

function commandExists (command) {
  if (isUsingWindows) {
    return commandExistsWindows(command)
  } else {
    return commandExistsUnix(command)
  }
}

module.exports = commandExists
