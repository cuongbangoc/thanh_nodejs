'use strict';

const express = require('express');

// fs để làm gì??
const fs = require('fs');

// path để làm gì???
// const path = require('path');
const config = require('config');

// yaml để làm gì???
const yaml = require('js-yaml');

// helmet để làm gì???
const helmet = require('helmet');
const app = express();

const bodyParser = require('body-parser');

// logger để làm gì???
const logger = require('./helpers/logger');

// App Configuration with Swagger
// Cái này để làm gì???
app.set('port', process.env.PORT || config.get("server.port"));

// Only let me be framed by people of the same origin:
// Cái này để làm gì???
app.use(helmet.frameguard({
    action: 'sameorigin'
}));
app.use(helmet.frameguard()); // defaults to sameorigin
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
// Hide X-Powered-By
app.use(helmet.hidePoweredBy());

app.disable('x-powered-by');
app.enable("trust proxy");
app.set("trust proxy", true);

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// add-on swagger-editor
// app.use('/swagger-editor', express.static('./node_modules/swagger-editor'));
// app.use('/swagger', express.static('./docs'));
// app.get('/docs', function(req, res){
//     let docs = yaml.safeLoad(fs.readFileSync('./docs/swagger.yml', 'utf8'));
//     res.send(JSON.stringify(docs));
// });

// body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import middlewares
// app.use(require('./middlewares/auth'));

// import routers
app.use(require('./apis'));
// start server
let server = app.listen(config.get('server.port'), config.get('server.host'), function () {
    let host = server.address().address;
    let port = server.address().port;
    logger.info('Server start at http://%s:%s', host, port);
    logger.error("AAAA");
});

module.exports = app;
