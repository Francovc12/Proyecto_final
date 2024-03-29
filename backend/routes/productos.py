from main import app
from models.productos import Producto
from flask import jsonify, request
from utils import requiere_token,recurso_usuario

#ruta para obtener todos los productos de un usuario
@app.route('/usuarios/<int:id_usuario>/productos', methods = ['GET'])
@requiere_token
@recurso_usuario
def get_productos(id_usuario):
    try:
        productos = Producto.obtener_productos(id_usuario)
        return jsonify(productos), 200
    except Exception as e:
        return jsonify({"message":e.args[0]}), 400 

#ruta para obtener un  producto por id_producto
@app.route('/usuarios/<int:id_usuario>/productos/<int:id_producto>', methods=['GET'])
@requiere_token
@recurso_usuario
def obtener_producto_por_id(id_usuario, id_producto):
    try:
        producto_porID = Producto.producto_por_id(id_producto)
        return jsonify(producto_porID), 200
    except Exception as e:
        return  jsonify({"message": e.args[0]}), 400  

#misma ruta pero implementando el metodo post para agregar un nuevo producto
@app.route('/usuarios/<int:id_usuario>/productos', methods = ['POST'])
@requiere_token
@recurso_usuario
def crear_producto(id_usuario):
    datos = request.get_json()
    datos["precio"]= int(datos["precio"])
    datos["stock"]=int(datos["stock"])
    datos["id_usuario"] = id_usuario

    try:
        nuevo_producto = Producto.crear_producto(datos)
        return jsonify(nuevo_producto), 201
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    
#ruta para modificar los productos con el metodo put
@app.route('/usuarios/<int:id_usuario>/productos/<int:id_prod>', methods = ['PUT'])
@requiere_token
@recurso_usuario
def modificar_producto(id_usuario,id_prod):
    datos = request.get_json()
    datos["precio"]= int(datos["precio"])
    datos["stock"]=int(datos["stock"])
    datos["id_usuario"] = id_usuario
    try:
        modificar_producto = Producto.actualizar_producto(id_prod,datos)
        return jsonify(modificar_producto), 200
    except Exception as e:
        return jsonify({"message": e.args[0]}),400
    
#ruta para eliminar un producto
@app.route('/usuarios/<int:id_usuario>/productos/<int:id_producto>', methods = ['DELETE'])
@requiere_token
@recurso_usuario
def eliminar_producto(id_usuario,id_producto):
    try:
        eliminar = Producto.eliminar_producto(id_usuario,id_producto)
        return jsonify(eliminar), 200
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400
    

#ruta para controlar stock de productos
@app.route('/usuarios/<int:id_usuario>/productos/stock', methods=['GET'])
@requiere_token
@recurso_usuario
def control_stock(id_usuario):
    try:
        stock = Producto.control_stock(id_usuario)
        return jsonify(stock), 200
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400