#!/usr/bin/env node
var npmIdempotentRebuild = require('../')

function flag (name) {
  return process.argv.indexOf('--' + name) > -1 ||
    process.argv.indexOf('-' + name[0]) > -1
}

if (flag('help')) {
  console.log(
    'usage: npm-idempotent-rebuild\n' +
    '\n' +
    '  -h, --help     this help text\n' +
    '  -v, --version  show package version' +
    '\n' +
    '  homepage: ' + require('../package.json').homepage
  )
  process.exit()
}

if (flag('version')) {
  console.log(require('../package.json').version)
  process.exit()
}

npmIdempotentRebuild({level: 'info'}, function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
})
