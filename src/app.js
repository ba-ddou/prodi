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

const app = express();
const config = new Config(); // This is a normal object instantiation
Container.set("config",config);

const data = Container.get(Data); // the purpose of object instantiation with Container.get() 
                                  // is to inject dependencies throught the class constructor.

Container.set("data",data);       // any class in the container.get() instantiation heirarchy
                                  // can retrieve the data object using container.get("data").

const eventPool = new Event();
Container.set("eventPool",eventPool);
const api = Container.get(Api);
Container.get(Subscriber);

app.use(express.json());
app.use('/',api.router);

app.listen(config.port, _ => console.log(`server is listening on port ${config.port}`));