/*
*
*
*
*/


const express = require('express');
const Service = require('../../services/product');
const authentication = require('../middlewares/authentication');


var service = new Service();

module.exports = class Product {
    constructor() {
        this.router = express.Router();
        this.router.use(authentication);

        this.router.get('/', async function (req, res) {
            console.log('request reached handler');
            var msg = await service.get();
            console.log('request fulfilled');
            res.send(msg);
        });
    }
};