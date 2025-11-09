const { decorateObject } = require('../lib');
const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  getLength() {
    // Remove line below and write your code here
    if (!this._chain) return 0;
    return this._chain.length;
  },
  addLink(value) {
    // Remove line below and write your code here
    if (!this._chain) this._chain = [];
    this._chain.push(value);
    return this;
  },
  removeLink(position) {
    // Remove line below and write your code here
    if (!this._chain || !Number.isInteger(position) || position < 1 || position > this._chain.length) {
      delete this._chain;
      throw new Error("You can't remove incorrect link!");
    }
    this._chain.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    // Remove line below and write your code here
    if (this._chain) {
      this._chain.reverse();
    }
    return this;
  },
  finishChain() {
    // Remove line below and write your code here
    if (!this._chain) {
      const result = '';
      delete this._chain;
      return result;
    }
    const result = this._chain.map(value => `( ${value} )`).join('~~');
    delete this._chain;
    return result;
  },
};

module.exports = {
  chainMaker,
};
