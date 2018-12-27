/**
 * 是否字符串
 * @param {String} dirtyString 字符串
 * @returns {Boolean} 是否字符串类型
 */
exports.is = (dirtyString) => {
    return String.prototype.toString.call(dirtyString) === '[String String]';
}
/**
 * 剔除左右空格
 * @param {String} dirtyString 字符串
 * @returns {String} 字符串
 */
exports.trim = (dirtyString) => dirtyString.replace(/^\s+|\s+$/g, "");

/**
 * 剔除左空格
 * @param {String} dirtyString 字符串
 * @returns {String} 字符串
 */
exports.ltrim = (dirtyString) => dirtyString.replace(/^\s+/, "");

/**
 * 剔除右空格
 * @param {String} dirtyString 字符串
 * @returns {String} 字符串
 */
exports.rtrim = (dirtyString) => dirtyString.replace(/\s+$/, "");

/**
 * 截取给定长度的字符串
 * @param {String} dirtyString 字符串
 * @param {Number} len 截取的长度
 * @returns {String} 字符串
 */
exports.truncate = (dirtyString, len) => {
    if(dirtyString.length >len){
        dirtyString = dirtyString.substring(0, len);
    }
    return dirtyString;
};

/**
 * 按字母顺序对字符串中的字符进行排序
 * @param {String} dirtyString 字符串
 * @returns {String} 字符串
 */
exports.sortCharactersInString = dirtyString => dirtyString.split("").sort((a, b) => a.localeCompare(b)).join("")

/**
 * 将字符串截断为指定长度，并在末尾增加...
 * @param {String} dirtyString 字符串
 * @param {Number} len 截取的长度
 * @returns {String} 字符串
 */
exports.truncateString = (dirtyString, len) => {
    const str = exports.truncate(dirtyString, len);
    return dirtyString > len ? (str + '...') : str;
};
