//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



var productsarray;
var p = window.localStorage.getItem('producto');


function showProduct(producto) {

    
    let auto = "";
    let src = "img/" + producto.name ;
        {

            auto = `Nombre:` + " " + producto.name + `<br/>` +
                `Descripción:` + " " + producto.description + `<br/>` +
                `Precio:` + " " + producto.cost + " " + producto.currency + `<br/>` +
                `Mas Vendido:` + " " + producto.soldCount + `<br/>` +
                '<img src="' + src + '" width="200" height="300">';

        }



        document.getElementById("lista").innerHTML += auto;
    }




document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL_G + p + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;


            showProduct(productsarray);
        }
    });

});