/**
 * 是否数字
 * @module utils/number
 * @param {Number} dirtyNumber 数字
 * @returns {Boolean} 是否数字类型
 */
exports.is = (dirtyNumber) => {
    return Object.prototype.toString.call(dirtyNumber) === '[object Number]';
}
/**
 * 数字格式化
 * @module utils/number
 * @param {Number} number 要格式化的价格
 * @param {Number} decimals 保留几位小数
 * @param {String} point 小数点符号
 * @param {String} sep 千分位符号
 * @param {String} roundtag 舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
 * @returns {String} 格式化后的字符串
 */
exports.format = (number, decimals, point, sep, roundtag) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || "ceil";
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    let s = '';
    const toFixedFix = function (n, prec) {
        const k = Math.pow(10, prec);
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
    };
    sep = (typeof sep === 'undefined') ? ',' : sep;
    const dec = (typeof point === 'undefined') ? '.' : point;
    
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}