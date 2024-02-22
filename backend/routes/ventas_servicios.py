from main import app, mysql
from flask import request, jsonify
from models.ventas_servicios import VentasServicios
from models.servicios import Servicios
from utils import requiere_token, recurso_usuario

@app.route('/usuarios/<int:id_usuario>/factura/ventaservicio', methods=['POST'])
@requiere_token
@recurso_usuario
def crear_ventas_servicio(id_usuario):
    datos = request.get_json()
    datos["id_servicio"]=int(datos["id_servicio"])
    datos["cantidad"]=int(datos["cantidad"])

    try:
        nuevo_venta_servicio = VentasServicios.crear_ventas_servicio(datos)
        return jsonify(nuevo_venta_servicio),201
    except Exception as e:
        return jsonify({"message":e.args[0]}),400
    

@app.route('/usuarios/<int:id_usuario>/factura/Rankingventaservicio', methods=['GET'])
@requiere_token
@recurso_usuario
def ranking_ventas_servicios(id_usuario):
    try:
        lista=[]
        servicios = Servicios.obtener_servicios(id_usuario)
        for servicio in servicios:
            lista.append(servicio["id_servicio"])
        print(lista)
        lista_ranking = VentasServicios.ranking_ventas_servicios(lista)
        return lista_ranking, 200
    except Exception as e:
        return jsonify({"message": e.args[0]}), 400