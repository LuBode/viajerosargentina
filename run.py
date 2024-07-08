from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Inicializar la base de datos con la aplicación Flask
init_app(app)

# Permitir solicitudes desde cualquier origen
CORS(app)

# Rutas para el CRUD de la entidad Usuario
app.route('/api/register/', methods=['POST'])(create_usuario)
app.route('/api/register/', methods=['GET'])(get_all_usuarios)
app.route('/api/register/<string:usuario>', methods=['GET'])(get_usuario)
app.route('/api/register/<string:usuario>', methods=['PUT'])(update_usuario)
app.route('/api/register/<string:usuario>', methods=['DELETE'])(delete_usuario)

# Rutas para la entidad RecuperacionContrasena
app.route('/api/recuperacionpss/', methods=['POST'])(create_recuperacion_contrasena)
app.route('/api/recuperacionpss/<int:id_recuperacion>', methods=['GET'])(get_recuperacion_contrasena)
app.route('/api/recuperacionpss/<int:id_recuperacion>', methods=['PUT'])(update_recuperacion_contrasena)
app.route('/api/recuperacionpss/<int:id_recuperacion>', methods=['DELETE'])(delete_recuperacion_contrasena)

# Rutas para la entidad Login
app.route('/api/singin/', methods=['POST'])(create_login)
app.route('/api/singin/<int:id_login>', methods=['GET'])(get_login)
app.route('/api/singin/<int:id_login>', methods=['PUT'])(update_login)
app.route('/api/singin/<int:id_login>', methods=['DELETE'])(delete_login)

# Rutas para la entidad Autos
app.route('/api/alquiler-de-autos/', methods=['POST'])(create_auto)
app.route('/api/alquiler-de-autos/<string:nombre>', methods=['GET'])(get_auto)
app.route('/api/alquiler-de-autos/<string:nombre>', methods=['PUT'])(update_auto)
app.route('/api/alquiler-de-autos/<string:nombre>', methods=['DELETE'])(delete_auto)

if __name__ == '__main__':
    app.run(debug=True)

