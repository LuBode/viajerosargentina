from flask import jsonify, request
from app.models import *

### REGISTROS ###
def index():
    return jsonify({'message': 'Si ando si ando'})

def create_usuario():
    data = request.json
    new_usuario = Registro(usuario=data['usuario'], email=data['email'], 
                           contrasena=data['contrasena'], celular=data['celular'])
    new_usuario.save()
    return jsonify({'message': 'Usuario creado exitosamente'}), 201

def get_all_usuarios():
    usuarios = Registro.get_all()
    return jsonify([usuario.serialize() for usuario in usuarios])

def get_usuario(usuario):
    usuario = Registro.get_by_usuario(usuario)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(usuario.serialize())

def update_usuario(usuario):
    usuario = Registro.get_by_usuario(usuario)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    data = request.json
    usuario.usuario = data['usuario']
    usuario.email = data['email']
    usuario.contrasena = data['contrasena']
    usuario.celular = data['celular']
    usuario.save()
    return jsonify({'message': 'Usuario actualizado exitosamente'})

def delete_usuario(usuario):
    usuario = Registro.get_by_usuario(usuario)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    usuario.delete()
    return jsonify({'message': 'Usuario eliminado exitosamente'})
