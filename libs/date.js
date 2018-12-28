const weekObj = {
    "en": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "zh": ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
}
/**
 * 是否日期
 * @module utils/date
 * @param {Date} dirtyDate 日期对象
 * @returns {Boolean} 是否日期类型
 */
exports.is = (dirtyDate) => {
    return Object.prototype.toString.call(dirtyDate) === '[object Date]';
}
/**
 * 日期格式化
 * @module utils/date
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
 * @module utils/date
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
 * @module utils/date
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
 * @module utils/date
 * @param {String|Date|Number} start 开始日期
 * @param {String|Date|Number} end 结束日期
 * @returns {Number} 对比的天数,具体是不是绝对值，是否取余，业务内自己实现
 */
exports.differenceInDays = (start, end) => exports.differenceInMilliseconds(start, end) / 86400000;

/**
 * 切换日期
 * @module utils/date
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

/**
 * 日期分组(以传入的日期为分界线分组)
 * @module utils/date
 * @param {String} dirtyDateString 用来分组的日期
 * @param {Array} dirtyDateArray 日期数组
 * @returns {Object} 分组后的对象
 */
exports.groupBy = (dirtyDateString, dirtyDateArray) => {
    const start = [];
    const end = [];
    const now = exports.parse(dirtyDateString);
    dirtyDateArray.forEach((date) => {
        const time = exports.parse(date);
        if (time < now) {
            start.push(date);
        } else {
            end.push(date);
        }
    });
    return {
        start,
        end
    }
}
/**
 * 获取日期是一年中的第几周，星期几
 * @module utils/date
 * @param {String} dirtyDateString - 日期
 * @param {String} [lang] - 语言zh/en
 * @returns {Object} year|number|season|month|week|weekName|dirtyYear
 */
exports.weekOfYear = (dirtyDateString, lang) => {
    const dirtyDate = exports.parse(dirtyDateString);
    let firstMonth = exports.parse(`${dirtyDate.getFullYear()}-01-01`);
    const firstMonthWeek = firstMonth.getDay();

    if(firstMonthWeek !== 0){
        let firstMonthDay = 1+(7-firstMonthWeek);
        firstMonthDay = firstMonthDay < 10 ? ('0' + firstMonthDay) : firstMonthDay;
        firstMonth = exports.parse(`${dirtyDate.getFullYear()}-01-${firstMonthDay}`);
        if((dirtyDate - firstMonth) < 0){
            firstMonth = exports.parse(`${dirtyDate.getFullYear() - 1}-01-01`);
        }
    }

    const number = Math.floor(((dirtyDate - firstMonth) / 86400000) / 7) + 1;
    const season = {
        1: 1, 2: 1, 3: 1,
        4: 2, 5: 2, 6: 2,
        7: 3, 8: 3, 9: 3,
        10: 4, 11: 4, 12: 4
    }

    const month = dirtyDate.getMonth() + 1;
    const week = dirtyDate.getDay();
    return {
        year: firstMonth.getFullYear(),
        number,
        month: month,
        season: season[month],
        week,
        weekName: weekObj[week],
        dirtyYear: dirtyDate.getFullYear()
    };
}

/**
 * 是否闰年
 * @module utils/date
 * @param {String} dirtyDateString - 日期
 * @returns {Boolean} true/false
 */
exports.isLeapYear = (dirtyDateString) => {
    const year = exports.parse(dirtyDateString).getFullYear();
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}