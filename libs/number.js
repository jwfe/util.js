/**
 * 是否数字
 * @module number
 * @param {Number} dirtyNumber 数字
 * @returns {Boolean} 是否数字类型
 */
exports.is = (dirtyNumber) => {
    return Object.prototype.toString.call(dirtyNumber) === '[object Number]';
}