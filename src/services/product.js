/*
*
* product service
*
*/


var Config = require('../config');
var helpers = require('./helpers');
var Data = require('../data');


module.exports = class Product {
    constructor(container) {
        //get config object from typedi
        this.config = container.get(Config);
        //get data object frm typedi
        this.data = container.get(Data);
        // setTimeout(this.put, 3000);
    }

    get = async (queryObject) => {
        // var query = helpers.parseProductQueryObject(queryObject);
        //asynchronous call to the data object's read function
        var [data, err] = await this.data.read('product', {});
        if (data) return [data, false];
        else return [false, err];

    }

    post = async (productObject) => {
        //check that product object conforms with the product schema
        if (helpers.validateProductObject(productObject)) {
            console.log(productObject);
            //add count property with a default of 0
            productObject.count = 0;
            //add sales property with a default of 0
            productObject.sales = 0;
            //asynchronous call to the data object's create function
            var err = await this.data.create('product', productObject);
            if (!err) return ['product saved successfully', false];
            else return [false, err];
        } else {
            return [false, 'missing product property'];
        }

    }


    put = async (_id, productObject) => {
        var [res, err] = await this.data.update('product', { _id }, productObject);
        if (!err) {
            console.log('successfully updated', res.nModified);
            return [res.nModified,err];
        }
        else {
            console.log(err);
            return [res,err];
        }
    }


    delete = async (_id) => {
        var [res, err] = await this.data.remove('product', { _id});
        if (!err) {
            console.log('successfully removed', res.deletedCount);
            return [res.deletedCount,err];
        }
        else {
            console.log(err);
            return [res,err];
        }
    }
}