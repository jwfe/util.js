/**
 * 是否浏览器环境
 * @returns {Boolean} 是否浏览器环境
 */
exports.is = () => {
    return !this.document;
}