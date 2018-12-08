'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const checkCspHeaders = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'shell-commands.example.js')

describe('shell-commands heuristic', function () {
  it('should report shell-commands example', function () {
    const result = checkCspHeaders.run('shell-commands', examplePath)
    expect(result).to.eql([{
      name: checkCspHeaders.name,
      message: checkCspHeaders.message,
      reference: checkCspHeaders.reference,
      packageName: 'shell-commands',
      filePath: examplePath
    }])
  })
})
