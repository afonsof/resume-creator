var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();
app.set('port', (process.env.PORT || 5000));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('site'));

app.post('/', function (req, res) {
    var template = fs.readFileSync('templates/resume.ejs', 'utf8');
    var data = JSON.parse(req.body.json);
    res.send(ejs.render(template, data, {}));
});

app.listen(app.get('port'), function () {
    console.log('Running!');
});