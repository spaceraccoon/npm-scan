'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')
const https = require('https')

/**
 * Heuristic metadata.
 */

const name = 'lastUpdated'
const message = 'Unusually long time between previous and current version'
const reference = 'https://snyk.io/blog/malicious-code-found-in-npm-package-event-stream/'

/**
 * Checks npmjs registry for time between previous and current version.
 *
 * @param {string} packageName
 * @param {string} filePath
 * @return {Promise} Promise that resolves to detectded vulnerability for package.
 */

function run (packageName, filePath) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(filePath, 'utf8')
    const packageManifest = JSON.parse(data)
    const currentVersion = packageManifest.version
    let result = null

    https.get(`https://registry.npmjs.org/${packageName}`, (response) => {
      if (response.status >= 400) {
        reject(new Error(`Request to ${response.url} failed with HTTP ${response.status}`))
      }

      var body = ''

      response.on('data', (chunk) => {
        body += chunk.toString()
      })

      response.on('end', () => {
        const packageInfo = JSON.parse(body)
        const versions = Object.keys(packageInfo.time)
        const previousVersion = versions[versions.indexOf(currentVersion) - 1]
        const currentVersionDate = new Date(packageInfo.time[currentVersion])
        const previousVersionDate = new Date(packageInfo.time[previousVersion])

        if (currentVersionDate - previousVersionDate > 63072000000) {
          result = {
            name,
            message,
            reference,
            packageName,
            filePath
          }
        }

        resolve(result)
      })
    })
  })
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
