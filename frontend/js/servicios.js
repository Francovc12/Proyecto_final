function servicios(){
    console.log('aqui van los servicios')
    ocultarFormusuario()
    const requestOptions={
        method:'GET',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser
        }
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/servicios`, requestOptions)
    .then(
        res =>{if (res.status === 200 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            document.getElementById('botonesrec').innerHTML='<h3 id="subtitulo">Servicios</h3><button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistroservicio">Registrar servicio</button>'
            document.getElementById("recurso").innerHTML = '<table id="tablaservicio" class="table table-hover table-sm"> </table>'
            var lista_servicio = "<thead><tr><th>ID</th><th>servicio</th><th>descripcion</th><th>precio</th><th>acciones</th></tr></thead>"
            if (resp.length == 0){
                lista_servicio = lista_servicio.concat(sinRegistro)
            }
            for(let i = 0; i < resp.length; i++){
                let servicio=`<tr id=${resp[i].id_servicio}>
                <td>${resp[i].id_servicio}</td>
                <td>${resp[i].nombre_servicio}</td>
                <td>${resp[i].descripcion}</td>
                <td>${resp[i].precio}</td>
                <td><button onclick=editar_servicio(${resp[i].id_servicio}) class="btn btn-outline-secondary">Modificar</button>
                <button onclick=eliminar_servicio(${resp[i].id_servicio}) class="btn btn-outline-danger">Eliminar</button></td></tr>`
                lista_servicio = lista_servicio.concat(servicio)
            }
            document.getElementById("tablaservicio").innerHTML=(lista_servicio)
        }
    )
    .catch((error) => { console.log("Promesa rechazada por" , error)});
}
function editar_servicio(id){
    let row = document.getElementById(id);
    console.log(row.children);

    for ( let i =1; i <=3; i++){
        row.children[i].contentEditable = true;
        row.children[i].classList.toggle('editing');
    }
    row.children[4].innerHTML=`<td><button onclick=guardar_servicio(${id}) class="btn btn-outline-secondary">Guardar</button>
    <button onclick=eliminar_servicio(${id}) disabled class="btn btn-outline-danger">Eliminar</button></td>`
}

function guardar_servicio(id){
    let row = document.getElementById(id);
    console.log(row.children);

    for ( let i =1; i <=3; i++){
        row.children[i].contentEditable = false;
        row.children[i].classList.toggle('editing');
    }
    row.children[4].innerHTML=`<td><button onclick=editar_servicio(${id}) class="btn btn-outline-secondary">Modificar</button>
    <button onclick=eliminar_servicio(${id}) class="btn btn-outline-danger">Eliminar</button></td>`

    let datos = row.children
    const servicio = {
        "nombre_servicio" : datos[1].textContent ,
        "precio": datos[3].textContent,
        "descripcion": datos[2].textContent   
    }
    const requestOptions={
        method:'PUT',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(servicio)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/servicios/${id}`, requestOptions)
    .then(
        res=>{if (res.status === 200 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }
        }
    )
    .then(
        data=>{
            console.log(data);
            datos[1].innerHTML = data.nombre_servicio;
            datos[2].innerHTML = data.descripcion;
            datos[3].innerHTML = data.precio;
        }
    )
    .catch(
        (error) => { console.log("Promesa rechazada por" , error)}
    )
}

function eliminar_servicio(id){
    Swal.fire({
        title: "¿Estas seguro?",
        text: "No se podra revertir la accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI,Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El producto a sido eliminado",
            icon: "success"
          });
        const requestOptions={
            method:'DELETE',
            headers:{
                'token-acceso' : token,
                'id-usuario' : iduser
            }
        }
        fetch(`http://127.0.0.1:5000/usuarios/${iduser}/servicios/${id}`, requestOptions)
        .then(
            res=>{if (res.status === 200 || res.status === 400) {
                return res.json();
            } else {
                throw new Error("Algo salió mal en el servidor API");
            }
            }
        )
        .then(
            data=>{
                console.log(data);
                servicios();
            }
        )
        .catch((error) => { console.log("Promesa rechazada por" , error)})
        }})
}
//funcion registro de servicio
function registrar_servicio(){
    document.getElementById("mensaje-registro").innerHTML=""
    const servicio_nombre = document.getElementById("Servicio_nombre").value;
    const servicio_descripcion = document.getElementById("Servicio_descripcion").value;
    const servicio_precio = document.getElementById("Servicio_precio").value;

    if (servicio_nombre == "" || servicio_descripcion == "" || servicio_precio == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese todos los campos',
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    }else{
        const body={
            "nombre_servicio": servicio_nombre,
            "precio": servicio_precio,
            "descripcion": servicio_descripcion
        }
        const requestOptions={
            method: 'POST',
            headers:{
                'token-acceso' : token,
                'id-usuario' : iduser,
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(body)
        }
        fetch(`http://127.0.0.1:5000/usuarios/${iduser}/servicios`, requestOptions)
        .then(
            res =>{
                if (res.status === 201 || res.status === 400) {
                return res.json();
                } else {
                throw new Error("Algo salió mal en el servidor API");
                }
            }
        )
        .then(
            resp=>{
                console.log(servicio_nombre,servicio_descripcion,servicio_precio,resp)
                let respuesta = resp.message
                Swal.fire({
                    title: 'Ok',
                    text: respuesta,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                document.getElementById("mensaje-registro").innerHTML=`<p>${respuesta}</p>`
                servicios()
            }
        )
        .catch((error) => {
            console.error(error)
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Volver'
            })
            document.getElementById("mensaje-registro").innerHTML=`<p>${error}</p>`;
        });}
}