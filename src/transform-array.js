const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  // Remove line below and write your code here
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const result = [];
  const discardNext = [];

  for (let i = 0; i < arr.length; i++) {
    if (discardNext.includes(i)) continue;

    switch (arr[i]) {
      case '--discard-next':
        discardNext.push(i + 1);
        break;
      case '--discard-prev':
        if (i > 0 && !discardNext.includes(i - 1)) {
          result.pop();
        }
        break;
      case '--double-next':
        if (i < arr.length - 1) {
          result.push(arr[i + 1]);
        }
        break;
      case '--double-prev':
        if (i > 0 && !discardNext.includes(i - 1)) {
          result.push(result[result.length - 1]);
        }
        break;
      default:
        result.push(arr[i]);
    }
  }

  return result;
}

module.exports = {
  transform
};
