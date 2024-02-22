from main import app, mysql
from flask import request, jsonify
from models.ventas_productos import VentasProducto
from models.productos import Producto
from utils import requiere_token, recurso_usuario

@app.route('/usuarios/<int:id_usuario>/factura/ventaproducto', methods=['POST'])
@requiere_token
@recurso_usuario
def crear_venta_producto(id_usuario):
    datos = request.get_json()
    datos["id_producto"]=int(datos["id_producto"])
    datos["cantidad"]=int(datos["cantidad"])
    try:
        nuevo_dtProducto = VentasProducto.crear_ventas_producto(datos)
        return jsonify(nuevo_dtProducto),201
    except Exception as e:
        return jsonify({"message":e.args[0]}),400
    
@app.route('/usuarios/<int:id_usuario>/factura/Rankingventaproducto', methods=['GET'])
@requiere_token
@recurso_usuario
def Ranking_ventasProductos(id_usuario):
    try:
        lista=[]
        productos = Producto.obtener_productos(id_usuario)
        for producto in productos:
            lista.append(producto["id_producto"])
        print(lista)
        lista_ranking = VentasProducto.Ranking_ventas_productos(lista)
        return lista_ranking, 200
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    