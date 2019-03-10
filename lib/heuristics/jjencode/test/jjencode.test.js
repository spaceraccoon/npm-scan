'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const jjencode = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'jjencode.example.js')

describe('jjencode heuristic', function () {
  it('should report jjencode example', function () {
    const result = jjencode.run('jjencode', examplePath)
    expect(result).to.eql({
      name: jjencode.name,
      message: jjencode.message,
      reference: jjencode.reference,
      packageName: 'jjencode',
      filePath: examplePath
    })
  })
})
