# npm-idempotent-rebuild
run npm rebuild only if cannot load native modules

[![js standard style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)]()

[![build status](https://circleci.com/gh/jden/node-npm-idempotent-rebuild.svg?&style=shield)][circleci]

[circleci]: https://circleci.com/gh/jden/node-npm-idempotent-rebuild
[standard]: http://standardjs.com/

Rebuilding native modules can be slow. This module attempts loading all native modules in
the dependency tree. If they fail, it runs `npm rebuild`. This is useful when switching
between node versions or between operating systems with cached `node_modules` directories.


## cli usage
```
$ npm-idempotent-rebuild
```

## programmatic usage
```js
const npmIdempotentRebuild = require('npm-idempotent-rebuild')
npmIdempotentRebuild({dir: __dirname}, function (err, rebuilt) {
  console.log(err, rebuilt ? : 'rebuilt node modules' : 'skipped rebuilding')
})
```


## api
with [jsig](https://github.com/jsigbiz/spec) type annotation:



## installation

    $ npm install npm-idempotent-rebuild


## running the tests

From package root:

    $ npm install
    $ npm test

For debug information, set env var DEBUG=true


## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXVI jden <jason@denizac.org>. See LICENSE.md
