var requiresRebuild = require('./requiresRebuild')
var spawn = require('child_process').spawn

function idempotentRebuild (opt, callback) {
  opt = opt || {}
  opt.dir = opt.dir || process.cwd()
  opt.level = opt.level || 'silent'
  requiresRebuild(opt.dir, function (err, dirty) {
    if (err) { return callback(err) }
    if (!dirty) {
      if (opt.level !== 'silent') {
        console.error('skipping rebuild')
      }
      callback(null, false)
    } else {
      if (opt.level !== 'silent') {
        console.error('rebuilding')
      }
      spawn('npm', ['rebuild'], {stdio: opt.level === 'debug' ? 'inherit' : 'pipe', cwd: opt.dir})
        .on('error', function (e) {
          callback(e)
        })
        .on('close', function () {
          callback(null, true)
        })
    }
  })
}

module.exports = idempotentRebuild
module.exports.requiresRebuild = requiresRebuild
