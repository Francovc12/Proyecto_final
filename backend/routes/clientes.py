from main import app,mysql
from models.clientes import Cliente
from flask import jsonify, request
from utils import requiere_token, recurso_usuario
# Ruta para crear un cliente
#falta controlar que el usuario no pueda crear clientes a otro usuario 
@app.route('/usuarios/<int:id_usuario>/clientes', methods = ['POST'])
@recurso_usuario
@requiere_token
def crear_Cliente(id_usuario):
    datos = request.get_json()
    datos["dni"]=int(datos["dni"])
    datos["id_usuario"] = id_usuario
    datos["activo"]=True

    try:
        nuevo_cliente = Cliente.crear_cliente(datos)
        return jsonify(nuevo_cliente),201
    except Exception as e:
        return jsonify({"message": e.args[0]}),400


# Ruta para obtener todos los clientes de un usuario

@app.route('/usuarios/<int:id_usuario>/clientes', methods = ['GET'])
@recurso_usuario
@requiere_token
def clientes_por_id(id_usuario):
    try:
        lista_clientes=Cliente.clientes_por_usuario(id_usuario)
        return jsonify(lista_clientes),200
    except Exception as e:
        return jsonify({"message":e.args[0]}),400


# Ruta para modificar un cliente

@app.route('/usuarios/<int:id_usuario>/clientes/<int:id_cliente>', methods = ['PUT'])
@recurso_usuario
@requiere_token
def modificar_cliente(id_usuario,id_cliente):
    datos = request.get_json()
    datos["id_usuario"] = id_usuario
    datos["activo"]=True
    try:
        modificar_cliente = Cliente.modificar_cliente(id_usuario,id_cliente,datos)
        return jsonify(modificar_cliente), 200
    except Exception as e:
        return jsonify({"message": e.args[0]}),400


# Ruta para eliminar un cliente

@app.route('/usuarios/<int:id_usuario>/clientes/<int:id_cliente>', methods = ['DELETE'])
@recurso_usuario
@requiere_token
def eliminar_cliente(id_usuario,id_cliente):
    try:
        estado = Cliente.eliminar_cliente(id_usuario,id_cliente)
        return jsonify(estado),200
    except Exception as e:
        return jsonify({"message": e.args[0]}),400