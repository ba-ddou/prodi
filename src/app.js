/*
* App entry point
*
*
*/

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('request received on GET /');
    res.status(200);
    res.send('hello, world!');
});

app.listen(3000, _ => console.log('server is listening on port 3000'));