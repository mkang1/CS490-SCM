var port = process.env.PORT || 3000,
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    html = fs.readFileSync('index.html'),
    app = express(),
    db=require('./dbconnect');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

db.connect()

// default route
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/all', function (req, res) {
    db.query('select * from TestData', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

app.get('/all/:policyID', function (req, res) {
    let policy_id = req.params.policyID;
 
    if (!policy_id) {
        return res.status(400).send({ error: true, message: 'Please provide policyID' });
    }
    
    db.query('SELECT * FROM TestData where policyID=?', policy_id, function (error, results, fields) {
        if (error) throw error;
        return res.send(results[0]);
    });
});

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
