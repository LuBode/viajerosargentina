function validarFormulario() {
    var nombre = document.getElementById('nombre').value.trim();
    var lugar = document.getElementById('lugar').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    var fotoInput = document.getElementById('foto').files[0];

    // Verificar que los campos obligatorios estén completos
    if (nombre === '' || lugar === '' || mensaje === '' || !fotoInput) {
        alert('Por favor, completa todos los campos obligatorios.');
        return false; // Evitar el envío del formulario si faltan campos obligatorios
    }

    // Verificar el formato de la foto
    var extensionesPermitidas = ['image/jpeg', 'image/png', 'video/mp4'];
    if (extensionesPermitidas.indexOf(fotoInput.type) === -1) {
        alert('Por favor, selecciona un archivo de imagen (JPEG, PNG) o video (MP4).');
        return false; // Evitar el envío del formulario si el formato no es válido
    }

    return true; // Envío del formulario si pasa todas las validaciones
}

function actualizarContador() {
    var mensaje = document.getElementById('mensaje').value;
    var contador = document.getElementById('contador');
    var caracteresRestantes = 1000 - mensaje.length;
    contador.textContent = caracteresRestantes + '/1000';
    
    // Deshabilitar la entrada de texto cuando el contador llega a cero
    var mensajeInput = document.getElementById('mensaje');
    if (caracteresRestantes <= 0) {
        mensajeInput.value = mensajeInput.value.slice(0, 1000);
        mensajeInput.setAttribute('disabled', 'disabled');
    } else {
        mensajeInput.removeAttribute('disabled');
    }
}

function publicarMensaje() {
    
    var nombre = document.getElementById('nombre').value;
    var lugar = document.getElementById('lugar').value;
    var mensaje = document.getElementById('mensaje').value;
    var fotoInput = document.getElementById('foto').files[0];
    
    var mensajesList = document.getElementById('mensajesList');
    var nuevoMensaje = document.createElement('div');
    nuevoMensaje.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Lugar:</strong> ${lugar}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>`;
    
    if (fotoInput) {
        var imagen = document.createElement('img');
        imagen.classList.add('mensaje-imagen');
        var imagenURL = URL.createObjectURL(fotoInput);
        imagen.src = imagenURL;
        nuevoMensaje.appendChild(imagen);
    }

    mensajesList.appendChild(nuevoMensaje);

    // Resetear el formulario después de publicar el mensaje
    document.getElementById('formulario').reset();
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); // Evitar el envío del formulario si la validación falla
    } else {
        event.preventDefault(); // Evitar el comportamiento predeterminado de enviar el formulario
        publicarMensaje(event); // Llamar a la función para publicar el mensaje
    }
});


