const v8 = require('v8');
const App = require('./app');

/*
  Analytics
  
  Main class, exists as an abstraction over any external calls
  (library, internal fucntions, and internal classes).
*/
module.exports = class Analytics{

    // start the express server to display the front-end
    startServer(port){
        let app = new App(8080, this);
    }
    
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
