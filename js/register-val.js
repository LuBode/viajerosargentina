const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Ocurrió un error al comunicarse con el servidor. Por favor, inténtalo de nuevo.');
    }
}


function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var passwordConfirm = document.getElementById("passwordConfirm").value;
    var email = document.getElementById("email").value;
    var celular = document.getElementById("celular").value;
    var aceptarTerminos = document.getElementById("aceptarTerminos").checked;

    // Verifica si los campos de usuario, correo y contraseña están vacíos
    if (username.trim() === "" || password.trim() === "" || email.trim() === "") {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
    }

    // Validación de usuario
    if (username.trim() === "") {
        alert("Por favor, ingresa un nombre de usuario.");
        return false;
    }

    // Validación de contraseña
    var passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.\-_]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, un número y uno de los siguientes caracteres especiales: . - _");
        return false;
    }

    // Validacion de confirmacion de contraseña
    if (password !== passwordConfirm) {
        alert("Contraseñas distintas");
        return false;
    }

    // Validación de email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
    }


    // Validación de celular
    var celularPattern = /^[0-9]+$/;
    if (celular !== "" && !celularPattern.test(celular)){    
        if (!celularPattern.test(celular)) {
            document.getElementById("celular-error").textContent = "Solo puede contener números.";
            return false;
        }
    }   

    return true; // Envía el formulario si todas las validaciones son exitosas
}


/*// Validación de nombre de usuario único (consulta AJAX al backend)
var xhr = new XMLHttpRequest();
xhr.open("POST", "/verificar_usuario_disponible", false); // Cambia la URL al endpoint correcto en tu backend
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.send(JSON.stringify({ username: username }));

if (xhr.status === 200) {
    var respuesta = JSON.parse(xhr.responseText);
    if (!respuesta.disponible) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return false;
    }
} else {
    alert("Error al verificar disponibilidad del nombre de usuario.");
    return false;
}

return true; // Envía el formulario si todas las validaciones son exitosas
*/

/**
 * Función para enviar el formulario de registro al servidor.
 */
async function submitForm() {
    if (!validateForm()) {
        return;
    }

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;

    const userData = {
        usuario: username,
        contrasena: password,
        email: email,
        celular: celular,
    };

    try {
        const response = await fetchData(`${BASEURL}/api/register`, 'POST', userData);
        alert(response.message); // Mostrar mensaje de éxito o error
        if (response.status === 'success') {
            document.getElementById("formRegistro").reset(); // Limpiar el formulario después de un registro exitoso
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
    }
}

/**
 * Función para actualizar los datos de un usuario.
 */
async function updateUsuario() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;

    const userData = {
        usuario: username,
        contrasena: password,
        email: email,
        celular: celular,
    };

    try {
        const response = await fetchData(`${BASEURL}/api/register/${usuario}`, 'PUT', userData);
        alert(response.message); // Mostrar mensaje de éxito o error
        // Aquí puedes implementar lógica adicional según la respuesta del servidor
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
}

/**
 * Función para eliminar un usuario.
 */
async function deleteUsuario() {
    const usuario = document.getElementById("username").value; // Aquí debes tener un campo oculto para el ID del usuario

    try {
        const response = await fetchData(`${BASEURL}/api/register/${usuario}`, 'DELETE');
        alert(response.message); // Mostrar mensaje de éxito o error
        // Aquí puedes implementar lógica adicional según la respuesta del servidor
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}

/**
 * Función para obtener todos los usuarios.
 */
async function getAllUsuarios() {
    try {
        const usuarios = await fetchData(`${BASEURL}/api/register`, 'GET');
        // Aquí puedes procesar los usuarios obtenidos según tus necesidades (mostrar en una tabla, etc.)
        console.log(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formRegistro').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
        submitForm(); // Llamar a la función para enviar el formulario
    });
});
