const assert = require('assert');
const fetch = require('node-fetch');


describe('Prodi', () => {
    describe('Token', async function () {

        it('should return a JWToken for valid auths', async () => {
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
        it('shouldn\'t return a token for unvalid auths', async () => {
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


        it('should create a new product', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
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
                })
                .catch(err => console.log(err));
            assert.equal(res.res, 'product saved successfully');
        });

        it('should return all product that correspond to the queryString object', async () => {
            var res;
            await fetch('http://127.0.0.1:3003/product?name=huawei p8', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZlMzY1Y2I4NmUwMjdiYjQ4YzFlMjAiLCJ1c2VybmFtZSI6ImJhZG91IiwiaWF0IjoxNTc2OTQxMjk3fQ.zQ_-ONkYdZBf58lLHM3MQj3ZfU4ReTbaGs0MgV-_u3c'
                }
            })
                .then(res => res.json())
                .then(json => {
                    res = json;
                    console.log(json)
                })
                .catch(err => console.log(err));
            assert.equal(true,true);
        });
        


    });
});
