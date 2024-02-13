const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
const sinRegistro='<tr><td>No posee registros</td></tr>'
const iduser = localStorage.getItem('id')
const token = localStorage.getItem("token")
const name = localStorage.getItem('username')

window.onload = function(){
    document.getElementById("bienvenida").innerHTML = 'Bienvenido ' + name;
}
function historial_ventas(){
  const requestOptions = {
    method:'GET',
    headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
    }
  }
  fetch(`http://127.0.0.1:5000/usuarios/${iduser}/historialventas`, requestOptions)
  .then(
      res =>{if (res.status === 200 || res.status === 400) {
          return res.json();
        } else {
          throw new Error("Algo salió mal en el servidor API");
        }}
  )
  .then(
    resp=>{
      document.getElementById('botonesrec').innerHTML=''
      document.getElementById("recurso").innerHTML = '<h2 id="subtitulo">Historial de ventas</h2><table id="tablahistorial" class="table table-hover table-sm"> </table>'
      var lista_historial = "<thead><tr><th>ID</th><th>id cliente</th><th>fecha y hora</th><th>Productos</th><th>Descuento</th><th>total</th></tr></thead>"
      if (resp.length === 0){
          lista_historial = lista_historial.concat(sinRegistro)
      }
      for(let i = 0; i < resp.length; i++){
          let factura=`<tr id=${resp[i].id_factura}>
          <td>${resp[i].id_factura}</td>
          <td>${resp[i].id_cliente}</td>
          <td>${resp[i].hora_fecha}</td>
          <td>${resp[i].cant_productos}</td>
          <td>${resp[i].descuento}</td>
          <td>${resp[i].TOTAL}</td></tr>`
          lista_historial = lista_historial.concat(factura)
      }
      document.getElementById("tablahistorial").innerHTML=(lista_historial)
    }
  )
  .catch((error) => { console.log("Promesa rechazada por" , error)});
}

function stock(){
  document.getElementById("botonesrec").innerHTML=""
  document.getElementById("recurso").innerHTML=""
  //instancio un objeto grid para hacer una tabla
  new gridjs.Grid({
    //buqueda activa y con paginas de limite de 2 productos
    search: true,
    pagination:{
      limit: 2,
      summary: false
    },
    columns: ["marca","producto","stock"],
    //aqui se instancia el request para obtener los datos que pediremos a la api para rellenar la tabla
    server:{
      method: 'GET',
      headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
      },
      url: `http://127.0.0.1:5000/usuarios/${iduser}/productos/stock`,
      then: data => data.map(producto=>[producto.marca,producto.producto,producto.stock]),
      handle: (res) => {
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (res.status === 400) return {data: []};
        if (res.ok) return res.json();
        
        throw Error("Algo salió mal en el servidor API");
      },
    }
  }).render(document.getElementById("recurso"));//para renderizar se necesita estar vacio el div
}

function ventas_productos(){
  document.getElementById("botonesrec").innerHTML=""
  document.getElementById("recurso").innerHTML=""
  new gridjs.Grid({
    search: true,
    pagination:{
      limit: 2,
      summary: false
    },
    columns: ["marca","producto","cantidad"],
    server:{
      method: 'GET',
      headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
      },
      url: `http://127.0.0.1:5000/usuarios/${iduser}/factura/Rankingventaproducto`,
      then: data => data.map(producto=>[producto.marca,producto.producto,producto.cantidad]),
      handle: (res) => {
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (res.status === 400) return {data: []};
        if (res.ok) return res.json();
        
        throw Error("Algo salió mal en el servidor API");
      },
    }
  }).render(document.getElementById("recurso"));//para renderizar se necesita estar vacio el div
}

function ventas_servicios(){
  document.getElementById("botonesrec").innerHTML=""
  document.getElementById("recurso").innerHTML=""
  new gridjs.Grid({
    search: true,
    pagination:{
      limit: 2,
      summary: false
    },
    columns: ["servicio","cantidad",],
    server:{
      method: 'GET',
      headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
      },
      url: `http://127.0.0.1:5000/usuarios/${iduser}/factura/Rankingventaservicio`,
      //then: data => data.data.map(servicio=>[servicio.servicio,servicio.cantidad]),
      then:(data) => data.total,
      handle: (res) => {
        var clone = res.clone()
        var resp = clone.json()
        if (res.ok) return res.json();
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (resp.message === "No hay ventas servicios cargados") return {data: []};
        
        
        throw Error("Algo salió mal en el servidor API");
      },
    }
  }).render(document.getElementById("recurso"));
}