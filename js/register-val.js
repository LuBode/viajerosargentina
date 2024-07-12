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
