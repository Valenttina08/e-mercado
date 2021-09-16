

let autos = [];
function datosDeAutos(array) {

    document.getElementById("lista").innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        let auto;

        {

            auto = `Nombre:` + " " + producto.name + `<br/>` +
                `Descripción:` + " " + producto.description + `<br/>` +
                `Precio:` + " " + producto.cost + " " + producto.currency + `<br/>` +
                `Mas Vendido:` + " " + producto.soldCount + `<br/>` +
                `<img width= 400px src=  "` + producto.imgSrc + `"`  + `<hr/>` + `<br>` + `<button onclick= mostrarProduct(` + producto.id + `) type= "button"> detalle </button>` + '<br><hr><br>'

        }


        document.getElementById("lista").innerHTML += auto;
    }

}

function mostrarProduct(id) {
    window.localStorage.setItem('producto', id);
    window.location = 'product-info.html';
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productsarray = resultado.data;

            autos = productsarray;
            datosDeAutos(productsarray);
        }

    });

    document.getElementById("filtrar").addEventListener("click", function () {
        let filtro1 = document.getElementById("precio-filtro1").value;
        let filtro2 = document.getElementById("precio-filtro2").value;


        let autosFiltrados = autos.filter(auto => auto.cost >= filtro1 && auto.cost <= filtro2);

        datosDeAutos(autosFiltrados);
    });

    document.getElementById("borrar").addEventListener("click", function () {
        document.getElementById("precio-filtro1").value = "";
        document.getElementById("precio-filtro2").value = "";

        datosDeAutos(autos);
    });

    document.getElementById("ascendente").addEventListener("click", function () {
        let listaAscen = autos.sort(function (a, b) {
            if (a.cost > b.cost) {
                return 1;
            }
            if (a.cost < b.cost) {
                return -1;
            }
            return 0;
        });

        datosDeAutos(listaAscen);
    });

    document.getElementById("descendente").addEventListener("click", function () {
        let listadescen = autos.sort(function (a, b) {
            if (a.cost < b.cost) {
                return 1;
            }
            if (a.cost > b.cost) {
                return -1;
            }
            return 0;
        });

        datosDeAutos(listadescen);
    });

    document.getElementById("mas-vendido").addEventListener("click", function () {
        let listadescen = autos.sort(function (a, b) {
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            return 0;
        });

        datosDeAutos(listadescen);
    });

});




function buscar() {
    let listaBuscador = [];
    let texto = document.getElementById("buscador").value.toLowerCase();
    if (texto !== "") {
        for (let auto of autos) {
            let nombre = auto.name.toLowerCase();
            if (nombre.indexOf(texto) !== -1) {
                listaBuscador.push(auto);
            }
        }
        if (listaBuscador.length !== 0) {
            listaBuscador.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            datosDeAutos(listaBuscador);

        }
    } else {
        datosDeAutos(autos);
    }

}


