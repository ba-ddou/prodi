/*
*
* Inquiry service
*
*/


var helpers = require('./helpers');

module.exports = class Inquiry {
    constructor(container) {
        //get config object from typedi
        this.config = container.get("config");
        //get data object frm typedi
        this.data = container.get("data");
        // get eventPool object from typedi
        this.eventPool = container.get("eventPool");
    }


    // read inquiries function
    // read all documents from the inquiries collection
    get = async (queryObject) => {
        // parse the queryObject received from the client to a valid JS object
        var query = helpers.parseProductQueryObject(queryObject);
        //asynchronous call to the data object's read function
        var [data, err] = await this.data.read('inquiry', query);
        if (!err){
            // create next page token
            let nextPageToken = helpers.createNextPageToken(queryObject,data,this.config.jwtPrivateKey);
            return [{nextPageToken,data},false,200]
        } 
        else return [false,err,500]

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
            var [_id,err] = await this.data.create('inquiry', inquiryObject);
            if (!err) return ['inquiry saved successfully', false,200];
            else return [false, err,500];
        } else {
            return [false, 'missing inquiry property',400];
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
                    document: JSON.stringify({ opened })

                });
                return [res.nModified, err,200];
            }
            else {
                console.log(err);
                return [res, err,500];
            }
        } else {
            return [false, "unvalid request parameters",400];
        }

    }




}