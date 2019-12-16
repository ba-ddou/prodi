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

    post = async (productObject)=>{
        console.log(productObject);
        productObject.count = 0;
        productObject.sales = 0;
        var err = await this.data.create('product',productObject);
        if(!err) return ['product saved successfully',false];
        else return [false,err];
    }


    put(){

    }


    delete(){

    }
}