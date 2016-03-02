var readPackageTree = require('read-package-tree')
var findRoot = require('find-root')
var nativeModules = {}

function requiresRebuild (dir, callback) {
  readPackageTree(findRoot(dir), function (err, tree) {
    if (err) { throw err }

    flatten(tree).filter(function (node) {
      return node.package.gypfile
    })
    .forEach(function (node) {
      nativeModules[node.path] = true
    })

    tryRequireModules(Object.keys(nativeModules), function (err) {
      if (err) { return callback(null, true) }
      callback(null, false)
    })
  })
}

function flatten (tree) {
  var arr = [tree]
  tree.children.map(flatten).forEach(function (c) {
    arr = arr.concat(c)
  })
  return arr
}

function tryRequireModules (modules, callback) {
  try {
    modules.forEach(function (module) {
      console.log('requiring', module)
      require(module)
    })
  } catch (e) {
    return callback(e)
  }
  callback()
}

module.exports = requiresRebuild
