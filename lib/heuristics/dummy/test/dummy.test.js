/* eslint-env mocha */

'use strict'

const expect = require('chai').expect

const dummy = require('..')

describe('Dummy heuristic', function () {
  it('should not report __dummy__ package', function () {
    const result = dummy.run('__dummy__', null)
    expect(result).to.eql([])
  })

  it('should report any other package', function () {
    const result = dummy.run('bad-package', './bad-package')
    expect(result).to.eql([{
      name: dummy.name,
      message: dummy.message,
      priority: dummy.priority,
      reference: dummy.reference,
      packageName: 'bad-package',
      filePath: './bad-package'
    }])
  })
})
