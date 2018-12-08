'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const mainMinified = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'example/package.json')

describe('main minified heuristic', function () {
  it('should report main minified example', function () {
    const result = mainMinified.run('main minified', examplePath)
    expect(result).to.eql([{
      name: mainMinified.name,
      message: mainMinified.message,
      priority: mainMinified.priority,
      reference: mainMinified.reference,
      packageName: 'main minified',
      filePath: examplePath
    }])
  })
})
