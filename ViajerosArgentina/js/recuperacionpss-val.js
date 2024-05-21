document.getElementById("recovery-form").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // Verifica que al menos uno de los campos esté lleno
    if (email === "" && phone === "") {
    alert("Debes ingresar al menos un correo electrónico o un número de teléfono.");
    event.preventDefault(); // Evita que el formulario se envíe
    return;
}
    
    // Verifica que al menos uno de los campos esté lleno
    if (phone !== "") {
        var phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phone-error").textContent = "El número de teléfono solo puede contener dígitos.";
        event.preventDefault(); // Evita que el formulario se envíe
    return;
    }
}
});

//     if (phone !== "") {
//         console.log("Verifying phone number");
//         var phonePattern = /^[0-9]+$/;
//         if (!phonePattern.test(phone)) {
//             document.getElementById("phone-error").textContent = "El número de teléfono solo puede contener dígitos.";
//             event.preventDefault(); // Evita que el formulario se envíe
//             return;
//         }
//     }
    
// });

// Agrega un evento input al campo de teléfono para validar en tiempo real
// document.getElementById("phone").addEventListener("input", function(event) {
//     var phone = event.target.value;
//     var phonePattern = /^[0-9]*$/;
//     if (!phonePattern.test(phone)) {
//         document.getElementById("phone-error").textContent = "El número de teléfono solo puede contener dígitos.";
//     } else {
//         document.getElementById("phone-error").textContent = ""; // Borra el mensaje de error si es válido
//     }
// });