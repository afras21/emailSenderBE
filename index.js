const express = require('express');
const app = express();
var fs = require('fs');
var parse = require('csv-parse');
var csvData = [];

// for empty page
app.get('/', (req, res) => {
    res.send('Welcome')
});

// for search key
app.get('/contacts', (req, res) => {
    fs.createReadStream('file.csv')
        .pipe(parse({ delimiter: ',' }))
        .on('data', function (csvrow) {

            if (req.query && csvrow[0] === req.query.name) {
                console.log(csvrow[1]);
                res.send('Name: ' + csvrow[0] + '\n' + 'Phone: ' + csvrow[1])
            }
            csvData.push(csvrow);
        })
        .on('end', function () {
            console.log('Loaded Successfully!');
        });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT);