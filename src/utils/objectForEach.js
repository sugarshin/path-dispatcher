/**
 * objectForEach
 *
 * @param {Object} object
 * @param {Function} func
 * @returns {void}
 */
export default function objectForEach(object, func) {
  Object.keys(object).forEach((key, i) => {
    func(object[key], key, i, object);
  });
}
