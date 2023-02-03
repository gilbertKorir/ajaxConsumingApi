$(document).ready(function () {
    getProducts();
});
//add or post product
function saveProduct() {
    var url = "/api/Product";
    var objectProduct = {};

    objectProduct.Name = $('#txtProductName').val();
    objectProduct.Price = $('#txtPrice').val();
    objectProduct.Quantity = $('#txtQuantity').val();
    var btnAct = $('#btnActive').is(':checked');
    if (btnAct) {
        objectProduct.Active = 1;
    }
    else {
        objectProduct.Active = 0
    }

    if (objectProduct) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectProduct),
            type: "Post",
            success: function (result) {
                clearFields();
                //alert(result);
                getProducts()
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}


//clear fields function
function clearFields() {
    $('#txtProductName').val('');
    $('#txtPrice').val('');
    $('#txtQuantity').val('');
}

//get all products
function getProducts() {
    var url = "/api/Product";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            //alert(result);
            //alert(JSON.stringify(result));

            if (result) {
                $('#tbodyProduct').html(''); //to only append once from database
                var row = '';
                for(let i=0; i < result.length; i++){
           row = row
            + "<tr>"
            + "<td>" + result[i].Name + "</td>"
            + "<td>" + result[i].Price + "</td>"
            + "<td>" + result[i].Quantity + "</td>"
               + "<td>" + result[i].Active + "</td>"
               + "<td><button class='btn btn-success' onclick='updateProduct(" + result[i].Id + ")'>Edit</button></td>"
               + "<td><button class='btn btn-danger' onclick='deleteProduct(" + result[i].Id + ")'>Delete</button></td>"
            + "</tr>";
                }
        if (row != '') {
        $('#tbodyProduct').append(row);
            }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

//delete product
function deleteProduct(id) {
    var url = "/api/Product/" + id;
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Delete",
            success: function (result) {
                clearFields();
                alert(result);
                getProducts()
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
//update product
function updateProduct(id) {
    var url = "/api/Product/" + id;
    var objectProduct = {};

    objectProduct.Name = $('#txtProductName').val();
    objectProduct.Price = $('#txtPrice').val();
    objectProduct.Quantity = $('#txtQuantity').val();
    var btnAct = $('#btnActive').is(':checked');
    if (btnAct) {
        objectProduct.Active = 1;
    }
    else {
        objectProduct.Active = 0
    }

    if (objectProduct) {
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectProduct),
            type: "Put",
            success: function (result) {
                clearFields();
                //alert(result);
                getProducts()
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
}