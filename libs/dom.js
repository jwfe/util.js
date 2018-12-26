/**
 * 是否dom
 * @param {Date} dirtyDom dom对象
 * @returns {Boolean} 是否dom类型
 */
exports.is = (dirtyDom) => {
    return (typeof HTMLElement === 'function') ? (dirtyDom instanceof HTMLElement) : (dirtyDom && (typeof dirtyDom === 'object') && (dirtyDom.nodeType === 1) && (typeof dirtyDom.nodeName === 'string'));
}