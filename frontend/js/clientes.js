function clientes(){
    ocultarFormusuario()

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
            document.getElementById('botonesrec').innerHTML='<h3 id="subtitulo">Clientes</h3><button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalRegistroCliente">Agregar cliente</button>'
            document.getElementById("recurso").innerHTML = '<table id=tablacliente class="table table-hover table-sm"> </table>'
            var clientes = "<thead><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Dni</th><th>Email</th><th>accion</th></tr></thead>"
            if (resp.length == 0){
                clientes = clientes.concat(sinRegistro)
            }

            for(let i = 0; i < resp.length; i++){
                let id = resp[i].id_cliente
                let name = resp[i].nombre
                let surname = resp[i].apellido
                let dni = resp[i].dni
                let email = resp[i].email
                let cliente=`<tr id=${id}>
                <td>${id}</td>
                <td>${name}</td>
                <td>${surname}</td>
                <td>${dni}</td>
                <td>${email}</td>
                <td><button onclick=editar_cliente(${id}) class="btn btn-outline-secondary">Modificar</button>
                <button onclick=eliminar_cliente(${id}) class="btn btn-outline-danger">Eliminar</button></td></tr>`

                clientes = clientes.concat(cliente)
            }
            document.getElementById("tablacliente").innerHTML=clientes
        }
    )
    .catch((error) => { console.log("Promesa rechazada por" , error)});
}

function registrar_cliente(){
    document.getElementById("mensaje-registro").innerHTML=""
    const nombre = document.getElementById('formRegistro-nombre').value;
    const apellido = document.getElementById('formRegistro-apellido').value;
    const dni = document.getElementById('formRegistro-dni').value;
    const email = document.getElementById('formRegistro-email').value;
    const body ={"nombre":nombre, "apellido": apellido, "dni":dni, "email": email}
    if (nombre == "" || apellido == "" || dni == "" || email == "")
    {
        Swal.fire({
            title: 'Error!',
            text: 'Complete todos los campos',
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    }
    else{
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
            if (res.status === 201 || res.status === 400) {
              return res.json();
            } else {
              throw new Error("Algo salió mal en el servidor API");
            }
          }
    )
    .then(
        resp=>{
            console.log(nombre,apellido,dni,email,resp)

            let respuesta = resp.message
            if (respuesta=="Error creando el cliente - el cliente ya existe"){
                Swal.fire({
                    title: 'Error!',
                    text: respuesta,
                    icon: 'error',
                    confirmButtonText: 'Volver'
                })
            }
            else{
            //document.getElementById("mensaje-registro").innerHTML=`<p>${respuesta}</p>`
            
            Swal.fire({
                title: 'Ok',
                text: 'el cliente ha sido cargado correctamente',
                icon: 'success',
                confirmButtonText: 'ok'
            })
            clientes()
        }}
    )
    .catch((error) => {
        console.error(error)
        document.getElementById("mensaje-registro").innerHTML=`<p>${error}</p>`;
      });}
}

function editar_cliente(id){
    console.log('editando por id: ', id );
    let row = document.getElementById(id);
    console.log(row.children);

    for ( let i =1; i <=4; i++){
        row.children[i].contentEditable = true;
        row.children[i].classList.toggle('editing');
    }

    row.children[5].innerHTML=`<td>
        <button onclick="guardar(${id})" class="btn btn-outline-secondary"> Guardar</button>
        <button onclick="eliminar(${id})" disabled class="btn btn-outline-danger"> Eliminar</button>  
        </td> `;
}

function guardar(id){
    //obtengo la fila por el id a guardar
    let row = document.getElementById(id);
    for ( let i =1; i <=4; i++){
        row.children[i].contentEditable = false;
        row.children[i].classList.toggle('editing');
    }
    //modificar los botones al presionar guardar
    row.children[5].innerHTML=`<td>
        <button onclick="editar_cliente(${id})" class="btn btn-outline-secondary"> Modificar </button>
        <button onclick="eliminar_cliente(${id})" class="btn btn-outline-danger"> Eliminar</button>  
        </td> `;
    //datos a editar y conseguir esos datos
    let datos = row.children;
    const cliente = {
        "nombre": datos[1].textContent,
        "apellido":datos[2].textContent,
        "dni":datos[3].textContent,
        "email":datos[4].textContent,
    }
    console.log(cliente);
    const requestOptions={
        method:'PUT',
        headers:{
            'token-acceso' : token,
            'id-usuario' : iduser,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(cliente)
    }
    fetch(`http://127.0.0.1:5000/usuarios/${iduser}/clientes/${id}`,requestOptions)
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
            datos[1].innerHTML = data.nombre;
            datos[2].innerHTML = data.apellido;
            datos[3].innerHTML = data.dni;
            datos[4].innerHTML = data.email;
        }
    )
    .catch(
        (error) => { console.log("Promesa rechazada por" , error)}
    )
}
function eliminar_cliente(id){
    //realizo la peticion delete
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
            text: "EL cliente a sido eliminado",
            icon: "success"
          });
          const requestOptions={
            method:'DELETE',
            headers:{
                'token-acceso' : token,
                'id-usuario' : iduser
            }
    
        }
        fetch(`http://127.0.0.1:5000/usuarios/${iduser}/clientes/${id}`,requestOptions)
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
                clientes();
            }
        )
        .catch((error) => { console.log("Promesa rechazada por" , error)})
        }
      }); 
    
}
