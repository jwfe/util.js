/**
 * 是否字符串
 * @param {String} dirtyString 字符串
 * @returns {Boolean} 是否字符串类型
 */
exports.is = (dirtyString) => {
    return String.prototype.toString.call(dirtyString) === '[String String]';
}