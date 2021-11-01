//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


var info = {}

function perfil() {
    var nom = document.getElementById("Nombre").value;
    var apell = document.getElementById("apellido").value;
    var edad = document.getElementById("edad").value;
    var email = document.getElementById("email").value;
    var cel = document.getElementById("cel").value;

    var Datos = {
        Nombre: nom,
        apellido: apell,
        edad: edad,
        email: email,
        cel: cel
    }

    localStorage.setItem("perfiles", JSON.stringify(Datos));
    location.reload();

}

function infor() {

    document.getElementById("Nombre").value = info.Nombre;
    document.getElementById("apellido").value = info.apellido;
    document.getElementById("edad").value = info.edad;
    document.getElementById("email").value = info.email;
    document.getElementById("cel").value = info.cel;


}
document.addEventListener("DOMContentLoaded", function (e) {
    info = JSON.parse(window.localStorage.getItem("perfiles"));

    infor()


});








