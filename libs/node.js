/**
 * 是否node环境
 * @returns {Boolean} 是否node环境
 */
exports.is = () => {
    return typeof(window) === 'undefined'
}