'use strict'

/* eslint-env mocha */

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const dummy = require('..')

chai.use(dirtyChai)

describe('Dummy heuristic', function () {
  it('should not report __dummy__ package', function () {
    const result = dummy.run('__dummy__', null)
    expect(result).to.be.null()
  })

  it('should not report any other package', function () {
    const result = dummy.run('bad-package', './bad-package')
    expect(result).to.eql({
      name: dummy.name,
      message: dummy.message,
      priority: dummy.priority,
      reference: dummy.reference,
      packageName: 'bad-package',
      filePath: './bad-package'
    })
  })
})
