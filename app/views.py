from flask import jsonify, request
from app.models import *

### REGISTROS ###
def create_usuario():
    data = request.json
    new_usuario = Registro(usuario=data['usuario'], email=data['email'], contrasena=data['contrasena'], 
                           celular=data['celular'])
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




#### LOGIN ####
def create_login():
    data = request.json
    new_login = Login(usuario=data['usuario'], contrasena=data['contrasena'], 
                      ultimo_ingreso=data['ultimo_ingreso'], intentos_fallidos=data['intentos_fallidos'])
    new_login.save()
    return jsonify({'message': 'Login creado exitosamente'}), 201

def get_login(id_login):
    login = Login.get_by_id(id_login)
    if not login:
        return jsonify({'message': 'Login no encontrado'}), 404
    return jsonify(login.serialize())

def update_login(id_login):
    login = Login.get_by_id(id_login)
    if not login:
        return jsonify({'message': 'Login no encontrado'}), 404
    data = request.json
    login.usuario = data['usuario']
    login.contrasena = data['contrasena']
    login.ultimo_ingreso = data['ultimo_ingreso']
    login.intentos_fallidos = data['intentos_fallidos']
    login.save()
    return jsonify({'message': 'Login actualizado exitosamente'})

def delete_login(id_login):
    login = Login.get_by_id(id_login)
    if not login:
        return jsonify({'message': 'Login no encontrado'}), 404
    login.delete()
    return jsonify({'message': 'Login eliminado exitosamente'})


#### RECUPERACION DE CONTRASEÑAS ###

def create_recuperacion_contrasena():
    data = request.json
    new_recuperacion = RecuperacionContrasena(id_usuario=data['id_usuario'], 
                                              codigo_verificacion=data['codigo_verificacion'], 
                                              fecha_solicitud=data['fecha_solicitud'], 
                                              fecha_expiracion=data['fecha_expiracion'], 
                                              utilizado=data['utilizado'])
    new_recuperacion.save()
    return jsonify({'message': 'Recuperacion de contraseña creada exitosamente'}), 201

def get_recuperacion_contrasena(codigo_verificacion):
    recuperacion = RecuperacionContrasena.get_by_codigo_verificacion(codigo_verificacion)
    if not recuperacion:
        return jsonify({'message': 'Recuperacion de contraseña no encontrada'}), 404
    return jsonify(recuperacion.serialize())

def update_recuperacion_contrasena(id_recuperacion):
    recuperacion = RecuperacionContrasena.get_by_id(id_recuperacion)
    if not recuperacion:
        return jsonify({'message': 'Recuperacion de contraseña no encontrada'}), 404
    data = request.json
    recuperacion.id_usuario = data['id_usuario']
    recuperacion.codigo_verificacion = data['codigo_verificacion']
    recuperacion.fecha_solicitud = data['fecha_solicitud']
    recuperacion.fecha_expiracion = data['fecha_expiracion']
    recuperacion.utilizado = data['utilizado']
    recuperacion.save()
    return jsonify({'message': 'Recuperacion de contraseña actualizada exitosamente'})

def delete_recuperacion_contrasena(id_recuperacion):
    recuperacion = RecuperacionContrasena.get_by_id(id_recuperacion)
    if not recuperacion:
        return jsonify({'message': 'Recuperacion de contraseña no encontrada'}), 404
    recuperacion.delete()
    return jsonify({'message': 'Recuperacion de contraseña eliminada exitosamente'})




#### VEHICULOS ####

def create_auto():
    data = request.json
    new_auto = Vehiculos(nombre=data['nombre'], cant_personas=data['cant_personas'], 
                         cant_valijas_c=data['cant_valijas_c'], 
                         cant_valijas_m=data['cant_valijas_m'], 
                         cant_valijas_g=data['cant_valijas_g'], 
                         autonomia=data['autonomia'], stock_disponible=data['stock_disponible'])
    new_auto.save()
    return jsonify({'message': 'Vehiculo creado exitosamente'}), 201

def get_auto(id):
    auto = Vehiculos.get_by_id(id)
    if not auto:
        return jsonify({'message': 'Vehiculo no encontrado'}), 404
    return jsonify(auto.serialize())

def update_auto(id):
    auto = Vehiculos.get_by_id(id)
    if not auto:
        return jsonify({'message': 'Vehiculo no encontrado'}), 404
    data = request.json
    auto.nombre = data['nombre']
    auto.cant_personas = data['cant_personas']
    auto.cant_valijas_c=data['cant_valijas_c'], 
    auto.cant_valijas_m=data['cant_valijas_m'], 
    auto.cant_valijas_g=data['cant_valijas_g'], 
    auto.autonomia = data['autonomia'],
    auto.stock_disponible = data['stock_disponible']
    auto.save()
    return jsonify({'message': 'Vehiculo actualizado exitosamente'})

def delete_auto(id):
    auto = Vehiculos.get_by_id(id)
    if not auto:
        return jsonify({'message': 'Vehiculo no encontrado'}), 404
    auto.delete()
    return jsonify({'message': 'Vehiculo eliminado exitosamente'})



#### REGISTRO DE ALQUILER ####

def create_registro_alquiler():
    data = request.json
    new_registro = RegistroAlquiler(id_auto=data['id_auto'], nombre_cliente=data['nombre_cliente'], 
                                    email_cliente=data['email_cliente'], 
                                    telefono_cliente=data['telefono_cliente'], 
                                    fecha_alquiler=data['fecha_alquiler'])
    new_registro.save()
    return jsonify({'message': 'Registro de alquiler creado exitosamente'}), 201

def get_registro_alquiler(id_registro):
    registro = RegistroAlquiler.get_by_id(id_registro)
    if not registro:
        return jsonify({'message': 'Registro de alquiler no encontrado'}), 404
    return jsonify(registro.serialize())

def update_registro_alquiler(id_registro):
    registro = RegistroAlquiler.get_by_id(id_registro)
    if not registro:
        return jsonify({'message': 'Registro de alquiler no encontrado'}), 404
    data = request.json
    registro.id_auto = data['id_auto']
    registro.nombre_cliente = data['nombre_cliente']
    registro.email_cliente = data['email_cliente']
    registro.telefono_cliente = data['telefono_cliente']
    registro.fecha_alquiler = data['fecha_alquiler']
    registro.save()
    return jsonify({'message': 'Registro de alquiler actualizado exitosamente'})

def delete_registro_alquiler(id_registro):
    registro = RegistroAlquiler.get_by_id(id_registro)
    if not registro:
        return jsonify({'message': 'Registro de alquiler no encontrado'}), 404
    registro.delete()
    return jsonify({'message': 'Registro de alquiler eliminado exitosamente'})
