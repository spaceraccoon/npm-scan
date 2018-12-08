'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const cspPrefetchBypass = require('..')

chai.use(dirtyChai)

const examplePath1 = path.join(__dirname, 'csp-prefetch-bypass1.example.js')
const examplePath2 = path.join(__dirname, 'csp-prefetch-bypass2.example.js')

describe('csp prefetch bypass heuristic', function () {
  it('should report csp prefetch bypass example 1', function () {
    const result = cspPrefetchBypass.run('csp prefetch bypass 1', examplePath1)
    expect(result).to.eql([{
      name: cspPrefetchBypass.name,
      message: cspPrefetchBypass.message,
      priority: cspPrefetchBypass.priority,
      reference: cspPrefetchBypass.reference,
      packageName: 'csp prefetch bypass 1',
      filePath: examplePath1
    }])
  })

  it('should report csp prefetch bypass example 2', function () {
    const result = cspPrefetchBypass.run('csp prefetch bypass 2', examplePath2)
    expect(result).to.eql([{
      name: cspPrefetchBypass.name,
      message: cspPrefetchBypass.message,
      priority: cspPrefetchBypass.priority,
      reference: cspPrefetchBypass.reference,
      packageName: 'csp prefetch bypass 2',
      filePath: examplePath2
    }])
  })
})
