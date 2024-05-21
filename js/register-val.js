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