'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')

/**
 * Get name and version of packages.
 *
 * @param {string} packagesDir
 * @return {array}
 */

function getPackages (packagesDir) {
  const packageDirs = fs.readdirSync(packagesDir)
    .filter(packageDir => fs.lstatSync(path.join(packagesDir, packageDir)).isDirectory() && packageDir !== '.bin')
    .map((packageName) => path.join(packagesDir, packageName))

  let monoDirs = []
  packageDirs
    .filter(monoDir => monoDir.includes('/@'))
    .forEach(monoDir => {
      const dirs = fs.readdirSync(monoDir)
        .filter(dir => fs.lstatSync(path.join(monoDir, dir)).isDirectory() && dir !== '.bin')
        .map(dir => path.join(monoDir, dir))
      monoDirs = monoDirs.concat(dirs);
    })

  const packagesInfo = packageDirs
    .filter(packageDir => !packageDir.includes('/@'))
    .concat(monoDirs)
    .map(packageDir => {
      const manifestPath = path.join(packageDir, 'package.json')
      const data = fs.readFileSync(manifestPath, 'utf8')
      const packageManifest = JSON.parse(data)

      return {
        name: packageManifest.name,
        version: packageManifest.version,
        path: packageDir
      }
    })

  return packagesInfo
}

/**
 * Module exports.
 */

module.exports = getPackages
