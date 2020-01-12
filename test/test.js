const assert = require('assert');
const fetch = require('node-fetch');


describe('Prodi', async () => {
    // await new Promise((resolve,reject)=>{
    //     setTimeout(resolve,1000);
    // });
    describe('Token', async function () {

        it('should rspond with a JWToken for valid auths', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/token', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: "badou",
                    password: "lemmeinside"
                })
            })
                .then(res => res.json())
                .then(json => {
                    res = json;

                })
                .catch(err => console.log(err));
            assert.equal(typeof res.token, 'string');
        });
        it('should respond with an Error for unvalid auths', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/token', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: "badou",
                    password: "wrongpassword"
                })
            })
                .then(res => res.json())
                .then(json => {
                    res = json;

                })
                .catch(err => console.log(err));
            assert.equal(typeof res.token, 'undefined');
        });


    });
    describe('Product', () => {
        var _id = undefined;
        
        it('should Create a new product', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
                },
                body: JSON.stringify({
                    name: "huawei p8",
                    description: "huawei p8 lite 2017",
                    price: 120,
                    category: "smartphone",
                    tags: ["smartphone", "huawei", "mid-range"]

                })
            })
                .then(res => res.json())
                .then(json => {
                    res = json;
                    _id = json._id;
                })
                .catch(err => console.log(err));
            assert.equal(typeof res._id, 'string');
        });

        it('should Read all products that correspond to the queryString object', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
                }
            })
                .then(res => res.json())
                .then(json => {
                    res = json;
                })
                .catch(err => console.log(err));
            assert.equal(res.data.length > 0, true);
        });

        it('should Update a target product', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
                },
                body: JSON.stringify({
                    _id,
                    productObject: {
                        description: "updated description",
                    }

                })
            })
                .then(res => res.json())
                .then(json => {
                    res = json;
                })
                .catch(err => console.log(err));
            assert.equal(res.res, 'successfully updated 1');
        });

        it('should Delete a target product', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
                },
                body: JSON.stringify({
                    _id
                })
            })
                .then(res => res.json())
                .then(json => {
                    res = json;
                })
                .catch(err => console.log(err));
            assert.equal(res.res, 'successfully removed 1');
        });


    });
});
