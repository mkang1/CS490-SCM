var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'aazoxufsbhlrky.cnafio4xiyic.us-east-2.rds.amazonaws.com',
  user     : 'cs490',
  password : 'mypassword',
  database : 'SCM',
  port	   : '3306',
  multipleStatements: true
});

module.exports=connection;
// connection.connect()

// connection.query('select * from TestData', function (err, rows, fields) {
//   if (err) throw err

//   console.log(rows)

// })

// connection.end()