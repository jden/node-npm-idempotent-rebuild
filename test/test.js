/* globals describe, it, before, beforeEach */
'use strict'
const exec = require('child_process').exec
const join = require('path').join
const expect = require('mochi').expect
const cpr = require('cpr')

var DEBUG = Boolean(process.env.DEBUG)
var LOGLEVEL = DEBUG ? 'debug' : 'silent'

describe('npm-idempotent-rebuild', function () {
  const npmIdempotentRebuild = require('../')

  before(function (done) {
    this.timeout(30000)
    exec('npm run clean', {cwd: __dirname}, function (err, stdout, stderr) {
      if (DEBUG) {
        console.log(stdout)
        console.error(stderr)
      }
      if (err) { return done(err) }
      cpr(join(__dirname, 'node_modules'), join(__dirname, 'test_node_modules'), {
        deleteFirst: true,
        overwrite: true
      }, done)
    })
  })

  beforeEach(function (done) {
    this.timeout(10000)
    if (DEBUG) {
      console.log('restoring unbuilt node_modules')
    }
    cpr(join(__dirname, 'test_node_modules'), join(__dirname, 'node_modules'), {
      deleteFirst: true,
      overwrite: true
    }, done)
  })

  it('from unbuilt state it rebuilds things', function (done) {
    this.timeout(10000)
    npmIdempotentRebuild({dir: __dirname, level: LOGLEVEL}, function (err, rebuilt) {
      expect(rebuilt).to.equal(true)
      done(err)
    })
  })

  it('when built, it does not rebuild', function (done) {
    this.timeout(10000)
    npmIdempotentRebuild({dir: __dirname, level: LOGLEVEL}, function (err, rebuilt) {
      if (err) { return done(err) }
      npmIdempotentRebuild({dir: __dirname, level: LOGLEVEL}, function (err, rebuiltAgain) {
        expect(rebuiltAgain).to.equal(false)
        done(err)
      })
    })
  })
})
