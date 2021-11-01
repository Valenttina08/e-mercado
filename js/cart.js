//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

articulosarray = {};


function subtotaltotal(x, i) {
    let cantidad = parseInt(document.getElementById(`cant${i}`).value);

    let moneda = articulosarray[i].currency;

    if (moneda == "USD") {
        subtotal = x * 40 * cantidad
    }
    else {
        subtotal = x * cantidad
    }
    

    document.getElementById(`sub${i}`).innerHTML = `Subtotal: UYU` + subtotal;

}


function showarticulos(articulo) {
    
    let carrito = "";

    for (let i = 0; i < articulo.length; i++){
        let art = articulo[i];


        if (art.currency === "USD") {
            subtotal = art.unitCost * 40 * art.count
            
        } else {
            subtotal = art.unitCost * art.count
        }

        carrito +=
        
            ` 
            <img src="` + art.src + `" width="150px" heigth="150px" class="img-thumbnail">

            <div class="col">
            <div class="mb-1">
            Nombre:` + art.name +`<br/>

            Cantidad:  <input style="width:40px" type="number" id="cant${i}" value="` + art.count + `" onchange="subtotaltotal(${art.unitCost},${i})" min="1"> <br/>
            
            Moneda: `+ art.currency + `<br/>
    
            Costo: `+ art.unitCost + `<br/>
            <p class="text-muted" id="sub${i}"> Subtotal: UYU` +" "+ subtotal +`</p> <hr/>

            <div/>
            
            <div/>`   
    
    
    document.getElementById("articulo").innerHTML = carrito;
    }
    }

document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosarray = resultObj.data.articles;

            showarticulos(articulosarray);
        }
        
    })

});