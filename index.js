var express = require('express');
var path = require('path');
var PORT = 8080;

var app = express();

// app.get('*', function(req, res) {
//     res.json({
//         hello: 'world'
//     });
// });

app.get('*', express.static(path.resolve(__dirname, 'dist')));

app.listen(PORT, function () {
    console.log('listening on port', PORT);
    console.log('Wojtek Jestes Super Chłopak!');
});