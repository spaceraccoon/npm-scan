'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const jsfuck = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'jsfuck.example.js')

describe('JSFuck heuristic', function () {
  it('should report JSFuck example', function () {
    const result = jsfuck.run('jsfuck', examplePath)
    expect(result).to.eql([{
      name: jsfuck.name,
      message: jsfuck.message,
      reference: jsfuck.reference,
      packageName: 'jsfuck',
      filePath: examplePath
    },
    {
      name: jsfuck.name,
      message: jsfuck.message,
      reference: jsfuck.reference,
      packageName: 'jsfuck',
      filePath: examplePath
    }])
  })
})
