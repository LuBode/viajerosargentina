from app.database import get_db
from datetime import datetime, timedelta

#### MODELO DE DATOS PARA REGISTRO, LOGIN Y RECUPERACION DE CONTRASEÑAS ####

class Registro:
    def __init__(self, usuario=None, email=None, contrasena=None, celular=None):
        self.usuario = usuario
        self.email = email
        self.contrasena = contrasena
        self.celular = celular

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.usuario:
            # Actualizar usuario existente
            cursor.execute("""
                UPDATE registro SET email = %s, contrasena = %s, celular = %s
                WHERE usuario = %s
            """, (self.email, self.contrasena, self.celular, self.usuario))
        else:
            # Insertar nuevo usuario
            cursor.execute("""
                INSERT INTO registro (usuario, email, contrasena, celular) VALUES (%s, %s, %s, %s)
            """, (self.usuario, self.email, self.contrasena, self.celular))
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM registro")
        rows = cursor.fetchall()
        usuarios = [Registro(usuario=row[0], email=row[1], contrasena=row[2], celular=row[3]) for row in rows]
        cursor.close()
        return usuarios

    @staticmethod
    def get_by_email(email):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM registro WHERE email = %s", (email,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Registro(usuario=row[0], email=row[1], contrasena=row[2], celular=row[3])
        return None

    @staticmethod
    def get_by_usuario(usuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM registro WHERE usuario = %s", (usuario,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Registro(usuario=row[0], email=row[1], contrasena=row[2], celular=row[3])
        return None
    
    def delete(email):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM registro WHERE email = %s", (email,))
        db.commit()
        cursor.close()


    def serialize(self):
        return {
            'usuario': self.usuario,
            'email': self.email,
            'contrasena': self.contrasena,
            'celular': self.celular
        }



class Login:
    
    def __init__(self, id=None, usuario=None, contrasena=None, ultimo_ingreso=None, intentos_fallidos=None):
        self.id = id
        self.usuario = usuario
        self.contrasena = contrasena
        self.ultimo_ingreso = ultimo_ingreso
        self.intentos_fallidos = intentos_fallidos

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            # Actualizar login existente
            cursor.execute("""
                UPDATE login SET usuario = %s, contrasena = %s, ultimo_ingreso = %s, intentos_fallidos = %s
                WHERE id = %s
            """, (self.usuario, self.contrasena, self.ultimo_ingreso, self.intentos_fallidos, self.id))
        else:
            # Insertar nuevo login
            cursor.execute("""
                INSERT INTO login (usuario, contrasena, ultimo_ingreso, intentos_fallidos)
                VALUES (%s, %s, %s, %s)
            """, (self.usuario, self.contrasena, self.ultimo_ingreso, self.intentos_fallidos))
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_by_usuario(usuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM login WHERE usuario = %s", (usuario,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Login(id=row[0], usuario=row[1], contrasena=row[2], ultimo_ingreso=row[3], intentos_fallidos=row[4])
        return None

    def serialize(self):
        return {
            'id': self.id,
            'usuario': self.usuario,
            'ultimo_ingreso': self.ultimo_ingreso.strftime('%Y-%m-%d %H:%M:%S') if self.ultimo_ingreso else None,
            'intentos_fallidos': self.intentos_fallidos
        }

    def update_ultimo_ingreso(self):
        self.ultimo_ingreso = datetime.now()
        self.save()

    def incrementar_intentos_fallidos(self):
        self.intentos_fallidos += 1
        self.save()

    def reiniciar_intentos_fallidos(self):
        self.intentos_fallidos = 0
        self.save()



class RecuperacionContrasena:
    def __init__(self, id=None, email=None, telefono=None, usuario=None, codigo_verificacion=None, fecha_solicitud=None, fecha_expiracion=None, utilizado=False):
        self.id = id
        self.email = email
        self.telefono = telefono
        self.usuario = usuario
        self.codigo_verificacion = codigo_verificacion
        self.fecha_solicitud = fecha_solicitud
        self.fecha_expiracion = fecha_expiracion
        self.utilizado = utilizado

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            # Actualizar recuperación existente
            cursor.execute("""
                UPDATE recuperacion_contrasena SET email = %s, telefono = %s, usuario = %s, codigo_verificacion = %s,
                fecha_solicitud = %s, fecha_expiracion = %s, utilizado = %s WHERE id = %s
            """, (self.email, self.telefono, self.usuario, self.codigo_verificacion, self.fecha_solicitud, self.fecha_expiracion, self.utilizado, self.id))
        else:
            # Insertar nueva recuperación
            cursor.execute("""
                INSERT INTO recuperacion_contrasena (email, telefono, usuario, codigo_verificacion, fecha_solicitud, fecha_expiracion, utilizado)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (self.email, self.telefono, self.usuario, self.codigo_verificacion, self.fecha_solicitud, self.fecha_expiracion, self.utilizado))
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_by_codigo_verificacion(codigo_verificacion):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM recuperacion_contrasena WHERE codigo_verificacion = %s", (codigo_verificacion,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return RecuperacionContrasena(id=row[0], email=row[1], telefono=row[2], usuario=row[3], codigo_verificacion=row[4], fecha_solicitud=row[5], fecha_expiracion=row[6], utilizado=row[7])
        return None

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'telefono': self.telefono,
            'usuario': self.usuario,
            'codigo_verificacion': self.codigo_verificacion,
            'fecha_solicitud': self.fecha_solicitud.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_solicitud else None,
            'fecha_expiracion': self.fecha_expiracion.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_expiracion else None,
            'utilizado': self.utilizado
        }

    @staticmethod
    def generar_codigo_verificacion():
        # Aquí puedes implementar la generación de un código único, por ejemplo, un UUID o un código aleatorio
        return '123456'  # Ejemplo, deberías generar un código adecuado

    @staticmethod
    def calcular_fecha_expiracion():
        # Supongamos que la recuperación expira en 24 horas desde la solicitud
        return datetime.now() + timedelta(hours=24)



#### MODELO DE DATOS PARA VEHICULOS Y ALQUILERES ####


class Vehiculos:

    def __init__(self, id =None, nombre=None, cant_personas=None, 
                 cant_valijas_c=None, cant_valijas_m=None, cant_valijas_g = None, 
                 autonomia=None, stock_disponible=None):
        self.id = id
        self.nombre = nombre
        self.cant_personas = cant_personas
        self.cant_valijas_c = cant_valijas_c
        self.cant_valijas_m = cant_valijas_m
        self.cant_valijas_g = cant_valijas_g
        self.autonomia   = autonomia
        self.stock_disponible = stock_disponible

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            # Actualizar vehiculo existente
            cursor.execute("""
                UPDATE vehiculos SET nombre = %s, cant_personas = %s, cant_valijas_c = %s,
                           cant_valijas_m = %s, cant_valijas_g = %s, autonomia = %s, stock_disponible = %s
                WHERE id = %s
            """, (self.nombre, self.cant_personas, self.cant_valijas_c, self.cant_valijas_m, 
                  self.cant_valijas_g, self.autonomia, self.stock_disponible, self.id_auto))
        else:
            # Insertar nuevo auto
            cursor.execute("""
                INSERT INTO vehiculos (nombre, cant_personas, cant_valijas_c, 
                           cant_valijas_m, cant_valijas_g, autonomia, stock_dispobible) VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (self.nombre, self.cant_personas, self.cant_valijas_c, self.cant_valijas_m, 
                  self.cant_valijas_g, self.autonomia, self.stock_disponible, self.id_auto))
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM vehiculos")
        rows = cursor.fetchall()
        vehiculos = [Vehiculos(id=row[0], nombre=row[1], cant_personas=row[2], 
                           cant_valijas_c=row[3], cant_valijas_m=row[4], cant_valijas_g=row[5],
                           autonomia=row[6], stock_disponible=row[7]) for row in rows]
        cursor.close()
        return vehiculos

    @staticmethod
    def get_by_id(id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM vehiculos WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Vehiculos(id=row[0], nombre=row[1], cant_personas=row[2], 
                           cant_valijas_c=row[3], cant_valijas_m=row[4], cant_valijas_g=row[5],
                           autonomia=row[6], stock_disponible=row[7])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM vehiculos WHERE id = %s", (self.id,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'cant_personas': self.cant_personas,
            'cant_valijas_c': self.cant_valijas_c,
            'cant_valijas_m': self.cant_valijas_m,
            'cant_valijas_g': self.cant_valijas_g,
            'autonomia': self.autonomia,
            'stock_disponible': self.stock_disponible
        }


class RegistroAlquiler:

    def __init__(self, id=None, id_auto=None, nombre_cliente=None, email_cliente=None, telefono_cliente=None, fecha_alquiler=None):
        self.id = id
        self.id_auto = id_auto
        self.nombre_cliente = nombre_cliente
        self.email_cliente = email_cliente
        self.telefono_cliente = telefono_cliente
        self.fecha_alquiler = fecha_alquiler

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            # Actualizar registro existente
            cursor.execute("""
                UPDATE registros_alquileres SET id_auto = %s, nombre_cliente = %s, email_cliente = %s,
                telefono_cliente = %s, fecha_alquiler = %s WHERE id = %s
            """, (self.id_auto, self.nombre_cliente, self.email_cliente, self.telefono_cliente, self.fecha_alquiler, self.id))
        else:
            # Insertar nuevo registro
            cursor.execute("""
                INSERT INTO registros_alquileres (id_auto, nombre_cliente, email_cliente, telefono_cliente, fecha_alquiler)
                VALUES (%s, %s, %s, %s, %s)
            """, (self.id_auto, self.nombre_cliente, self.email_cliente, self.telefono_cliente, self.fecha_alquiler))
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_by_id(id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM registros_alquileres WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return RegistroAlquiler(id=row[0], id_auto=row[1], nombre_cliente=row[2], email_cliente=row[3], telefono_cliente=row[4], fecha_alquiler=row[5])
        return None

    def serialize(self):
        return {
            'id': self.id,
            'id_auto': self.id_auto,
            'nombre_cliente': self.nombre_cliente,
            'email_cliente': self.email_cliente,
            'telefono_cliente': self.telefono_cliente,
            'fecha_alquiler': self.fecha_alquiler.strftime('%Y-%m-%d %H:%M:%S') if self.fecha_alquiler else None
        }
