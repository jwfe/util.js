/**
 * 是否函数
 * @module utils/function
 * @param {Function} dirtyFunction 函数对象
 * @returns {Boolean} 是否函数类型
 */
exports.is = (dirtyFunction) => {
    return Object.prototype.toString.call(dirtyFunction) === '[object Function]';
}