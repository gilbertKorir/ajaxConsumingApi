$(document).ready(function () {
    getProducts();
   
});
//add or post product
function addProduct() {
    //var url = "/api/Product";
    var objectProduct = {};
    var dynamicUrl = "";
    var methodName = "";

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
    var productId = $("#txtId").val();
    if (productId) {
        //update
        dynamicUrl = "/api/Product/" + productId;
        methodName = "Put";
    } else {
        //save it
        dynamicUrl = "/api/Product";
        methodName = "Post";
    }
    if (objectProduct) {
        $.ajax({
            url: dynamicUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(objectProduct),
            type: methodName,
            success: function (result) {
                clearFields();
                $(".label1").hide();
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
    $('#txtId').val('');
    $('#btnActive').val('');
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
               + "<td><button class='btn btn-success' id='btnEdit' value='Edit' onclick='updateProduct("+ result[i].Id +")'>Edit</button></td>"
               + "<td><button class='btn btn-danger' value='Delete' onclick='deleteProduct(" + result[i].Id + ")'>Delete</button></td>"
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
    $(".label1").show();
    var url = "/api/Product/" + id;

        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "Get",
            success: function (result) {
                $('#txtProductName').val(result.Name);
                $('#txtPrice').val(result.Price);
                $('#txtQuantity').val(result.Quantity);
                $('#btnActive').val(result.Active);
                $("#txtId").val(result.Id);
                //clearFields();
                //alert(result);
                getProducts()
            },
            error: function (msg) {
                alert(msg);
            }
        });
    
}

