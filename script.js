const https = require("https");
const url = 
    "https://cs490-w18-eai9.herokuapp.com/objects?key=20080918200505149505090708200505144219092420050514&requestObject=Finished%20Goods%20Inventory";
db=require('./dbconnect');

function button() {
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            console.log( body["0000000250"]);
            console.log( body );
            var total = 0;
            for (var sku in body){
                total += body[sku]["quantityOnHand"];
            }

            if (total >= 20) {
                var values = [];
                // determines number of trucks we send out
                for (var i = 0; i < Math.floor(total/20); i++) { 
                    // add 20 new orders to the shipment table
                    for (var k = 0; k < 20; k++) {
                        // we start at batch 20, arbitrarily, because I don't want to make this work
                        // we start at serial 20, then just increment by k
                        var new_shipment = [(i+1) + 20, (i+1)*20 + k, "Here", "There", "2018-04-04", "2018-04-02"]
                        values.push(new_shipment);
                    }
                }
//                console.log(values);
            }
            console.log(total);
        });
    })
};

button();
