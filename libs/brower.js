/**
 * 是否浏览器环境
 * @module utils/brower
 * @returns {Boolean} 是否浏览器环境
 */
exports.is = () => {
    return !this.document;
}