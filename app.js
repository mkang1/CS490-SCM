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
    return res.render('index');
});

router.get('/inventory', function (req, res) {
    var productList = [];
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
        return res.render('productIndex', {"productList": productList}); 
        }
        // return res.send(results);
    });
});

router.get('/view1', function(req, res){
    var productList = [];
    db.query('select * from Product where Spoof=1', function (error, results, fields) {
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
        return res.render('view1', {"productList": productList}); 
        }
        // return res.send(results);
    }); 
})

router.get('/view1a', function(req, res){
    var currentList = [];
    db.query('select * from Shipment WHERE Spoof=1', function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                // Create an object to save current row's data
                var product = {
                    'Batch':results[i].Batch,
                    'Serial':results[i].Serial,
                    'From':results[i].From,
                    'To':results[i].To,
                    'ReceiveDt':results[i].ReceiveDt,
                    'ShipDt':results[i].ShipDt,
                    'Completed':results[i].Completed
                }
                // Add object into array
                currentList.push(product);
            }
        return res.render('view1a', {"currentList": currentList}); 
        }
        // return res.send(results);
    });
});

router.get('/view2', function(req, res){
    var productList = [];
    db.query('select * from Product where Spoof=3', function (error, results, fields) {
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
        return res.render('view2', {"productList": productList}); 
        }
        // return res.send(results);
    }); 
})

router.get('/view2a', function(req, res){
    var currentList = [];
    db.query('select * from Shipment WHERE Spoof=3', function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                // Create an object to save current row's data
                var product = {
                    'Batch':results[i].Batch,
                    'Serial':results[i].Serial,
                    'From':results[i].From,
                    'To':results[i].To,
                    'ReceiveDt':results[i].ReceiveDt,
                    'ShipDt':results[i].ShipDt,
                    'Completed':results[i].Completed
                }
                // Add object into array
                currentList.push(product);
            }
        return res.render('view2a', {"currentList": currentList}); 
        }
        // return res.send(results);
    });
});


router.get('/inventory/serial', function (req, res) {
    var serial = req.query.serial;
     if (!serial) {
        return res.redirect("/inventory");
        }
    db.query('SELECT * FROM Product where serial=?', serial, function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            if (results.length == 1) {
                var product = {
                    'Serial':results[0].Serial,
                    'Model':results[0].Model,
                    'CurLocation':results[0].CurLocation
                }
            return res.render('productSerial', {"product": product});
            }
            else {
                return res.status(400).send({ error: true, message: 'not found' });
            }
            
            // return res.send(results[0]);
        }
    });
});

router.get('/current', function(req, res){
    var currentList = [];
    db.query('select * from Shipment', function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                // Create an object to save current row's data
                var product = {
                    'Batch':results[i].Batch,
                    'Serial':results[i].Serial,
                    'From':results[i].From,
                    'To':results[i].To,
                    'ReceiveDt':results[i].ReceiveDt,
                    'ShipDt':results[i].ShipDt,
                    'Completed':results[i].Completed
                }
                // Add object into array
                currentList.push(product);
            }
        return res.render('current', {"currentList": currentList}); 
        }
        // return res.send(results);
    });
});


router.get('/current/batch', function (req, res) {
    var currentList = [];
    var batch = req.query.batch;
     if (!batch) {
        return res.redirect("/current");
        }
    db.query('SELECT * FROM Shipment where batch=?', batch, function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                var product = {
                    'Batch':results[i].Batch,
                    'Serial':results[i].Serial,
                    'From':results[i].From,
                    'To':results[i].To,
                    'ReceiveDt':results[i].ReceiveDt,
                    'ShipDt':results[i].ShipDt,
                    'Completed':results[i].Completed
                }
                currentList.push(product);
            
            }
            return res.render('current', {"currentList": currentList});
            // return res.send(results[0]);
        }
    });
});
router.get('/return', function(req, res){
    var returnList = [];
    db.query('select * from Returns', function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            for (var i = 0; i < results.length; i++) {
                // Create an object to save current row's data
                var product = {
                    'ReturnID':results[i].ReturnID,
                    'Serial':results[i].Serial,
                    'ReturnLocation':results[i].ReturnLocation
                }
                // Add object into array
                returnList.push(product);
            }
        return res.render('return', {"returnList": returnList}); 
        }
        // return res.send(results);
    });
});

router.get('/return/serial', function(req, res){
    var serial = req.query.serial;
    if (!serial) {
        return res.redirect("/return");
    }
    db.query('insert into Returns (Serial, ReturnLocation) values (?, (select CurLocation from Product where Serial = ?))', [serial, serial], function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            return res.redirect("/return");
        }
    });
});


router.get('/exchange', function(req, res){
    return res.render('exchange');
});

router.get('/exchange/serial', function(req, res){
    var serial1 = req.query.serial1;
    var serial2 = req.query.serial2;
    if (!serial1) {
        return res.redirect("/exchange");
    }
    if (!serial2) {
        return res.redirect("/exchange");
    }
    db.query('insert into Returns (Serial, ReturnLocation) values (?, (select CurLocation from Product where Serial = ?)); update Product set CurLocation = "SOLD" where Serial = ?', [serial1, serial1, serial2], function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
        else {
            return res.redirect("/exchange");
        }
    });
});
router.get('/recycling', function(req, res){
    return res.render('recycling');
});

router.get('/support', function(req, res){
    return res.render('support');
});

router.get('/manual', function(req, res) {
    return res.render('manual');
});
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
