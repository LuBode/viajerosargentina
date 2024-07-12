from app.database import get_db

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
    
    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM registro WHERE usuario = %s", (self.usuario,))
        db.commit()
        cursor.close()


    def serialize(self):
        return {
            'usuario': self.usuario,
            'email': self.email,
            'contrasena': self.contrasena,
            'celular': self.celular
        }