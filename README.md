# Lyzer
NodeJS metrics analytics module with an Express front-end.

![Lyzer Screenshot](/lyzer.png)

Lyzer is a simple metrics tool to monitor NodJS processes. It will create HTML5 charts that will update live with usage.

## Setup

First, install the module with `$ npm i lyzer`.

In order to utilize it in your code base, simply include it with `require('lyzer');`.

To start the front-end server, run `lyzer.startServer([your port])`.

```javascript
const Lyzer = require('lyzer');
const lyzer = new Lyzer();
lyzer.startServer(8080); // start the server on port 8080
```

NOTE: Memory and CPU usage is somewhat increased (by about 10%) due to the use of Express. There are plans to create a logger that will allow later loading into the Chrome debugger.