# path-dispatcher

[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Devdependency Status][david-dev-image]][david-dev-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![GitHub version][github-ver-image]][github-ver-url]
[![License][license-image]][license-url]

Static url dispatcher

```
npm i path-dispatcher
```

## Usage

```js
import pathDispatcher from 'path-dispatcher';

const dispatcher = pathDispatcher({
  '/': () => {},
  '/page': [() => {}, otherFunc],
  ['/other.html']() {}
}, { rootPath: '/root/path' });

dispatcher.route('/page.html', pageFunc);

dispatcher.dispatch();
```

## API

### create dispatcher

```js
pathDispatcher(routes = {}, config = { rootPath: '' })
```

### route

```js
dispatcher.route(pathName, funcOrFuncs)
```

@param {String}
@param {Function | Array} funcOrFuncs

### dispatch

```js
dispatcher.dispatch(currentPathName)
```

@param {String} [currentPathName = location.pathname || '']
@param {Function | Array} funcOrFuncs

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## License

[MIT][license-url]

© sugarshin

[npm-image]: http://img.shields.io/npm/v/path-dispatcher.svg
[npm-url]: https://www.npmjs.org/package/path-dispatcher
[bower-image]: http://img.shields.io/bower/v/path-dispatcher.svg
[bower-url]: http://bower.io/search/?q=path-dispatcher
[travis-image]: http://img.shields.io/travis/sugarshin/path-dispatcher/master.svg?branch=master
[travis-url]: https://travis-ci.org/sugarshin/path-dispatcher
[david-image]: https://david-dm.org/sugarshin/path-dispatcher.svg
[david-url]: https://david-dm.org/sugarshin/path-dispatcher
[david-dev-image]: https://david-dm.org/sugarshin/path-dispatcher/dev-status.svg
[david-dev-url]: https://david-dm.org/sugarshin/path-dispatcher#info=devDependencies
[gratipay-image]: http://img.shields.io/gratipay/sugarshin.svg
[gratipay-url]: https://gratipay.com/sugarshin/
[coveralls-image]: https://coveralls.io/repos/sugarshin/path-dispatcher/badge.svg
[coveralls-url]: https://coveralls.io/r/sugarshin/path-dispatcher
[github-ver-image]: https://badge.fury.io/gh/sugarshin%2Fpath-dispatcher.svg
[github-ver-url]: http://badge.fury.io/gh/sugarshin%2Fpath-dispatcher
[license-image]: http://img.shields.io/:license-mit-blue.svg
[license-url]: http://sugarshin.mit-license.org/
[downloads-image]: http://img.shields.io/npm/dm/path-dispatcher.svg
