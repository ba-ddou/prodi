/*
* App entry point
*
*
*/

const express = require('express');
const Config = require('./config');
const Api = require('./api');
var Container = require('typedi').Container;


const app = express();
const config = Container.get(Config);
config.newVar = 72;
const api = Container.get(Api);

app.use('/',api.router);

app.listen(config.port, _ => console.log(`server is listening on port ${config.port}`));