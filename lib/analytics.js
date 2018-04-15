const v8 = require('v8');

module.exports = class Analytics{

    getHeapTotal(){
        return v8.getHeapStatistics().total_heap_size;
    }
    
    getHeapUsed(){
        return v8.getHeapStatistics().used_heap_size;
    }

    getInMegabytes(values){
        return Math.round(values / 1024 / 1024 * 100) / 100;
    }
};
