'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveScan = require('./utils/recursiveScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')

var program = require('commander')

program
  .version('0.1.0')
  .option('-p, --package [name]', 'Scan the specified package [name]')
  .option('-P, --packages [names]', 'Scan the specified packages [name1, name2, etc.]')
  .option('-w, --verbose', 'Print more details for each package scan')
  .parse(process.argv)



/**
 * Scan node_modules directory for vulnerabilities.
 */

function scan () {
  const packagesDir = 'node_modules'
  const allPackages = getPackages(packagesDir)
  const allPackagePaths = allPackages.map((packageName) => path.join(packagesDir, packageName))
  var packages
  var packagePaths


  // If package option is specified, only scan that particular package
  if (typeof program.package !== 'undefined') {
    packages = [program.package]
    packagePaths = [path.join(packagesDir, program.package)]

    // Check that package is installed
    try {
      fs.statSync(packagePaths[0]);
    } catch {
      console.log(packagePaths[0] + " is not installed")
      process.exit(2)
    }
  }



  //If packages option is specified (i.e. multiple packages, only scan those packages)
  else if (typeof program.packages !== 'undefined'){
    var inputs = program.packages
    // console.log(typeof inputs)
    var split_inputs = inputs.split(",")
    var num_requested_packages = split_inputs.length

    packages = []
    packagePaths = []
    for (var index=0; index<num_requested_packages; index++){
      split_inputs[index].replace(/^\s+|\s+$/g, '')
      packages.push(split_inputs[index])
      packagePaths.push(path.join(packagesDir, split_inputs[index]))
    }

    // Check that packages are installed
    for (index=0; index<num_requested_packages; index++){
      try {
        fs.statSync(packagePaths[index]);
      } catch {
        console.log(packagePaths[index] + " is not installed")
        process.exit(2)
      }
    }
  }

  else {
    packages = allPackages
    packagePaths = allPackagePaths
  }

  let i = 0
  let iMax = packagePaths.length
  let results = {}
  let yaraResults

  for (; i < iMax; i++) {
    results[packages[i]] = recursiveScan(packages[i], packagePaths[i], heuristics.node)
  }

  heuristics.yara.forEach(function (heuristic) {
    yaraResults = heuristic.run(null, packagesDir)
    yaraResults.forEach(function (yaraResult) {
      results[yaraResult.packageName].push(yaraResult)
    })
  })

  if (program.verbose) {
    console.log("yes verbose");
  }
  else {
    console.log("no verbose");
  }
  printResults(results, program.verbose)
  return results
}

/**
 * Module exports.
 */

module.exports = scan
