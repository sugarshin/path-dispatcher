/*!
 * @license path-dispatcher
 * (c) sugarshin
 * License: MIT
 */

import globToRegexp from 'glob-to-regexp';

import objectForEach from './utils/objectForEach';
import indexExtRegex from './utils/indexExtRegex';

/**
 * pathDispatcher
 *
 * @param {Object} [routes = {}]
 * @param {Object} [config = { rootPath: '' }]
 * @returns {Object} { route, dispatch }
 */
export default function pathDispatcher(routes = {}, config = { rootPath: '' }) {
  objectForEach(routes, func => validateFuncs(func));

  /**
   * route
   *
   * @param {String} pathName
   * @param {Function|Function[]} funcOrFuncs
   * @returns {void}
   */
  function route(pathName, funcOrFuncs) {
    validateFuncs(funcOrFuncs);
    routes[pathName] = funcOrFuncs;
  }

  /**
   * dispatch
   *
   * @param {String} [currentPathName = location.pathname || '']
   * @returns {void}
   */
  function dispatch(currentPathName = location.pathname || '') {
    objectForEach(routes, (funcOrFuncs, pathName) => {
      const regexp = globToRegexp(createGlobPath(pathName), { extended: true });
      if (regexp.test(currentPathName)) {
        createFinalFunction(funcOrFuncs)();
      }
    });
  }

  /**
   * createGlobPath
   *
   * @param {String} pathName
   * @returns {String}
   */
  function createGlobPath(pathName) {
    if (/^\*$/.test(pathName)) {
      return '*';
    }

    if (/\/$/.test(pathName)) {
      return `${config.rootPath}${pathName}{,index.*}`;
    }

    if (indexExtRegex().test(pathName)) {
      const finalPathName = pathName.replace(indexExtRegex(), '');
      return `${config.rootPath}${finalPathName}{,/,/index.*}`;
    }

    if (/(.*)(?:\.([^.\/]+$))/.test(pathName)) {
      return `${config.rootPath}${pathName}`;
    }

    return `${config.rootPath}${pathName}{/,/index.*}`;
  }

  return { route, dispatch };
}

/**
 * createFinalFunction
 *
 * @param {Function|Function[]} funcOrFuncs
 * @returns {Function}
 */
function createFinalFunction(funcOrFuncs) {
  return Array.isArray(funcOrFuncs) ?
    () => funcOrFuncs.forEach(func => func()) :
    funcOrFuncs;
}

/**
 * validateFuncs
 *
 * @param {*} funcOrFuncs
 * @throws {TypeError}
 */
function validateFuncs(funcOrFuncs) {
  if (!isFuncOrArrayOfFuncs(funcOrFuncs)) {
    throw new TypeError(`${funcOrFuncs} is not a function or array of funcs`);
  }
}

/**
 * isFuncOrArrayOfFuncs
 *
 * @param {*} func
 * @throws {Boolean}
 */
function isFuncOrArrayOfFuncs(func) {
  return typeof func === 'function' ||
    Array.isArray(func) && isArrayOfFuncs(func);
}

/**
 * isArrayOfFuncs
 *
 * @param {Array} array
 * @throws {Boolean}
 */
function isArrayOfFuncs(array) {
  return array.every(el => typeof el === 'function');
}
