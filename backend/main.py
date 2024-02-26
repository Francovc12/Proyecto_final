from flask import Flask , request ,jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import jwt
import datetime

#inicio una instancia de flask
app = Flask(__name__)

CORS(app)
#configuro MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = None
app.config['MYSQL_DB'] = 'db_api_proyecto'

app.config['SECRET_KEY'] = 'app_123'#importante para usar jwt
mysql = MySQL(app)

class DBError(Exception):
    pass
from routes.productos import *
from routes.facturas import *
from routes.ventas_productos import *
from routes.clientes import *
from routes.usuarios import *
from routes.servicios import *
from routes.ventas_servicios import *
import sys

if len(sys.argv) > 1 and sys.argv[1] == "list":
    print(app.url_map)    
elif __name__ == '__main__':
    app.run(debug=True, port = 5000)