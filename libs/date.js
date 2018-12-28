/**
 * 是否日期
 * @module date
 * @param {Date} dirtyDate 日期对象
 * @returns {Boolean} 是否日期类型
 */
exports.is = (dirtyDate) => {
    return Object.prototype.toString.call(dirtyDate) === '[object Date]';
}
/**
 * 日期格式化
 * @module date
 * @param {Date} dirtyDate 日期对象
 * @param {String} dirtyFormatStr 格式化字符串
 * @returns {String} 格式化后的日期字符串
 */
exports.format = (dirtyDate, dirtyFormatStr = 'yyyy-MM-dd') => {
    const o = {
        'M+': dirtyDate.getMonth() + 1,
        'd+': dirtyDate.getDate(),
        'h+': dirtyDate.getHours(),
        'm+': dirtyDate.getMinutes(),
        's+': dirtyDate.getSeconds(),
        'q+': Math.floor((dirtyDate.getMonth() + 3) / 3),
        'S': dirtyDate.getMilliseconds()
    };

    if (/(y+)/.test(dirtyFormatStr)) {
        dirtyFormatStr = dirtyFormatStr.replace(RegExp.$1, (dirtyDate.getFullYear() + '').substr(4
            - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(dirtyFormatStr)) {
            dirtyFormatStr = dirtyFormatStr.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return dirtyFormatStr;
}
/**
 * 日期字符串转为日期对象
 * @module date
 * @param {String} dirtyDateString 日期字符串
 * @returns {Date} 格式化后的日期对象
 */
exports.parse = (dirtyDateString) => {
    const isoExp = /^\s*(\d{4})[-\/\u4e00-\u9fa5](\d\d?)[-\/\u4e00-\u9fa5](\d\d?)[\u4e00-\u9fa5]?\s*$/;
    const dateObj = new Date();
    const month;
    const parts = isoExp.exec(dirtyDateString);
    if (parts) {
        month = +parts[2];
        dateObj.setFullYear(parts[1], month - 1, parts[3]);
        dateObj.setHours(0, 0, 0, 0);
        if (month != dateObj.getMonth() + 1) {
            dateObj.setTime(NaN);
        }
    }
    return dateObj;
}

/**
 * 日期对比毫秒数
 * @module date
 * @param {String|Date|Number} start 开始日期
 * @param {String|Date|Number} end 结束日期
 * @returns {Number} 对比的毫秒数
 */
exports.differenceInMilliseconds = (start, end) => {
    if(typeof start === 'string' && typeof end === 'string'){
        start = new Date(start).getTime();
        end = new Date(end).getTime();
    }

    if(exports.is(start) && exports.is(end)){
        start = start.getTime();
        end = end.getTime();
    }
    return end - start;
}

/**
 * 日期对比天数
 * @module date
 * @param {String|Date|Number} start 开始日期
 * @param {String|Date|Number} end 结束日期
 * @returns {Number} 对比的天数,具体是不是绝对值，是否取余，业务内自己实现
 */
exports.differenceInDays = (start, end) => exports.differenceInMilliseconds(start, end) / 86400000;

/**
 * 切换日期
 * @module date
 * @param {Date|String} dirtyDate 日期
 * @param {Number} days 天数
 * @returns {String} 切换后得到的时间字符串
 */
exports.subDays = (dirtyDate, days) => {
    let startTime;
    if(typeof dirtyDate === 'string'){
        startTime = new Date(dirtyDate).getTime();
    } else {
        startTime = dirtyDate.getTime()
    }

    let endTime = new Date(startTime + (days * 86400000));
    let lastYear = endTime.getFullYear();
    let lastMonth = endTime.getMonth() + 1;
    // 字符串转换
    lastMonth = lastMonth < 10 ? `0${lastMonth}` : lastMonth;
    let lastDay = endTime.getDate();
    lastDay = lastDay < 10 ? `0${lastDay}` : lastDay;

    return `${lastYear}-${lastMonth}-${lastDay}`;
}
