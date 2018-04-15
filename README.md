# Lyzer
Node.js metrics analytics module with an Express front-end.

## Setup

First, install the module with `$ npm i lyzer`.

In order to utilize it in your code base, simply include it with `require('lyzer');`.

To start the front-end server, run `lyzer.startServer([your port])`.

```javascript
const Lyzer = require('lyzer');
const lyzer = new Lyzer();
lyzer.startServer(8080); // start the server on port 8080
```