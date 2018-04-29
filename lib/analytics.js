const v8 = require('v8');
const os = require('os');
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

    // get the total memory available for the heap
    getHeapTotal(){
        return v8.getHeapStatistics().total_heap_size;
    }

    // get the amount of heap memory being used
    getHeapUsed(){
        return v8.getHeapStatistics().used_heap_size;
    }

    // convert a kilobytes value.
    getInMegabytes(values){
        return Math.round(values / 1024 / 1024 * 100) / 100;
    }

    
    getCPUUsage(callback){
        let firstTotal = this.getCPUTotal();

        // wait 1 second to get a comparison
        setTimeout(() => {
            // get current CPU metrics for second time
            let secondTotal = this.getCPUTotal();
            
            let idleDiff = secondTotal.idle - firstTotal.idle;
            let totalDiff = secondTotal.total - firstTotal.total;
            // return the percentage /used/
            callback(1 - (idleDiff / totalDiff));
        }, 1000);
    }

    // get the total sum of CPU usage time
    getCPUTotal(){
        let cpus = os.cpus();
        let total = 0;
        let idle = 0;
        
        // add up the total cpu usage times
        for(let cpu in cpus){
            total += cpus[cpu].times.user;
            total += cpus[cpu].times.nice;
            total += cpus[cpu].times.sys;
            total += cpus[cpu].times.irq;
            total += cpus[cpu].times.idle;
            
            // idle time of CPU
            idle += cpus[cpu].times.idle;
        }

        // create an object with the times
        return {
            total: total,
            idle: idle
        };
    }
};
