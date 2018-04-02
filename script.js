const https = require("https");
const url = 
    "https://cs490-w18-eai9.herokuapp.com/objects?key=20080918200505149505090708200505144219092420050514&requestObject=Finished%20Goods%20Inventory";
db=require('./dbconnect');

function connected_to_prod() {
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            var total = 0;
            // check out the number of product we have in the factory
            for (var sku in body){
                total += body[sku]["quantityOnHand"];
            }

            if (total >= 20) {
                // send trucks!
                var values = [];
                // determines number of trucks we send out
                for (var i = 0; i < Math.floor(total/20); i++) { 
                    // add 20 new orders to the shipment table for each batch
                    for (var k = 0; k < 20; k++) {
                        // we start at batch 20, arbitrarily, because I don't want to make this work
                        // we start at serial 20, then just increment by k
                        var new_shipment = [(i+1) + 20, (i+1)*20 + k, "Factory in Colorado", "Distribution Center in Colorado", "2018-04-04", "2018-04-05"]
                        values.push(new_shipment);
                    }
                }
                db.connect();
                var sql = 'INSERT INTO Shipment (Batch, Serial, `From`, `To`, ReceiveDt, ShipDt) VALUES ?'
                /* 
                db.query(sql, [values], function (err, result) {
                    if (err) throw err;
                });
                */ 
                console.log(values);

                db.end();
            }
            console.log("Sent " + Math.floor(total/20) + " trucks for " + Math.floor(total/20)*20 + " bikes");
            alert("Sent " + Math.floor(total/20) + " trucks for " + Math.floor(total/20)*20 + " bikes");
            1/0;            
        });
    })
};
/*
function helpme() {
    var sql = 'INSERT INTO Shipment (Batch, Serial, `From`, `To`, ReceiveDt, ShipDt) VALUES ?';
    db.connect();
    var values = [];
    var now = "2014-02-02"
    var new_shipment = [50, 50, "Here", "There", now, now];
    values.push(new_shipment);

    db.query(sql, [values], function (err, result, fields) {
        if (err) throw err;
    });
}

helpme();
function helpme(){
    db.connect();
    db.query("SELECT MIN(Batch) FROM Shipment AS SmallestBatch", function (error, results, fields) {
        if (error) {
            return res.status(400).send({ error: true, message: 'db error' });
        }
    });
    db.end();  
}
*/
// connected_to_prod();

