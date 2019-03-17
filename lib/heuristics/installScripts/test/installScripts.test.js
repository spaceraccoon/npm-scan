'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const installScripts = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'example/package.json')

describe('install scripts heuristic', function () {
  it('should report install scripts example', function () {
    const result = installScripts.run('install scripts', examplePath)
    expect(result).to.eql({
      name: installScripts.name,
      message: installScripts.message,
      reference: installScripts.reference,
      packageName: 'install scripts',
      filePath: examplePath
    })
  })
})
