var express = require('express');
var ejs = require('ejs');
var fs = require('fs');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('site'));

app.post('/', function (req, res) {
    var data = JSON.parse(req.body.json);
    data.render = function(obj){
        try {

            if (obj[data.language]) {
                return obj[data.language];
            }
            return obj.default;
        }
        catch(e) {
            return "";
        }
    };
    res.render('resume', data);
});

app.listen(app.get('port'), function () {
    console.log('Running!');
});