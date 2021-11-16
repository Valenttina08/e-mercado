//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

articulosarray = {};

var pagar="";
var numTarjeta = document.getElementById("numtarjeta").value;
var nombre = document.getElementById("nombre").value;
var cvv = document.getElementById("cvv").value;
var banco = document.getElementById("banco").value
var entidad = document.getElementById("Entidad").value;
var cuenta = document.getElementById("cuenta").value;




function validarCampo(event) {
    
    var campo = event.target;
    if (campo.value != "") {
        campoOk(campo);

    } else {
        campoError(campo);
        
    }
    
}


function campoError(campo) {

    campo.setAttribute("class","formulario__input input-error")
}
    


function campoOk(campo) {

    campo.setAttribute("class","formulario__input input-ok")
}

/*

function bloqueoBoton(event) {
    var boton = event.target;
    var botonTrans = document.getElementsByName("transferencia");
    var botonCred = document.getElementsByName("credito");

    if (boton.name == "credito" && botonTrans[0].disabled) {
        //boton.setAttribute("disabled", "");
        botonTrans[0].removeAttribute("disabled");
        


        cuenta.disabled = true;
        entidad.disabled = true;
        comprobante.disabled = true;

    } else if (boton.name == "credito" && !botonTrans[0].disabled) {
        pagar = "credito";
        alert(pagar)

        botonTrans[0].setAttribute("disabled", "");
        numTarjeta.disabled = false;
        nombre.disabled = false;
        cvv.disabled = false;
        cardBanco.disabled = false;
    }

    if (boton.name == "transferencia" && botonCred[0].disabled) {
        //boton.setAttribute("disabled", "");
        botonCred[0].removeAttribute("disabled");
        pagar = "transf";
        alert(pagar)

        cuenta.disabled = false;
        entidad.disabled = false;
        comprobante.disabled = false;
 

    } else if (boton.name == "transferencia" && !botonCred[0].disabled) {
        botonCred[0].setAttribute("disabled", "");
        numTarjeta.disabled = true;
        nombre.disabled = true;
        cvv.disabled = true;
        cardBanco.disabled = true;
    }
    

}


*/

function habilitarBotones(event) {
    
    var calle = document.getElementById("calle").value;
    var numero = document.getElementById("numero").value;
    var esquina = document.getElementById("esquina").value;
    var pais = document.getElementById("pais").value

    if (calle == "" || numero == "" || esquina == "" || pais == "") {
        document.getElementById("error").setAttribute("class", "mensaje-activo");  
    } else {
        document.getElementById("error").setAttribute("class", "mensaje");
        event.target.setAttribute("data-toggle", "modal");
        var botonCredito = document.getElementsByName("credito");
        var bontonTransf = document.getElementsByName("transferencia");

        botonCredito[0].removeAttribute("disabled");
        bontonTransf[0].removeAttribute("disabled");
    }

   
}


function validarCredito() {
    pagar = "credito";
alert(pagar)

    cuenta.disabled = true;
    entidad.disabled = true;
    


    numTarjeta.disabled = false;
    nombre.disabled = false;
    cvv.disabled = false;
    banco.disabled = false;
}

function validarTransf() {
    pagar = "transf";
alert(pagar)

    cuenta.disabled = false;
    entidad.disabled = false;
   


    numTarjeta.disabled = true;
    nombre.disabled = true;
    cvv.disabled = true;
    banco.disabled = true;

}

/*
function compra(event) {
    
        if (!validacion()) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            alert("¡Compra exitosa!")
         //   document.getElementById("feedback").innerHTML = "";
        }
    }
  
 


function compra() {

    if (pagar === "credito") {
        alert("1")
        cuenta.disabled = true;
        entidad.disabled = true;
        comprobante.disabled = true;

        if (numtarjeta === "" || nombre === "" || cvv === "" || fecha === "") {
            alert("Los Campos no pueden estar vacios")
            return false

          //  document.getElementById("error").setAttribute("class", "mensaje-activo");
        } else {
            alert("¡Compra exitosa!")
            return true
        }
         } if (pagar == "transf") {
            alert("1")

             if (entidad == "" || cuenta == "" || comprobante == "") {
            alert("Los Campos no pueden estar vacios")
          //  document.getElementById("error").setAttribute("class", "mensaje-activo");
        } else {
            alert("¡Compra exitosa!")
            return true
        }
        
    }
}
    
    */





function subtotaltotal(x, i) {
    let cantidad = parseInt(document.getElementById(`cant${i}`).value);
    let moneda = articulosarray[i].currency;

    if (moneda == "USD") {
        subtotal = x * 40 * cantidad
    }
    else {
        subtotal = x * cantidad
    }
    
   
    document.getElementById(`sub${i}`).innerHTML = subtotal;
    subtotalgeneral()
    envio()
    

}


function subtotalgeneral() {

    let subtot = 0;
    let subart = document.getElementsByClassName("subtotal");
    

    for (let i = 0; i < subart.length; i++) {
        subtot += parseInt(subart[i].innerHTML);     
    }

    document.getElementById(`Subtotal`).innerHTML = subtot;
}

function envio() {
    
    let envio = document.getElementById("totalEnvio");
    let elements = document.getElementsByName("envio");

    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envios = elements[i].value;
            
        if (envios == "5") {
                envio.innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML) * 0.15)
            }

        if (envios == "8") {
                envio.innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML) * 0.07)
            }

        if (envios == "15") {
                envio.innerHTML = (parseInt(document.getElementById("Subtotal").innerHTML) * 0.05)
            }

        }
    }

    total()
}


function total() {
    let sub = parseInt(document.getElementById("Subtotal").innerHTML)
    let envio = parseInt(document.getElementById("totalEnvio").innerHTML)
    let total = 0
    

    total = sub + envio
    document.getElementById("total").innerHTML = total

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
            <div class="col">
            <img src="` + art.src + `" width="150px" heigth="150px" class="img-thumbnail">
            </div>
            

            <div class="col">
            <div class="mb-1">
            Nombre:` + art.name +`<br/>

            Cantidad:  <input style="width:40px" type="number" id="cant${i}" value="` + art.count + `" onchange="subtotaltotal(${art.unitCost},${i})" min="1"> <br/>
            
            Moneda: `+ art.currency + `<br/>
    
            Costo: `+ art.unitCost + `<br/>
            <p > Sub Total: <span id="sub${i}" class="subtotal"> ` + subtotal +`</span></p> <hr/>

           
            
            </div>
            </div>`
    
    
    document.getElementById("articulo").innerHTML = carrito;
    }
}
    

function validarCompra() {

   

    window.addEventListener('load', function () {
        //
        var forms = document.getElementsByClassName('needs-validation');
        
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                
                if (form.checkValidity() === false) {
                    alert("asdasd");

                    if (pagar === "credito") {
                        if ((numTarjeta == "" || nombre.value == "" || cvv.value == "" || banco.value == "")) {
                            alert("Compra incompleta, favor de completar los campos Forma de Pago(Credito)")
                            event.preventDefault();
                            event.stopPropagation();
                        }

                    }
                    if (pagar === "transf") {
                        if (cuenta.value == "" || entidad.value == "") {
                            alert("Compra incompleta, favor de completar los campos Forma de Pago(Banco)")
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }

                }

                form.classList.add('was-validated');
            }, false);


        });
    }, false);


}


    

    

document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulosarray = resultObj.data.articles;

            showarticulos(articulosarray);
            subtotalgeneral()
            envio()
            total()
            
        }
        
    })

    let elements = document.getElementsByName("envio");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("change", function () {
                envio()
            
        })
    }

validarCompra()
});

