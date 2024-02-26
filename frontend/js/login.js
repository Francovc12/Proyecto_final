window.onload = function(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
}

function login_usuario(){
    const nombre_usuario = document.getElementById('in-nombre_usuario').value;
    const contraseña = document.getElementById('in-contraseña').value;

    if (nombre_usuario == "" || contraseña == "")
    {
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese el usuario y la contraseña',
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    }
    else {
        const requestOptions={
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'authorization' : 'Basic ' + btoa(nombre_usuario + ':' + contraseña)
            }
        }
        fetch('http://127.0.0.1:5000/login', requestOptions)
        .then(
            res=>{return res.json()}
            )
        .then(
            resp=>{
                console.log(resp)
                if (resp.token){
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('username', resp.nombre_completo);
                    localStorage.setItem('id', resp.id);
                    window.location.href = "./dashboard.html";
                }
                else{
                    document.getElementById("mensaje").innerHTML= resp.message;
                }
            
            }
        )
        .catch((error) => { console.log("Promesa rechazada por" , error)})
    }

}

function registrar_usuario(){
    var nombreusuario = document.getElementById("formRegistro-nombreUsuario").value;
    var contrasenia = document.getElementById("formRegistro-contrasenia").value;
    var nombre = document.getElementById("formRegistro-nombre").value; 
    var apellido = document.getElementById("formRegistro-apellido").value;
    var telefono = document.getElementById("formRegistro-telefono").value;
    var email = document.getElementById("formRegistro-email").value;

    var body = {  "nombre_usuario": nombreusuario,
    "contrasenia": contrasenia,
    "nombre": nombre,
    "apellido": apellido,
    "telefono": telefono,
    "email": email}
    if (nombreusuario == "" || contrasemia == "" || nombre == "" || apellido == "" || telefono == "" || email == "")
    {
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese todos los campos',
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    }
    else{
    const requestOptions={
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
    }
    fetch('http://127.0.0.1:5000/usuarios', requestOptions)
    .then(
        res =>{if (res.status === 201) {
            return res.json();
          }if (res.status === 400){
            
            Swal.fire({
                title: 'Error!',
                text: res.message,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
          }
           else {
            throw new Error("Algo salió mal en el servidor API");
          }}
    )
    .then(
        resp=>{
            let respuesta = resp.message
            //window.alert("Usuario cargado correctamente")
            Swal.fire({
                title: 'Ok',
                text: 'el usuario ha sido cargado correctamente',
                icon: 'success',
                confirmButtonText: 'ok'
            })
            window.onload
        }
    )
    .catch((error)=>{
        console.log(error)
        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Volver'
        })
    })}
}