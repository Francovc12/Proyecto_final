function facturas(){
    ocultarFormusuario()
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
            document.getElementById('botonesrec').innerHTML='<button onclick="cargaproductos()" type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistrofactura">Crear Factura</button>'
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

function formagregarproducto(){
    var lista = localStorage.getItem("listaproducto")
    console.log(lista)
    document.getElementById("form_producto").insertAdjacentHTML("beforeend",`<select name="producto" id="producto_nombre" class="form-select producto">${lista}</select><input type="number" name="cantidad" id="producto_cantidad" min="1" step="1"></input>`)
    registrar_vntproducto()
    
}
function formagregarservicio(){
    var servicios = localStorage.getItem("listaservicios")
    document.getElementById("form_servicio").insertAdjacentHTML("beforeend",`<select name="serviciouno" id="ventas_servicios" class="form-select">${servicios}</select><input type="number" name="cantidadserv" id="ventas_servicios" min="1" step="1">`)
    registrar_vntservicio()
}

function cargaproductos(){
    console.log('hola cargas')
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
            var listaproducto=""
            resp.forEach(element => {
                let producto=`<option value=${element.id_producto}>Producto: ${element.marca} ${element.nombre_producto} Disponible: ${element.stock}</option>`
                listaproducto = listaproducto.concat(producto)
            });
            document.getElementById("producto_nombre").innerHTML=listaproducto
            localStorage.setItem("listaproducto",listaproducto)
        }
    )
}

function registrar_vntproducto(){
    //asigno los valores ya cargados
    var producto = document.getElementById("producto_nombre").value;
    var cantidad = document.getElementById("producto_cantidad").value;
    //una vez registrado no podra editarse
    document.getElementById("producto_nombre").setAttribute("disabled","true");
    document.getElementById("producto_cantidad").setAttribute("disabled","true");
    //remuevo los atributos para evitar cargas anteriores
    document.getElementById("producto_nombre").removeAttribute("id")
    document.getElementById("producto_cantidad").removeAttribute("id")
    //imprimo los valores obtenido anteriormente
    console.log(producto)
    console.log(cantidad)
    //realizo el post de los datos para crear una nueva factura
    var body = {"id_producto":producto,"cantidad":cantidad}
    const requestOptions={
        method:'POST',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/factura/ventaproducto`, requestOptions)
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
            let respuesta = resp.message
            window.alert("producto cargado correctamente")
            cargaservicios()
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            window.alert(error)
        }
    )
}
//facturar ventas servicios
function cargaservicios(){
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
            var listaservicio=""
            resp.forEach(element => {
                let servicio=`<option value=${element.id_servicio}>Servicio: ${element.nombre_servicio} ${element.descripcion}</option>`
                listaservicio = listaservicio.concat(servicio)
            });
            
            document.getElementById("servicio_nombre").innerHTML=listaservicio
            localStorage.setItem("listaservicio",listaservicio);
        }
    )
}
function registrar_vntservicio(){
    //asigno los valores ya cargados
    var servicio_nombre = document.getElementById("servicio_nombre").value;
    var servicio_cantidad = document.getElementById("servicio_cantidad").value;
    
    //una vez registrado no podra editarse
    document.getElementById("servicio_nombre").setAttribute("disabled","true");
    document.getElementById("servicio_cantidad").setAttribute("disabled","true");
    //remuevo los atributos para evitar cargas anteriores
    document.getElementById("servicio_nombre").removeAttribute("id")
    document.getElementById("servicio_cantidad").removeAttribute("id")
    //imprimo los valores obtenido anteriormente
    console.log(servicio_nombre)
    console.log(servicio_cantidad)

    var body = {"id_servicio":servicio_nombre,"cantidad":servicio_cantidad}
    const requestOptions={
        method:'POST',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/factura/ventaservicio`, requestOptions)
    .then(
        res =>{if (res.status === 201 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            let respuesta = resp.message
            window.alert("servicio cargado correctamente")
            cargacliente()
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            window.alert(error)
        }
    )
}

//funcion para facturar las ventas_productos o ventas_servicios
function crearfactura(){
    //asigno los valores ya cargados
    var cliente = document.getElementById("cliente").value;
    var descuento = document.getElementById("cliente_descuento").value;
    var body = {"id_cliente":cliente,"descuento":descuento}
    const requestOptions={
        method:'POST',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/factura`, requestOptions)
    .then(
        res =>{if (res.status === 201 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            let respuesta = resp.message
            window.alert("Factura cargada correctamente")
            facturas()
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            window.alert(error)
        }
    )

}
function cargacliente(){
    const requestOptions={
        method:'GET',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser
        }
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/clientes`, requestOptions)
    .then(
        res =>{if (res.status === 200 || res.status === 400) {
            return res.json();
          } else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            var listacliente=""
            resp.forEach(element => {
                let cliente=`<option value=${element.id_cliente}>Cliente: ${element.nombre} ${element.apellido} Dni: ${element.dni}</option>`
                listacliente = listacliente.concat(cliente)
            });
            document.getElementById("cliente").innerHTML=listacliente
        }
    )
}