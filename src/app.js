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
const Event = require('events')
const Subscriber = require('./subscriber');
const path = require('path');


const app = express();
// instantiate configs object
const config = new Config(); // This is a normal object instantiation
// add the config object to typedi's container
Container.set("config", config);   // any class in the container.get() instantiation heirarchy
// can retrieve the config object using container.get("config").

const data = Container.get(Data); // the purpose of object instantiation with Container.get() 
// is to inject dependencies throught the class constructor.

Container.set("data", data);       // any class in the container.get() instantiation heirarchy
// can retrieve the data object using container.get("data").

const eventPool = new Event();
Container.set("eventPool", eventPool);
const api = Container.get(Api);
Container.get(Subscriber);

app.use('/assets',express.static(path.join(__dirname, '../')));
app.use('/upload',express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use('/', api.router);

app.listen(config.port, _ => console.log(`server is listening on port ${config.port}`));