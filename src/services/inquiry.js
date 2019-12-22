/*
*
* Inquiry service
*
*/


var Config = require('../config');
var helpers = require('./helpers');
var Data = require('../data');
var Event = require('events');

module.exports = class Inquiry {
    constructor(container) {
        //get config object from typedi
        this.config = container.get(Config);
        //get data object frm typedi
        this.data = container.get(Data);
        // get eventPool object from typedi
        this.eventPool = container.get(Event);
    }


    // read inquiries function
    // read all documents from the inquiries collection
    get = async () => {

        var [data, err] = await this.data.read('inquiry', {});
        if (data) return [data, false];
        else return [false, err];

    }

    // Create inquiry function
    // Required parameters
    //          - inquiryObject (the data to be saved in an inquiries document)
    post = async (inquiryObject) => {
        //check that inquiry object conforms with the inquiry schema
        if (helpers.validateInquiryObject(inquiryObject)) {
            // console.log(inquiryObject);
            // add the opened property
            inquiryObject.opened = false;
            //asynchronous call to the data object's create function
            var err = await this.data.create('inquiry', inquiryObject);
            if (!err) return ['inquiry saved successfully', false];
            else return [false, err];
        } else {
            return [false, 'missing inquiry property'];
        }

    }

    // update inquiry function
    // only used to update an inquiry's opened property
    // required parameters : 
    //      -_id (the traget document's _id)
    //      - opened (the new data)
    put = async (_id, opened, adminObject) => {
        if (typeof _id == "string" && typeof opened == "boolean") {
            // read the target document's current data
            var [res, err] = await this.data.read('inquiry', { _id });
            var ogDocument = res ? res[0] : false;
            // call the data module's update function
            var [res, err] = await this.data.update('inquiry', { _id }, { opened });
            if (!err) {
                // dispatch adminactivity event
                this.eventPool.emit('adminactivity', {
                    admin: adminObject.username,
                    targetCollection: 'inquiry',
                    method: 'put',
                    ogDocument: ogDocument,
                    document: JSON.stringify({opened})

                });
                return [res.nModified, err];
            }
            else {
                console.log(err);
                return [res, err];
            }
        } else {
            return [false, "unvalid request parameters"];
        }

    }




}