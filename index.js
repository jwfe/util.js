
['array', 'date', 'object', 'string', 'other', 'number', 'function', 'dom', 'brower', 'node'].forEach((item) => {
    exports[item] =  require('./libs/' + item)
});