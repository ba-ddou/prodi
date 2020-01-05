/*
*
* product service
*
*/



var helpers = require('./helpers');
var jwt = require('jsonwebtoken');

module.exports = class Product {
    constructor(container) {
        //get config object from typedi
        this.config = container.get("config");
        //get data object frm typedi
        this.data = container.get("data");
        // get eventPool object from typedi
        this.eventPool = container.get("eventPool");
    }

    get = async (queryObject) => {


        // parse the queryObject received from the client to a valid JS object
        var query = helpers.parseProductQueryObject(queryObject);
        console.log(query);
        //asynchronous call to the data object's read function
        var [data, err] = await this.data.read('product', query);
        if (!err) {
            // create next page token
            let nextPageToken = helpers.createNextPageToken(queryObject, data, this.config.jwtPrivateKey);
            return [{ nextPageToken, data }, false]
        }
        else return [false, err];

    }

    post = async (productObject, adminObject) => {
        //check that product object conforms with the product schema
        if (helpers.validateProductObject(productObject)) {
            //add count property with a default of 0
            productObject.count = 0;
            //add sales property with a default of 0
            productObject.sales = 0;
            //asynchronous call to the data object's create function
            var err = await this.data.create('product', productObject);
            if (!err) {
                // dispatch adminactivity event
                this.eventPool.emit('adminactivity', {
                    admin: adminObject.username,
                    targetCollection: 'product',
                    method: 'post',
                    document: JSON.stringify(productObject)

                });
                return ['product saved successfully', false, 200];
            }
            else return [false, err, 500];
        } else {
            return [false, 'missing product property', 400];
        }

    }

    // update product function
    // required parameters : 
    //      -_id (the traget document's _id)
    //      - productObject (the new data)
    put = async (_id, productObject, adminObject) => {
        // read the target document's current data
        var [res, err] = await this.data.read('product', { _id });
        var ogDocument = res ? res[0] : false;
        // console.log(ogDocument);
        // call the data module's update function
        var [res, err] = await this.data.update('product', { _id }, productObject);
        if (!err) {
            // dispatch adminactivity event
            this.eventPool.emit('adminactivity', {
                admin: adminObject.username,
                targetCollection: 'product',
                method: 'put',
                ogDocument: ogDocument,
                document: JSON.stringify(productObject)

            });
            return [res.nModified, err];
        }
        else {
            console.log(err);
            return [res, err];
        }
    }

    // delete product function
    // required parameters : 
    //      -_id (the traget document's _id)
    delete = async (_id, adminObject) => {
        // read the target document's current data
        var [res, err] = await this.data.read('product', { _id });
        var ogDocument = res ? res[0] : false;
        // call the data module's remove function
        var [res, err] = await this.data.remove('product', { _id });
        if (!err) {
            // dispatch adminactivity event
            this.eventPool.emit('adminactivity', {
                admin: adminObject.username,
                targetCollection: 'product',
                method: 'delete',
                ogDocument: ogDocument

            });
            return [res.deletedCount, err];
        }
        else {
            console.log(err);
            return [res, err];
        }
    }
}