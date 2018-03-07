var products = [
    {
		id: 1,
		name: 'Enduro250',
		color: 'Black',		
		stock: [
			{
				warehouse: 1,
				amount: 20				
			},
			{
				warehouse: 2,
				amount: 5
			}
		]		
	},	
	{
		id: 2,
		name: 'Enduro550',
		color: 'Black',
		stock: [
			{
				warehouse: 1,
				amount: 1
			},
			{
				warehouse: 2,
				amount: 2
			}
		]		
	},
	{
		id: 3,
		name: 'Moto300',
		color: 'Black',
		stock: [
			{
				warehouse: 1,
				amount: 10
			},
			{
				warehouse: 2,
				amount: 11
			}
		]	
	},
	{
		id: 4,
		name: 'Moto450',
		color: 'Black',
		stock: [
			{
				warehouse: 1,
				amount: 0
			},
			{
				warehouse: 2,
				amount: 8
			}
		]	
	}
];		

var shipments = [
    {
        id: 1,
        address: '280 Phillip Street, Waterloo, Ontario, Canada',
        estimatedDate: '2018-03-10',
        warehouse: [1]
    },
    {
        id: 2,
        address: '2348 Eagle Rd, Toronto, Canada',
        estimatedDate: '2018-03-15',
        warehouse: [1, 2]
    },
    {
        id: 3, 
        address: '1568 Bear Rd, Ontario, Canada', 
        estimatedDate: '2018-02-17',
        warehouse: [1, 2]
    },
    {
        id: 4, 
        address: '167 Bay Street, Hamilton, Ontario, Canada',
        estimatedDate: '2018-02-18',
        warehouse: [1, 2]
    }
]


var warehouses = [
    {
        id: 1,
        name: 'North Warehouse',
        transporters: [
            {
                id: 2,
                name: 'Go Truck'
            }
        ]
    },
    {
        id: 2,
        name: 'South Warehouse',
        transporters: [
            {
                id: 1,
                name: 'Fast & Safe'
            },
            {
                id: 2,
                name: 'Go Truck'
            }
        ]
    }
];

// AUX FUNCTIONS


// get warehouses from an id
var getWharehouse = function(id) {
	console.log("getWarehosue = function("+id+");");
    // get all the warehouses and it keeps the ones that match
    var warehouseById = warehouses.filter(
        function(item) {
			console.log("item.id="+item.id);
			return item.id == id;
        }
    )
	console.log("number of warehouses in the list:"+warehouseById.length);
    // If the filter gets no result, then we return null. Else we return the first one.
    if (warehouseById.length === 0) {
        console.log("I'm going to return null beacuse 0 warehouses");
		return null;
    }
    else {
		console.log("I'm goinf to return warehouse="+warehouseById[0]);
        return warehouseById[0];
    }
}


// Calculate if a product has stock
var stockOfProduct = function(idProduct, idWarehouse) {
    // Gets all the products and it keeps the ones who have a matching id
    var productById = products.filter(
        function (item) {
            return item.id == idProduct;
        }
    )
    if (productById.length === 0) {
        return 0;
    }
    else {
        var total = 0;
        // Go through all the warehouses that have the product
        // if idWarehouse is '' means "all" so then you need to add them
        $(productById[0].stock)
            .each(
                function() {
                    if (idWarehouse === '' || idWarehouse == this.warehouse) {
                        total += this.amount
                    }
                }
            )
        return total;
    }
}
// END AUX FUNCTIONS


// FILL HTML FUNCTIONS

// Fill the list ul#productList

var oProductList = $('#productList');
if (oProductList.length) {
    var allProducts = '';
    // Go through the product list and send it to the .html who displays it 
    $(products).each(
        function () {
            var sName = '<td>' + this.name + '</td>';
			var sColor = '<td>' + this.color + '</td>';
			var sWarehouse = '';
			$(this.stock).each(
                    function () {
                        oWarehouse = getWharehouse(this.warehouse);
                        console.log("oWarehouse value: "+oWarehouse);
						sWarehouse += '<option value="' + this.warehouse + '">' + oWarehouse.name + '</option>';
                    }
                );
            sWarehouse = '<select class="filterWarehouse"><option value="">All</option>' + sWarehouse + '</select>';
            sWarehouse = '<td>' + sWarehouse + '</td>';		 sSearchButton = '<td><button class="showStock" data-product="' + this.id + '">Calc Stock</button></td>';
			
			allProducts += '<tr>'+ sName + sColor + sWarehouse + '<td id="stock"></td>'+ sSearchButton+'</tr>';	
        }
    )
    // Mandarlo al navegador
    oProductList.html(allProducts);

    // Check if there is stock
    $(oProductList)
        .find('.showStock')
        .bind('click',
            function() {
                var idProduct = $(this).data('product');
				var myTable = document.getElementById('myTable');
                //Select warehouse
                var idWarehouse = $(this)
                    .closest('tr')
                        .find('.filterWarehouse').val();
				console.log("idProduct="+idProduct+" and idWarehouse="+idWarehouse);		
                var totalStock = stockOfProduct(idProduct, idWarehouse);
                if (totalStock) {
					myTable.rows[idProduct].cells[3].innerHTML = totalStock;
                }
                else {	
                    myTable.rows[idProduct].cells[3].innerHTML = 0;
                }
            }
        );
}

// Rellenar la tabla <tbody id="deliveryList">
var oDeliveryList = $('#deliveryList');
if (oDeliveryList.length) {
    var allShipments = '';
    // Recorrer la lista de envíos y confeccionar la línea de html que lo muestra
    $(shipments).each(
        function () {
            var sDate = '<td>' + this.shipDate + '</td>';
            var sAddress = '<td>' + this.address + '</td>';
            // Almacenes
            var sWarehouse = '';
            $(this.warehouse).each(
                function() {
                    var wharehouse = getWharehouse(this);
                    sWarehouse += '<option value="' + this + '">' + wharehouse.name + '</option>';
                }
            )
            sWarehouse = '<select class="showTransporter"><option value="">Select option</option>' + sWarehouse + '</select>';
            sWarehouse = '<td>' + sWarehouse + '</td>';
            allShipments += '<tr>' + sDate + sAddress + sWarehouse + '<td class="transport"></td><td class="process"></td></tr>';
            //console.log(this);
        }
    )
    // Mandarlo al navegador
    oDeliveryList.html(allShipments);
    // Control de interacción (selección de almacén)
    $(oDeliveryList)
        .find('.showTransporter')
        .bind('change',
            function() {
                var idWarehouse = this.value;
                var oTransport = $(this)
                    .closest('tr')
                    .find('.transport');
                // Transportistas
                var htmlTransport = '';
                if (idWarehouse !== '') {
                    var warehouse = getWharehouse(idWarehouse);
                    $(warehouse.transporters).each(
                        function () {
                            htmlTransport += '<option value="' + this.id + '">' + this.name + '</option>';
                        });
                    htmlTransport = '<select class="selectTransporter"><option value="">Select option</option>' + htmlTransport + '</select>';
                }
                oTransport.html(htmlTransport);
                // Control de interacción (selección del transportista)
                $(oDeliveryList)
                    .find('.selectTransporter')
                    .bind('change',
                        function () {
                            // Si hay algún transportista seleccionado poner el botón de procesar
                            var htmlProcess = '';
                            if ($(this).val()) {
                                htmlProcess = '<button class="ship">Process</button>';
                            }
                            oTransport
                                .closest('tr')
                                .find('.process')
                                .html(htmlProcess);
                        });
        });

    // Botón de procesado automático de envíos
    $('#automaticShip')
        .on('click', function () {
            alert('All automatic shipments have been processed');
        });
    // Poner la funcionalidad al botón de envío de pedido
    $('#deliveryList')
        .on('click', '.ship', function () {
            alert('Ship processed');
        });

}