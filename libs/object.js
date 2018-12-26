/**
 * 是否对象
 * @param {Object} dirtyObject 对象
 * @returns {Boolean} 是否对象类型
 */
exports.is = (dirtyObject) => {
    return Object.prototype.toString.call(dirtyObject) === '[object Object]';
}