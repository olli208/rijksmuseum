var express = require('express');
var compression  = require('compression');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var router = express.Router();

var app = express();
var host = 'https://www.rijksmuseum.nl/api/nl/collection';

var query = 'rembrandt';
var data = [];
var detail = [];

app.use(compression({
        threshold: 0,
        filter: () => true,// Compress all assets by default
}));

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
app.get('/:result/:id', detailPage);
app.post('/result', search);

app.listen(3000, function(){
    console.log('APP IS HERE: http://localhost:3000');
});

function home(req, res) {
    // query = req.body.userName;
    request(host + "?q=" + query + '&key=NG2q9L0R&format=json&ps=10&type=', function (error, response, body) {
        if(!error && response.statusCode === 200) {
            data = JSON.parse(body);
            res.render('index', {
                data: data
            });
        }
    });
}

function detailPage(req, res) {
    request('https://www.rijksmuseum.nl/api/nl/collection/' + req.params.id + '?key=NG2q9L0R&format=json', function (error, response, body) {
        if(!error && response.statusCode === 200) {
            detail = JSON.parse(body);
            res.render('detail', {
                data: detail
            });
        }
    });
}

function search(req, res){
    var query = req.body.id;
    // res.redirect('/object/' + query);
    request(host + "?q=" + query + '&key=NG2q9L0R&format=json&ps=10&imgonly=true', function (error, response, body) {
        if(!error && response.statusCode === 200) {
            data = JSON.parse(body);
            res.render('index', {
                data: data
            });
        }
    });
}
