function validarFormulario() {

    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var asunto = document.getElementById('asunto').value;
    var mensaje = document.getElementById('mensaje').value;
    var respuesta = document.getElementById('respuesta').value;

    // Validar que los campos obligatorios no estén vacíos
    if (nombre === '' || asunto === '' || mensaje === '') {
        alert('Por favor completa todos los campos obligatorios.');
        return false;
    }

    // Validar que se haya completado email o celular, pero no ambos
    if (email === '' && telefono === '') {
        alert('Debes proporcionar al menos un correo electrónico o un número de teléfono.');
        return false;
    }

    // Validar que el campo de teléfono solo contenga números si está completado
    if (telefono !== '' && !(/^\d+$/.test(telefono))) {
        alert('El número de teléfono solo puede contener números.');
        return false;
    }

    // Validar que la opción seleccionada coincida con el campo completado
    if ((respuesta === 'email' && email === '') || (respuesta === 'celular' && telefono === '')) {
        alert('La opción seleccionada en "Recibir respuesta por" debe coincidir con el campo completado (correo electrónico o celular).');
        return false;
    }

    // Si pasa todas las validaciones, el formulario se puede enviar
    return true;
}

function buscar() {
    var input = document.getElementById("searchInput").value;
    // Aquí realizarías la lógica de búsqueda, por ejemplo, buscar en una lista de elementos
    // En este ejemplo, simplemente mostraremos el texto ingresado en la barra de búsqueda
    document.getElementById("resultados").innerText = "Resultados de búsqueda: " + input;
}