const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
const sinRegistro='<tr><td>No posee registros de facturas</td></tr>'
const iduser = localStorage.getItem('id')
const token = localStorage.getItem("token")
const name = localStorage.getItem('username')

window.onload = function(){
    document.getElementById("bienvenida").innerHTML = 'Bienvenido ' + name;
}

