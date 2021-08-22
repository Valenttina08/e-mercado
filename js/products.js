function datosDeAutos(array) {

    document.getElementById("lista").innerHTML = "";

    let autos = [];

    for (let i = 0; i < array.length; i++) {

        let producto = array[i];

        autos = `Nombre:` + " " + producto.name + `<br/>` +
                `Descripción:` + " " + producto.description + `<br/>`+
                `Precio:` + " " + producto.cost + " " + producto.currency + `<br/>` +
                `<img width= 400px src=  "`+ producto.imgSrc + `"`  + `<br/>` + `<hr>`
            
            
        
    
        document.getElementById("lista").innerHTML += autos;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productsarray = resultado.data;

            datosDeAutos(productsarray);
        }
        
    });

});