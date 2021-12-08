// server.js
'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const delay = require('express-delay');
const fs = require('fs');

const json = fs.readFileSync('./data.json');
const data = JSON.parse(json);
const dataCount = data.length;

app.use(cors());
app.use(delay(2000, 500)); // Simulate server response latency

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8081;

const router = express.Router();

router.get('/from/:from/to/:to', function(req, res) {
    let from = Number(req.params.from) || 1;
    const to = Number(req.params.to) || 9;
    let result = [];
    let complete = false;

    if (from <= dataCount) {
        var firstRendered = data[from]._id;

        for (let i = from; i <= to; i++) {
            if (i <= dataCount) {
                if ((data[i])) {
                    result.push(data[i]);
                }
            } else {
                complete = true;
                break;
            }
        }
    }
    else {
        complete = true;
    }
    
    res.json({
        result,
        complete,
        firstRendered
    });

});

app.use('/api', router);

app.listen(port);
console.log('Express API running on ' + port);
