var express = require('express');
var path = require('path');
/*
  App

  Wrapper over Express, handles the serving of all webpages.
  {
    app: express app
    port: what port the site is served from.
  }
*/
module.exports = class App{
    constructor(port, analytics){
        /*configure member variaables*/
        this.app = express();
        this.port = 8080; // the port that the local server will run on
        this.analytics = analytics;
        this.initRoutes();

        /*static file hosting (relative to file)*/
        this.app.use('/public', express.static(path.resolve(__dirname + '/../public')));

        /*listen on specific port*/
        this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    }

    /*create the REST routes*/
    initRoutes(){
        this.app.get('/', (req, res) => {
            // load relative to the library
            res.sendFile(path.resolve(__dirname + '/../views/index.html'));
        });
        // get the information on memory usage
        this.app.get('/getHeapInfo', (req, res) => {
            // return an object constructed of the heap usage.
            res.status(200).send({
                total: this.analytics.getInMegabytes(this.analytics.getHeapTotal()),
                used: this.analytics.getInMegabytes(this.analytics.getHeapUsed())
            });
        });
    }
}
