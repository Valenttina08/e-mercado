
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



var productsarray = [];
var id = window.localStorage.getItem('producto');
var comentarioListaUsu = [];

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

        imagenes += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" class="" src="` + img + `" alt="">
            </div>
        </div>
        `
    }



    document.getElementById("foto").innerHTML += imagenes;
}




document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL_G + id + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;


            showProduct(productsarray);
            ima(productsarray.images);
        }
    });

});





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




        document.getElementById("comentario").innerHTML
            += comentt;

    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    const url = PRODUCT_INFO_COMMENTS_URL + "comentario_" + id + ".json";
    console.log(url)

    getJSONData(PRODUCT_INFO_COMMENTS_URL + "comentario_" + id + ".json").then(function (resultado) {
        if (resultado.status === "ok") {
            comentarios = resultado.data;

            console.log(comentarios)
            comentt = comentarios;
            
            comentarioListaUsu = JSON.parse(window.localStorage.getItem('listaComenUsu'));
            for (let i = 0; i < comentarioListaUsu.length; i++){
                if (comentarioListaUsu[i].auto == id) {
                    comentarios.comments.push(comentarioListaUsu[i]);
                }
            }
            comen(comentarios);

        }
    });

});

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

}



