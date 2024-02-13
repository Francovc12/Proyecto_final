function facturas(){
    const requestOptions={
        method:'GET',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser
        }
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/factura`, requestOptions)
    .then(
        res =>{if (res.status === 200 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            document.getElementById('botonesrec').innerHTML='<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistrofactura">Crear Factura</button>'
            document.getElementById("recurso").innerHTML = '<h2 id="subtitulo">Facturas</h2><table id="tablafactura" class="table table-hover table-sm"> </table>'
            var lista_facturas = "<thead><tr><th>ID</th><th>id cliente</th><th>fecha y hora</th><th>Productos</th><th>Descuento</th><th>total</th><th>acciones</th></tr></thead>"
            if (resp.length === 0){
                lista_facturas = lista_facturas.concat(sinRegistro)
            }
            for(let i = 0; i < resp.length; i++){
                let factura=`<tr id=${resp[i].id_factura}>
                <td>${resp[i].id_factura}</td>
                <td>${resp[i].id_cliente}</td>
                <td>${resp[i].hora_fecha}</td>
                <td>${resp[i].cant_productos}</td>
                <td>${resp[i].descuento}</td>
                <td>${resp[i].TOTAL}</td>
                <td><button onclick=editar_cliente(${resp[i].id_factura}) class="btn btn-outline-secondary">Modificar</button>
                <button onclick=eliminar_cliente(${resp[i].id_factura}) class="btn btn-outline-danger">Eliminar</button></td></tr>`
                lista_facturas = lista_facturas.concat(factura)
            }
            document.getElementById("tablafactura").innerHTML=(lista_facturas)
        }
    )
    .catch((error) => { console.log("Promesa rechazada por" , error)});
}