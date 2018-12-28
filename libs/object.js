/**
 * 是否对象
 * @module utils/object
 * @param {Object} dirtyObject 对象
 * @returns {Boolean} 是否对象类型
 */
exports.is = (dirtyObject) => {
    return Object.prototype.toString.call(dirtyObject) === '[object Object]';
}
/**
 * 创建对象的浅复制
 * @module utils/object
 * @param {Object} dirtyObject 对象
 * @returns {Object} 
 */
exports.shallowClone = dirtyObject => Object.assign({}, dirtyObject);