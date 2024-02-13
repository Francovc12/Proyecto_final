function productos(){
    console.log('hola aqui van productos')
    const requestOptions={
        method:'GET',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser
        }
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/productos`, requestOptions)
    .then(
        res =>{if (res.status === 200 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            document.getElementById('botonesrec').innerHTML='<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistroproducto">Registrar producto</button>'
            document.getElementById("recurso").innerHTML = '<h2 id="subtitulo">Productos</h2><table id="tablaproducto" class="table table-hover table-sm"> </table>'
            var lista_producto = "<thead><tr><th>ID</th><th>categoria</th><th>marca</th><th>nombre</th><th>descripcion</th><th>precio</th><th>stock</th><th>acciones</th></tr></thead>"
            if (resp.length === 0){
                lista_producto = lista_producto.concat(sinRegistro)
            }
            for(let i = 0; i < resp.length; i++){
                let producto=`<tr id=${resp[i].id_producto}>
                <td>${resp[i].id_producto}</td>
                <td>${resp[i].categoria}</td>
                <td>${resp[i].marca}</td>
                <td>${resp[i].nombre_producto}</td>
                <td>${resp[i].descripcion}</td>
                <td>${resp[i].precio}</td>
                <td>${resp[i].stock}</td>
                <td><button onclick=editar_producto(${resp[i].id_producto}) class="btn btn-outline-secondary">Modificar</button>
                <button onclick=eliminar_producto(${resp[i].id_fproducto}) class="btn btn-outline-danger">Eliminar</button></td></tr>`
                lista_producto = lista_producto.concat(producto)
            }
            document.getElementById("tablaproducto").innerHTML=(lista_producto)
        }
    )
    .catch((error) => { console.log("Promesa rechazada por" , error)});
}