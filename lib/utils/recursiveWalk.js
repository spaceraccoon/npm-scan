'use strict'
const fs = require('fs')
const path = require('path')

module.exports = function recursiveWalk(dir, scanFunc) {
  fs.readdir(dir, function(err, list) {
    if (err) {
      console.error(err)
    }

    let i = 0
    let iMax = list.length
    for (; i < iMax; i++) {
      let file = list[i]
      if (!file) return
      let filePath = path.join(dir, file)
      fs.stat(filePath, function(err, stat) {
        if (err) {
          console.error(err)
        }
        
        if (stat && stat.isDirectory()) {
          recursiveWalk(filePath, scanFunc);
        } else {
          scanFunc(filePath)
        }
      })
    }
  })
}