
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var productsarray2 = {};
var productsarray = {};
var id = window.localStorage.getItem('producto');
var comentarioListaUsu = [];



function showRelacionados(autoLista) {
    let relacion = "";
   
    for (let i = 0; i < autoLista.length; i++) {
        let indice = autoLista[i];
                    
        
                relacion += `Nombre:` + " " + productsarray2[indice].name + `<br/>` +
                    `Descripción:` + " " + productsarray2[indice].description + `<br/>` +
                    `Precio:` + " " + productsarray2[indice].cost + " " + productsarray2[indice].currency + `<br/>` +
       `<img src="` +productsarray2[indice].imgSrc+ `" width= "300px" heigth= "300px"  >` + `<hr/>`
       
    }
    

    document.getElementById("relacionautos").innerHTML += relacion ;


}


function showProduct(producto) {



    let auto = "";
    // let src =    ;



    auto += `Nombre:` + " " + producto.name + `<br/>` +
        `Descripción:` + " " + producto.description + `<br/>` +
        `Precio:` + " " + producto.cost + " " + producto.currency + `<br/>` +
        `Mas Vendido:` + " " + producto.soldCount + `<br/>`
    document.getElementById("lista").innerHTML += auto;
}

function ima(producto) {

    let imagenes = "";
    for (let i = 0; i < producto.length; i++) {
        img = producto[i];

        imagenes = `

        
       <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="`+producto[0]+`" class="d-block width="300px" height="300px">
    </div>
    <div class="carousel-item">
      <img src="`+ producto[1] +`" class="d-block width="300px" height="300px">
    </div>
    <div class="carousel-item">
      <img src="`+ producto[2] +`" class="d-block width="300px" height="300px">
    </div>
    <div class="carousel-item">
      <img src="`+ producto[3] +`" class="d-block width="300px" height="300px">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

        `
    }
    
    document.getElementById("foto").innerHTML += imagenes;
}



let comentarios = [];
function comen(array) {

    console.log("array:", array.comments)

    //  document.getElementById("comentario").innerHTML = "";

    for (let i = 0; i < array.comments.length; i++) {
        let eval = array.comments[i];

        let comentt = "";




        comentt += `Puntuacion:` + " " + eval.score + `<br/>` +
            `Descripción:` + " " + eval.description + `<br/>` +
            `Usuario:` + " " + eval.user + `<br/>` +
            `Publicado:` + " " + eval.dateTime + `<br/><hr/>`




        document.getElementById("comentario").innerHTML += comentt;

    }
}


function agregarComentario() {
    var com = document.getElementById("comentado").value;
    var scoreUser = document.getElementById("puntuacion").value;
    //const d = Date.now();
    const d = new Date();
    const dia = d.getDate();
    const mes = d.getMonth() + 1;
    const ano = d.getFullYear();
    const hora = d.getHours();
    const minutos = d.getMinutes();
    const segundos = d.getSeconds();
    var comentario = {
        id: "a" + Math.random(),
        auto: id,
        score: scoreUser,
        description: com,
        user: window.localStorage.getItem('User'),
        dateTime: dia + "/" + mes + "/" + ano + " " + hora + ":" + minutos + ":" + segundos
    }

    comentarioListaUsu.push(comentario);
    localStorage.setItem("listaComenUsu", JSON.stringify(comentarioListaUsu));
    location.reload();

};


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
                `Mas Vendido:` + " " + producto.soldCount + `<br/>` + `<br/>` +
                `<img width= "" class="card-img-top" src=  "` + producto.imgSrc + `"` + `<hr/>` + `<br>` + `<button onclick= mostrarProduct(` + producto.id + `) type= "button" class="btn btn-outline-primary"> detalle </button>` + '<br><hr><br>'

        }


        document.getElementById("lista").innerHTML += auto;
    }


};

document.addEventListener("DOMContentLoaded", function (e) {

    const url = PRODUCT_INFO_COMMENTS_URL + "comentario_" + id + ".json";
    

    getJSONData(PRODUCT_INFO_COMMENTS_URL + "comentario_" + id + ".json").then(function (resultado) {
        if (resultado.status === "ok") {
            comentarios = resultado.data;

            comentt = comentarios;

            comentarioListaUsu = JSON.parse(window.localStorage.getItem('listaComenUsu'));
            for (let i = 0; i < comentarioListaUsu.length; i++) {
                if (comentarioListaUsu[i].auto == id) {
                    comentarios.comments.push(comentarioListaUsu[i]);
                }
            }
            comen(comentarios);

        }
    });

});


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL_G + id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;


            showProduct(productsarray);
            ima(productsarray.images);
        }

        getJSONData(PRODUCTS_URL).then(function (result) {
            if (resultObj.status === "ok") {
                productsarray2 = result.data;


                showRelacionados(productsarray.relatedProducts);

            }
        })
    });

});





