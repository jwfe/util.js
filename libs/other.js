/**
 * query解析为object
 * @module other
 * @param {String} query 需要解析的query/url
 * @returns {Object} object
 */
exports.queryToObj = (query) => {
    const queryArr = query.split('?');
    const url = queryArr[0];
    const search = queryArr[1];
    if(!search){
        return {
            url
        }
    }

    const handle = decodeURIComponent(search).split('&').filter((item) => item !== '');

    const obj = {
        url,
        search,
        query: {}
    }

    handle.forEach((item) => {
        const temp = item.split('=');
        obj.query[temp[0]] = temp[1];
    });

    return obj;
}
/**
 * object解析为query
 * @module other
 * @param {Object} obj query Object 
 * @returns {String} query字符串
 */
exports.objToQuery = (obj) => {
    const url = obj.url ? '?' + obj.url : '';
    let search = obj.search;
    const query = obj.query
    if(!search && query){
        const tempQueryArr = [];
        for(let key in query){
            tempQueryArr.push(`${key}=${query[key]}`);
        }
        search = tempQueryArr.join('&');
    }
    return `${url}${search}`;
}