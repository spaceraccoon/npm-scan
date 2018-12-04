'use strict'
const fs = require('fs')

const name = 'JSFuck'
const message = 'JSFuck code obfuscation'
const priority = 3
const reference = 'https://blog.checkpoint.com/2016/02/02/ebay-platform-exposed-to-severe-vulnerability/'

const threshold = 10

module.exports = {
  name,
  message,
  priority,
  reference,
  run: function (packageName, filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const re = /([!+[\]()])(?:(?!\1)([!+[\]()])+)/g
    let match
    let result = []

    while ((match = re.exec(content))) {
      if (match[0].length >= threshold) {
        result.push({
          name,
          message,
          priority,
          reference,
          packageName,
          filePath
        })
      }
    }

    return result
  }
}
