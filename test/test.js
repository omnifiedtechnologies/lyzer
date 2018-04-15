const Analytics = require('../index');
const v8 = require('v8');

let analytics = new Analytics();

const func = () => console.log(analytics.getInMegabytes(analytics.getHeapUsed()) +  ' / ' +  analytics.getInMegabytes(analytics.getHeapTotal()) + " MB");

analytics.startServer(8080);
