'use strict'
const fs = require('fs')
const path = require('path')

module.exports = function recursiveWalk(packageName, dir, scanFunc) {
  let results = []
  let fileList = fs.readdirSync(dir)
  
  let i = 0
  let iMax = fileList.length
  for (; i < iMax; i++) {
    let file = fileList[i]
    if (!file) return
    let filePath = path.join(dir, file)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(recursiveWalk(packageName, filePath, scanFunc));
    } else {
      let result = scanFunc(filePath)
      if (result) {
        results.push(result)
      }
    }
  }
  return results
}