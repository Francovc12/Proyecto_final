function productos(){
    console.log('hola aqui van productos')
    ocultarFormusuario()
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
            document.getElementById('botonesrec').innerHTML='<h3 id="subtitulo">Productos</h3><button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistroproducto">Registrar producto</button>'
            document.getElementById("recurso").innerHTML = '<table id="tablaproducto" class="table table-hover table-sm"> </table>'
            var lista_producto = "<thead><tr><th>ID</th><th>categoria</th><th>marca</th><th>nombre</th><th>descripcion</th><th>precio</th><th>stock</th><th>acciones</th></tr></thead>"
            if (resp.length == 0){
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
                <button onclick=eliminar_producto(${resp[i].id_producto}) class="btn btn-outline-danger">Eliminar</button></td></tr>`
                lista_producto = lista_producto.concat(producto)
            }
            document.getElementById("tablaproducto").innerHTML=(lista_producto)
        }
    )
    .catch((error) => { console.log("Promesa rechazada por" , error)});
}
function editar_producto(id){
    let row = document.getElementById(id);
    console.log(row.children);

    for ( let i =1; i <=6; i++){
        row.children[i].contentEditable = true;
        row.children[i].classList.toggle('editing');
    }
    row.children[7].innerHTML=`<td><button onclick=guardar_producto(${id}) class="btn btn-outline-secondary">Guardar</button>
    <button onclick=eliminar_producto(${id}) disabled class="btn btn-outline-danger">Eliminar</button></td>`
}

function guardar_producto(id){
    let row = document.getElementById(id);
    for ( let i =1; i <=6; i++){
        row.children[i].contentEditable = false;
        row.children[i].classList.toggle('editing');
    }
    row.children[7].innerHTML=`<td><button onclick=editar_producto(${id}) class="btn btn-outline-secondary">Modificar</button>
    <button onclick=eliminar_producto(${id}) class="btn btn-outline-danger">Eliminar</button></td>`

    let datos = row.children
    const producto = {
        "nombre_producto": datos[3].textContent,
        "marca": datos[2].textContent,
        "precio": datos[5].textContent,
        "categoria" : datos[1].textContent,
        "descripcion": datos[4].textContent,
        "stock": datos[6].textContent
    }
    const requestOptions={
        method:'PUT',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(producto)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/productos/${id}`, requestOptions)
    .then(res=>{if (res.status === 200 || res.status === 400) {
        return res.json();
      } else {
        throw new Error("Algo salió mal en el servidor API");
      }
    })
    .then( data=>{
        console.log(data);
        datos[1].innerHTML = data.categoria;
        datos[2].innerHTML = data.marca;
        datos[3].innerHTML = data.nombre_producto;
        datos[4].innerHTML = data.descripcion;
        datos[5].innerHTML = data.precio;
        datos[6].innerHTML = data.stock
    })
    .catch(
        (error) => { console.log("Promesa rechazada por" , error)}
    )
}
function eliminar_producto(id){
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
        fetch(`http://127.0.0.1:5000/usuarios/${iduser}/productos/${id}`, requestOptions)
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
                console.log(data)
                productos()
            }
        )
        .catch((error) => { console.log("Promesa rechazada por" , error)})
        }})}

// funcion para registrar productos
function registrar_producto(){
    document.getElementById("mensaje-registro").innerHTML=""
    const producto_nombre = document.getElementById("Producto_nombre").value;
    const producto_marca = document.getElementById("Producto_marca").value;
    const producto_categoria = document.getElementById("Producto_categoria").value;
    const producto_descripcion = document.getElementById("Producto_descripcion").value;
    const producto_precio = document.getElementById("Producto_precio").value;
    const producto_stock = document.getElementById("Producto_stock").value;
    if (producto_nombre == "" || producto_marca == "" || producto_categoria == "" || producto_descripcion == "" || producto_precio == "" || producto_stock == ""){
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese todos los campos',
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    }else{
        const body={
            "nombre_producto": producto_nombre,
            "marca": producto_marca,
            "precio": producto_precio,
            "categoria" : producto_categoria,
            "descripcion": producto_descripcion,
            "stock": producto_stock
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
        fetch(`http://127.0.0.1:5000/usuarios/${iduser}/productos`, requestOptions)
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
                console.log(producto_nombre,producto_categoria,producto_descripcion,producto_marca,producto_precio,producto_stock,resp)
                let respuesta = resp.message
                Swal.fire({
                    title: 'Ok',
                    text: respuesta,
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                document.getElementById("mensaje-registro").innerHTML=`<p>${respuesta}</p>`
                productos()
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
        });
    }
}