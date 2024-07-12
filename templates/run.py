from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Inicializar la base de datos con la aplicación Flask
init_app(app)

CORS(app)
# Permitir solicitudes desde cualquier origen
#CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad Usuario
app.route('/', methods=['GET'])(index)
app.route('/api/administracion/', methods=['POST'])(create_usuario)
app.route('/api/administracion/', methods=['GET'])(get_all_usuarios)
app.route('/api/administracion/<string:usuario>', methods=['GET'])(get_usuario)
app.route('/api/administracion/<string:usuario>', methods=['PUT'])(update_usuario)
app.route('/api/administracion/<string:usuario>', methods=['DELETE'])(delete_usuario)


if __name__ == '__main__':
    app.run(debug=True)

