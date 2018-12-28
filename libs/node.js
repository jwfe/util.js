/**
 * 是否node环境
 * @module utils/node
 * @returns {Boolean} 是否node环境
 */
exports.is = () => {
    return typeof(window) === 'undefined'
}