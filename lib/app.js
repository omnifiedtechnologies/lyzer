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
        this.port = 8080;
        this.analytics = analytics;
        this.initRoutes();

        /*static file hosting*/
        this.app.use('/public', express.static(path.resolve('public')));

        /*listen on specific port*/
        this.app.listen(this.port, () => {
            console.log("listening on port " + this.port);
        });
    }

    /*create the REST routes*/
    initRoutes(){
        this.app.get('/', (req, res) => {
            res.sendFile(path.resolve('./views/index.html'));
        });
        this.app.get('/getHeapInfo', (req, res) => {
            res.status(200).send({
                total: this.analytics.getInMegabytes(this.analytics.getHeapTotal()),
                used: this.analytics.getInMegabytes(this.analytics.getHeapUsed())
            });
        });
    }
}
