function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verifica si los campos están vacíos
    if (username.trim() == "" || password.trim() == "") {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    return true; // Envía el formulario si todas las validaciones son exitosas
}