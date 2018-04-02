var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var data="";

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                data = rawFile.responseText;
//                console.log(data);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("file:///Users/10034/Desktop/data.txt"); //Change this for the path where the file is

console.log(data);

function button() {
	var body = JSON.parse(data);
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
//      console.log(values);
	}
    console.log(total);
};

button();
