/*
*
* product route | handle all product related requests
*
*/

const express = require('express');
// const Service = require('../../services/upload');
const multer = require('multer');


module.exports = class Product {
    constructor(container) {
        //create new express route
        this.router = express.Router();
        //get config object from typedi
        this.config = container.get("config");
        //get data object from typedi
        this.data = container.get("data");






        //attach auathentication middleware and post handler
        this.router.post('/',upload.single('image'),this.post);

    }



    // post handler | save image
    post = async (req, res) => {
        console.log('upload request received');
        res.status(200);
        res.end(JSON.stringify({res : 'saved'}));
    }

};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage
})