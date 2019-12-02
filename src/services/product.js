/*
*
* product service
*
*/


var Config = require('../config');
var helpers = require('./helpers');
var Data = require('../data');


module.exports = class Product{
    constructor(container){
        //get config object from typedi
        this.config = container.get(Config);
        //get data object frm typedi
        this.data = container.get(Data);
    }
    get(){
        return new Promise((resolve,reject)=>{
            setTimeout(_=>resolve('received GET request on "/product"'),2000);
        });
    }

    post(){

    }


    put(){

    }


    delete(){

    }
}