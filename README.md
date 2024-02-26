# Proyecto Informatico - Trabajo Final

## Grupo 20


Villca Cayampi Franco I.	

Villordo David Hernan 	

Ruiz Julian Eduardo

# UML Backend:
![alt text](https://github.com/julianbsd/ProyectoInformatico/blob/main/UML_proyecto/Diagrama%20UML%20Proyecto%20Informatico.png)
# API RESTful implementada con Python + Flask + MYSQL

1. Crear directorio de proyecto (backend)

2. Crear entorno virtual    **py -3 -m venv .venv**

3. Activamos el entorno virtual  **.\.venv\Scripts\activate**

4. Creamos el archivo de requisitos
 - **requirements.txt**
	+ flask == 2.3.3
	+ flask-mysqldb == 1.0.1
	+ PyJWT == 2.8.0
	+ flask-cors

5. Instalar dependencias    **pip install -r requirements.txt**

6. Crear estructura de directorios
    * /backend
        + /backend/routes
            * /backend/routes/clientes.py
            * /backend/routes/facturas.py
            * /backend/routes/productos.py
            * /backend/routes/servicios.py
            * /backend/routes/usuarios.py
            * /backend/routes/ventas_productos.py
            * /backend/routes/ventas_servicios.py
        + /backend/models
            * /backend/models/clientes.py
            * /backend/models/facturas.py
            * /backend/models/productos.py
            * /backend/models/servicios.py
            * /backend/models/usuarios.py
            * /backend/models/ventas_productos.py
            * /backend/models/ventas_servicios.py	
		* /backend/main.py
        + /backend/api/utils.py
		* /backend/requirements.txt
## Explicación:

### main.py 
Es el punto de inicio de la aplicación, su función es importar el objeto app y ejecutar su método run.
El cual correra en la siguiente dirrecion:
http://127.0.0.1:5000
### Directorios 
+ /backend organiza la estructura interna de la aplicación.
+ /backend/routes contiene todos los archivos relacionados con las creaciones de rutas, cada uno agrupando las rutas referidas a un mismo recurso.
+ /backend/models contiene todos los archivos relacionados con las definiciones de clases, con logica para integrar la BD con la api.
