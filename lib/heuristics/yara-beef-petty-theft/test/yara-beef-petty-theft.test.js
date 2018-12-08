'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
const beefPettyTheft = require('..')
const commandExists = require('../../../utils/commandExists')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'yara-beef-petty-theft.example.js')

describe('Yara BeEf Petty Theft heuristic', function () {
  it('should report petty theft example', function () {
    if (commandExists('yara')) {
      const result = beefPettyTheft.run('beef-petty-theft', examplePath)
      expect(result).to.eql([{
        name: beefPettyTheft.name,
        message: beefPettyTheft.message,
        reference: beefPettyTheft.reference,
        packageName: 'beef-petty-theft',
        filePath: examplePath
      }])
    } else {
      this.skip()
    }
  })
})
