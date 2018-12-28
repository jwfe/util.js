/**
 * 是否数组
 * @param {Array} dirtyArray 数组对象
 * @returns {Boolean} 是否数组类型
 */
exports.is = (dirtyArray) => {
    return Object.prototype.toString.call(dirtyArray) === '[object Array]';
}
/**
 * 按字符对数组进行排序
 * @param {Array} dirtyArray 需要排序的数组
 * @returns {Array} 新数组
 */
exports.sortCharacters = dirtyArray =>{
    return dirtyArray.sort((a, b) => {
        return a.localeCompare(b)
    });
}


