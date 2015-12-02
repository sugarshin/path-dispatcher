/*!
 * @license path-dispatcher
 * (c) sugarshin
 * License: MIT
 */

import globToRegexp from 'glob-to-regexp';

import objectForEach from './utils/objectForEach';

export default function pathDispatcher(routes = {}, config = { routePath: '' }) {
  objectForEach(routes, func => validateFuncs(func));

  function route(pathName, funcOrFuncs) {
    validateFuncs(funcOrFuncs);
    routes[pathName] = funcOrFuncs;
  }

  function dispatch(currentPathName = location.pathname || '') {
    objectForEach(routes, (funcOrFuncs, pathName) => {
      const globPath = getGlobPath(pathName);
      const regexp = globToRegexp(globPath, { extended: true });
      if (regexp.test(currentPathName)) {
        createFinalFunction(funcOrFuncs)();
      }
    });
  }

  function getGlobPath(pathName) {
    if (/^\*$/.test(pathName)) {
      return '*';
    }

    if (/\/(|index\.([^.\/]+$))$/.test(pathName)) {
      return `${config.rootPath}${pathName}{,index.*}`;
    }

    if (/(.*)(?:\.([^.\/]+$))/.test(pathName)) {
      return `${config.rootPath}${pathName}`;
    }

    return `${config.rootPath}${pathName}{/,/index.*}`;
  }

  return {
    route,
    dispatch
  };
}

function validateFuncs(funcOrFuncs) {
  if (!isFuncOrArrayOfFuncs(funcOrFuncs)) {
    throw new TypeError(`${funcOrFuncs} is not a function or array of funcs`);
  }
}

function createFinalFunction(funcOrFuncs) {
  return Array.isArray(funcOrFuncs) ?
    () => funcOrFuncs.forEach(func => func()) :
    funcOrFuncs;
}

function isFuncOrArrayOfFuncs(func) {
  return typeof func === 'function' ||
    Array.isArray(func) && isArrayOfFuncs(func);
}

function isArrayOfFuncs(array) {
  return array.every(el => typeof el === 'function');
}
