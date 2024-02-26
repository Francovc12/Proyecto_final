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
    localStorage.removeItem('listaservicio');
    localStorage.removeItem('listaproducto');
}
function historial_ventas(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML="<h3 id='subtitulo'>Historial de ventas</h3>"
  document.getElementById("recurso").innerHTML=""

  var historial = new gridjs.Grid({
    resizable: true,
    sort: true,
    search: true,
    pagination:{
      limit: 2,
      summary: false
    },
    columns : ["id_factura","id_cliente","fecha y hora","cantidad de productos","descuento","total"],
    server:{
      method: 'GET',
      headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
      },
      url:`http://127.0.0.1:5000/usuarios/${iduser}/historialventas`,
      then: data=> data.map(factura =>[factura.id_factura,factura.id_cliente,factura.hora_fecha,factura.cant_productos,factura.descuento,factura.TOTAL]),
      handle: (res) => {
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (res.status === 400) return {data: []};
        if (res.ok) return res.json();
        
        throw Error("Algo salió mal en el servidor API");
      }, 
    }
  }).render(document.getElementById("recurso"))
  historial.forceRender();
}

function stock(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML="<h3 id='subtitulo'>Informe de stock</h3>"
  document.getElementById("recurso").innerHTML=""
  //instancio un objeto grid para hacer una tabla
  var stock = new gridjs.Grid({
    //buqueda activa y con paginas de limite de 2 productos
    resizable: true,
    sort: true,
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
  }).render(document.getElementById("recurso"))
  stock.forceRender();//para renderizar se necesita estar vacio el div
}

function ventas_productos(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML="<h3 id='subtitulo'>Ventas por productos</h3>"
  document.getElementById("recurso").innerHTML=""
  var productos = new gridjs.Grid({
    resizable: true,
    sort: true,
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
  }).render(document.getElementById("recurso"))
  productos.forceRender();//para renderizar se necesita estar vacio el div
}

function ventas_servicios(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML="<h3 id='subtitulo'>Ventas por servicio</h3>"
  document.getElementById("recurso").innerHTML=""

  var servicio = new gridjs.Grid({
    resizable: true,
    sort: true,
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
      then: data => data.map(servicio=>[servicio.servicio,servicio.cantidad]),
      //then:(data) => data.total,
      handle: (res) => {
        var clone = res.clone()
        var resp = clone.json()
        if (res.ok) return res.json();
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (resp.message === "No hay ventas servicios cargados") throw Error("No hay ventas servicios cargados");//{data: []};
        
        
        throw Error("Algo salió mal en el servidor API");
      },
    }
  }).render(document.getElementById("recurso"))
  servicio.forceRender();
}

function ventas_clientes(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML="<h3 id='subtitulo'>Ventas por cliente</h3>"
  document.getElementById("recurso").innerHTML=""

  var cliente_ventas = new gridjs.Grid({
    resizable: true,
    sort: true,
    search: true,
    pagination:{
      limit: 2,
      summary: false
    },
    columns:["posicion","cliente","cantidad"],
    server:{
      method: 'GET',
      headers:{
        'token-acceso' : token,
        'id-usuario' : iduser
      },
      url: `http://127.0.0.1:5000/usuarios/${iduser}/Rankingventasclientes`,
      then: data => data.map(cliente=>[cliente.lugar,cliente.cliente,cliente.cantidad]),
      //then:(data) => data.total,
      handle: (res) => {
        var clone = res.clone()
        var resp = clone.json()
        if (res.ok) return res.json();
        // si sale error la tabla queda vacia sino hay un error de servidor en cualquier caso
        if (resp["message"] === "El usuario no registra ventas"){ {data:[]} throw Error("El usuario no registra ventas")};//{data: []};
        
        
        //throw Error("Algo salió mal en el servidor API");
      },
    }
  }).render(document.getElementById("recurso"))
  cliente_ventas.forceRender();
}

function cargaUsuario(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML=""
  document.getElementById("recurso").innerHTML=""
  document.getElementById("form_usuario").removeAttribute("hidden")
}
function ocultarFormusuario(){
  document.getElementById("form_usuario").setAttribute("hidden","")
  document.getElementById("dashboard").setAttribute("hidden","")
  document.getElementById("form-factura").setAttribute("hidden","")
}

function home(){
  ocultarFormusuario()
  document.getElementById("botonesrec").innerHTML=""
  document.getElementById("recurso").innerHTML=""
  document.getElementById("dashboard").removeAttribute("hidden")
}