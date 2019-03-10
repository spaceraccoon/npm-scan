'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const checkCspHeaders = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'checkCsp.example.js')

describe('check csp headers heuristic', function () {
  it('should report check csp headers example', function () {
    const result = checkCspHeaders.run('check csp headers', examplePath)
    expect(result).to.eql({
      name: checkCspHeaders.name,
      message: checkCspHeaders.message,
      reference: checkCspHeaders.reference,
      packageName: 'check csp headers',
      filePath: examplePath
    })
  })
})
