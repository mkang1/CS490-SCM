var port = process.env.PORT || 3000,
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    // html = fs.readFileSync('index.html'),
    app = express(),
    db=require('./dbconnect');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'pug');

db.connect();

var router = express.Router();

app.use(express.static('views'));
// default route
router.get('/', function(req, res) {
    res.sendFile('views/index.html' , { root : __dirname});
});

router.get('/inventory.html', function (req, res) {
    var productList = [];
    var test = req.query.serial;
    if (typeof test !== 'undefined') {
        res.redirect("/inventory.html/" + test);
    }
    db.query('select * from Product', function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                // Create an object to save current row's data
                var product = {
                    'Serial':results[i].Serial,
                    'Model':results[i].Model,
                    'CurLocation':results[i].CurLocation
                }
                // Add object into array
                productList.push(product);
            }
        res.render('productIndex', {"productList": productList}); 
        }
        // return res.send(results);
    });
});


router.get('/inventory.html/:serial', function (req, res) {
    var serial = req.params.serial;

router.get('/current', function(req, res){
    res.render('current');
})

router.get('/return', function(req, res){
    res.render('return');
})

router.get('/exchange', function(req, res){
    res.render('exchange');
})

router.get('/recycling', function(req, res){
    res.render('recycling');
})

router.get('/support', function(req, res){
    res.render('support');
})

// app.get('/product/:serial', function (req, res) {
//     var serial = req.params.serial;
    
//     if (!serial) {
//         return res.status(400).send({ error: true, message: 'Please provide Serial' });
//     }
    
//     db.query('SELECT * FROM Product where serial=?', serial, function (error, results, fields) {
//         if (error) {
//             return res.status(400).send({ error: true, message: 'db error' });
//         }
//         else {
//             if (results.length == 1) {
//                 var product = {
//                     'Serial':results[0].Serial,
//                     'Model':results[0].Model,
//                     'CurLocation':results[0].CurLocation
//                 }
//             res.render('productSerial', {"product": product});
//             }
//             else {
//                 return res.status(400).send({ error: true, message: 'not found' });
//             }
            
//             // return res.send(results[0]);
//         }
//     });
// });


router.get('/shipment', function (req, res) {

/*app.get('/shipment', function (req, res) {
>>>>>>> 5895e9133a09e6227dbd9a254befd12074ad7591
    db.query('select * from Shipment', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});*/

app.use('/', router);

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(port, function () {
    console.log('Node app is running on port 3000');
});


// var log = function(entry) {
//     fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
// };

// var server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         var body = '';

//         req.on('data', function(chunk) {
//             body += chunk;
//         });

//         req.on('end', function() {
//             if (req.url === '/') {
//                 log('Received message: ' + body);
//             } else if (req.url = '/scheduled') {
//                 log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
//             }

//             res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
//             res.end();
//         });
//     } else {
//         res.writeHead(200);
//         res.write(html);
//         res.end();
//     }
// });


// // Listen on port 3000, IP defaults to 127.0.0.1
// server.listen(port);

// // Put a friendly message on the terminal
// console.log('Server running at http://127.0.0.1:' + port + '/');
