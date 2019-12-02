/*
* App entry point
*
*
*/

const express = require('express');
const Config = require('./config');
const Api = require('./api');
const Container = require('typedi').Container;
const Data = require('./data');


const app = express();
const config = Container.get(Config);
const data = Container.get(Config);
const api = Container.get(Api);


app.use(express.json());
app.use('/',api.router);

app.listen(config.port, _ => console.log(`server is listening on port ${config.port}`));