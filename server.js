var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var router = express.Router();

var app = express();
var host = 'https://www.rijksmuseum.nl/api/nl/collection';

var query = 'rembrandt';
var data = [];
var detail = [];

// View Engine
app.set('view engine' , 'ejs' );
app.set('views' , path.join(__dirname, 'views'));

// Static Path
app.use(express.static(path.join(__dirname, 'static')));

// Body Parser (Do I need This???)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routers/pages
app.get('/', home);
app.get('/object/:id', detailPage);

app.listen(3000);

function home(req, res) {
    request(host + "?q=" + query + '&key=NG2q9L0R&format=json&ps=5&type=', function (error, response, body) {
        if(!error && response.statusCode == 200) {
            data = JSON.parse(body);
            res.render('index', {
                data: data
            });
        }
    });
}

function detailPage(req, res) {
    request('https://www.rijksmuseum.nl/api/nl/collection/' + req.params.id + '?key=NG2q9L0R&format=json', function (error, response, body) {
        if(!error && response.statusCode == 200) {
            detail = JSON.parse(body);
            res.render('detail', {
                data: detail
            });
        }
    });
}
