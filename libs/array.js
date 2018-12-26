/**
 * 是否数组
 * @param {Date} dirtyArray 数组对象
 * @returns {Boolean} 是否数组类型
 */
exports.is = (dirtyArray) => {
    return Object.prototype.toString.call(dirtyArray) === '[object Array]';
}