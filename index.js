const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8080;
const NOTES_URL = '/notes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.get(NOTES_URL, (req, res) => {
//     res.json({
//         notes: note
//     });
// });

// app.post(NOTES_URL, (req, res) => {
//     res.json({
//         status: 'added'
//     });
// });

// app.delete(NOTES_URL, (req, res) => {
//     res.json({
//         status: 'deleted'
//     });
// });

let notes = [];

app.get(NOTES_URL, (req, res) => {
    res.json({notes: notes});
});

app.post(NOTES_URL, (req, res) => {
    const note = req.body.note;
    notes.push(note);
    res.json({value: note});
});

app.delete(NOTES_URL, (req, res) => {
    const note = req.body.note;
    const index = notes.indexOf(note);
    
    notes = notes.filter( (note, i) => {return i !== index});
    res.json({ deleted: note });
});

let frontend;
if (process.env['PRODUCTION']) {
    console.log('PRODUCTION');
    frontend = express.static(path.resolve(__dirname, 'dist'));
} else {
    console.log('NOT PRODUCTION');
    frontend = proxy('http://localhost:8081');
}
app.get('*', frontend);

// app.listen(PORT, () => {
//     console.log('listening on port', PORT);
//     console.log('Wojtek Jestes Super Chłopak!');
// });