var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var PORT = 8080;

var app = express();

var NOTES_URL = '/notes';

app.get(NOTES_URL, (req, res) => {
    res.json({
        notes: []
    });
});

app.post(NOTES_URL, (req, res) => {
    res.json({
        status: 'added'
    });
});

app.delete(NOTES_URL, (req, res) => {
    res.json({
        status: 'deleted'
    });
});

app.get('*', function(req, res) {
    res.json({
        hello: 'world'
    });
});

var frontend;
if (process.env['PRODUCTION']) {
    frontend = express.static(path.resolve(__dirname, 'dist'));
} else {
    frontend = proxy('http://localhost:8081');
}
app.get('*', frontend);

app.listen(PORT, function () {
    console.log('listening on port', PORT);
    console.log('Wojtek Jestes Super Chłopak!');
});