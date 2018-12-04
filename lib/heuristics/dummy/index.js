'use strict'

const name = 'Dummy'
const message = 'Dummy rule for testing'
const priority = 1
const reference = 'https://www.google.com/'

module.exports = {
  name,
  message,
  priority,
  reference,
  run: function (packageName, filePath) {
    if (packageName === '__dummy__') {
      return []
    } else {
      return [{
        name,
        message,
        priority,
        reference,
        packageName,
        filePath
      }]
    }
  }
}
