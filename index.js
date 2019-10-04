const express = require('express');
const app = express();



var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];




app.get('/', (req, res) => {
    console.log('---',req.query.name)
    console.log('running...')
    // res.send('Welcome');

    fs.createReadStream('file.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        if(csvrow[0] === req.query.name) {
            console.log(csvrow[1]);
            res.send('Name: ' + csvrow[0] + '\n' + 'Phone: ' + csvrow[1])
        }
        // console.log(csvrow[1]);
        // csvData.push(csvrow);        
    })
    .on('end',function() {
      console.log('Loaded Successfully!');
    });

});

// reading csv



const PORT = process.env.PORT || 5000;
app.listen(PORT);