'use strict'

/**
 * Module dependencies.
 */

const path = require('path')
const getPackages = require('./utils/getPackages')
const recursiveScan = require('./utils/recursiveScan')
const printResults = require('./utils/printResults')
const heuristics = require('./heuristics')


var program = require('commander');

program
  .version('0.1.0')
  .option('-p, --package [name]', 'Scan the specified package [name]')
  .option('-P, --packages [names]', 'Scan the specified packages [name1, name2, etc.]')
  .parse(process.argv);

// console.log(program.package)
// if (typeof program.package == 'undefined'){
//   console.log("hello")
// }

/**
 * Scan node_modules directory for vulnerabilities.
 */

function scan () {
  const packagesDir = 'node_modules'
  const allPackages = getPackages(packagesDir)
  const allPackagePaths = allPackages.map((packageName) => path.join(packagesDir, packageName))
  var packages;
  var packagePaths;


  // If package option is specified, only scan that particular package
  if (typeof program.package != 'undefined'){
    packages = [program.package]
    packagePaths = [path.join(packagesDir, program.package)]
  }

  //If packages option is specified (i.e. multiple packages, only scan those packages)
  else if (typeof program.packages != 'undefined'){
    var inputs = program.packages
    // console.log(typeof inputs)
    var split_inputs = inputs.split(",")
    // console.log(split_inputs)

    packages = []
    packagePaths = []
    for (var index=0; index<split_inputs.length; index++){
      split_inputs[index].replace(/^\s+|\s+$/g, '')
      packages.push(split_inputs[index])
      packagePaths.push(path.join(packagesDir, split_inputs[index]))
    }
  }

  else {
    packages = allPackages
    packagePaths = allPackagePaths
  }

  // console.log(packagePaths)

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

  // console.log(results)

  printResults(results)
  return results
}

/**
 * Module exports.
 */

module.exports = scan
