function servicios(){
    console.log('aqui van los servicios')
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
            document.getElementById('botonesrec').innerHTML='<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistroservicio">Registrar servicio</button>'
            document.getElementById("recurso").innerHTML = '<h2 id="subtitulo">Servicios</h2><table id="tablaservicio" class="table table-hover table-sm"> </table>'
            var lista_servicio = "<thead><tr><th>ID</th><th>servicio</th><th>descripcion</th><th>precio</th><th>acciones</th></tr></thead>"
            if (resp.length === 0){
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