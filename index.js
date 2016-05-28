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
      // when we pipe, we must listen for any data. If we don't listen, the buffer at the child will fill up and execution will block
      var rebuild = spawn('npm', ['rebuild'], {stdio: opt.level === 'debug' ? 'inherit' : ['pipe', 'pipe', process.stderr], cwd: opt.dir})
        .on('error', function (e) {
          callback(e)
        })
        .on('close', function () {
          callback(null, true)
        })

      if (opt.level !== 'debug') {
        rebuild.stdout.on('data', function (data) {
          // ignore data
        })
      }
    }
  })
}

module.exports = idempotentRebuild
module.exports.requiresRebuild = requiresRebuild
