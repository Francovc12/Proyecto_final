const iduser = localStorage.getItem('id')
const token = localStorage.getItem("token")
const name = localStorage.getItem('username')
window.onload = function(){
    document.getElementById("bienvenida").innerHTML = 'Bienvenido ' + name;
}
function clientes(){

    const requestOptions={
        method:'GET',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser
        }
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/clientes`, requestOptions)
    .then(
        res =>{return res.json()}
    )
    .then(
        resp=>{
            document.getElementById('botonesrec').innerHTML='<button type="button" class="fs-6 mt-3 p-0 btn btn-sm btn-link fw-bold text-decoration-none" data-bs-toggle="modal" data-bs-target="#modalRegistroCliente">Agregar cliente</button>'
            document.getElementById("recurso").innerHTML = "<table id=tablacliente> </table>"
            var clientes = "<thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Dni</th><th>Email</th><th>accion</th></tr></thead>"
            if (resp.length == 0){
                clientes = clientes.concat('<tr><td>No posee registros de clientes</td></tr>')
            }

            for(let i = 0; i < resp.length; i++){
                let id = resp[i].id_cliente
                let name = resp[i].nombre
                let surname = resp[i].apellido
                let dni = resp[i].dni
                let email = resp[i].email
                let cliente=`<tr><td>${id}</td><td>${name}</td><td>${surname}</td><td>${dni}</td><td>${email}</td><td><button>Eliminar</button><button>Modificar</button></td></tr>`


                clientes = clientes.concat(cliente)
            }
            document.getElementById("tablacliente").innerHTML=clientes
        }
    )
    .catch(error => console.error(error));
}
function registrar_cliente(){
    const nombre = document.getElementById('formRegistro-nombre').value;
    const apellido = document.getElementById('formRegistro-apellido').value;
    const dni = document.getElementById('formRegistro-dni').value;
    const email = document.getElementById('formRegistro-email').value;
    const body ={"nombre":nombre, "apellido": apellido, "dni":dni, "email": email}
    const requestOptions={
        method: 'POST',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/clientes`, requestOptions)
    .then(
        res =>{
            if (res.status === 200 || res.status === 400) {
              return res.json();
            } else {
              throw new Error("Something went wrong on api server!");
            }
          }
    )
    .then(
        resp=>{
            console.log(nombre,apellido,dni,email)
            document.getElementById("mensaje-registro").innerHTML=`<p>${resp}</p>`
        }
    )
    .catch((error) => {
        console.error(error)
        document.getElementById("mensaje-registro").innerHTML=`<p>${error}</p>`;
      });
}