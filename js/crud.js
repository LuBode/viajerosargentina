const BASEURL = 'http://127.0.0.1:5000';

/**
 * Realiza una petición fetch con opciones dadas.
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
    alert('Ocurrió un error al obtener los datos. Por favor, inténtalo de nuevo.');
  }
}

/**
 * Función para guardar o actualizar un usuario.
 */
// async function saveUsuario() {
//   const usuario = document.querySelector('#nombre').value;
//   const email = document.querySelector('#email').value;
//   const contrasena = document.querySelector('#contrasena').value;
//   const celular = document.querySelector('#celular').value;

  // Validación del formulario
//   if (!usuario || !contrasena || !email || !celular) {
//     Swal.fire({
//       title: 'Error!',
//       text: 'Por favor completa todos los campos.',
//       icon: 'error',
//       confirmButtonText: 'Cerrar'
//     });
//     return;
//   }

//   const usuarioData = {
//     usuario: usuario,
//     email: email,
//     contrasena: contrasena,
//     celular: celular,
//   };

//   let result = null;
//   if (usuario !== "") {
//     result = await fetchData(`${BASEURL}/api/administracion/${usuario}`, 'PUT', usuarioData);
//   } else {
//     result = await fetchData(`${BASEURL}/api/administracion/`, 'POST', usuarioData);
//   }

//   const formUsuario = document.querySelector('#form-gestion');
//   formUsuario.reset();
//   Swal.fire({
//     title: 'Éxito!',
//     text: result.message,
//     icon: 'success',
//     confirmButtonText: 'Cerrar'
//   });
//   showUsuarios();
// }

async function saveUsuario() {
    const usuario = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const contrasena = document.querySelector('#contrasena').value;
    const celular = document.querySelector('#celular').value;

    // Validación del formulario
    if (!usuario || !contrasena || !email || !celular) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    const usuarioData = {
        usuario: usuario,
        email: email,
        contrasena: contrasena,
        celular: celular,
    };

    try {
        let result = null;
        if (usuario !== "") {
            result = await fetchData(`${BASEURL}/api/administracion/${usuario}`, 'PUT', usuarioData);
        } else {
            result = await fetchData(`${BASEURL}/api/administracion/`, 'POST', usuarioData);
        }

        const formUsuario = document.querySelector('#form-gestion');
        formUsuario.reset();

        Swal.fire({
            title: 'Éxito!',
            text: result.message,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });

        showUsuarios(); // Asegúrate de que esta función exista y muestre los usuarios actualizados
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        alert('Ocurrió un error al guardar usuario. Por favor, inténtalo de nuevo.');
    }
}

/**
 * Función para mostrar la lista de usuarios en una tabla.
 */
async function showUsuarios() {
  //try {
    let usuarios = await fetchData(`${BASEURL}/api/administracion/`, 'GET');
    const tableUsuarios = document.querySelector('#list-table-usuarios tbody');
    tableUsuarios.innerHTML = '';
    usuarios.forEach((usuario,index) => {
      let tr = `<tr>
                  <td>${usuario.usuario}</td>
                  <td>${usuario.email}</td>
                  <td>${usuario.contrasena}</td>
                  <td>${usuario.celular}</td>
                  <td>
                      <button class="btn-agregar" onclick='updateUsuario("${usuario.usuario}")'><i class="fa fa-pencil"></i></button>
                      <button class="btn-agregar" onclick='deleteUsuario("${usuario.usuario}")'><i class="fa fa-trash"></i></button>
                  </td>
                </tr>`;
      tableUsuarios.insertAdjacentHTML("beforeend", tr);
    });}
//   } catch (error) {
//     console.error('Error al mostrar usuarios:', error);
//     alert('Ocurrió un error al mostrar usuarios. Por favor, inténtalo de nuevo.');
//   }
// }

/**
 * Función para cargar los datos de un usuario en el formulario de edición.
 * @param {string} usuario - El nombre de usuario a editar.
 */
async function updateUsuario(usuario) {
  try {
    let response = await fetchData(`${BASEURL}/api/administracion/${usuario}`, 'GET');
    const nombreInput = document.querySelector('#nombre');
    const contrasenaInput = document.querySelector('#contrasena');
    const emailInput = document.querySelector('#email');
    const celularInput = document.querySelector('#celular');

    nombreInput.value = response.usuario;
    emailInput.value = response.email;
    contrasenaInput.value = response.contrasena;
    celularInput.value = response.celular;

  } catch (error) {
    console.error('Error al obtener usuario para edición:', error);
    alert('Ocurrió un error al cargar usuario para edición. Por favor, inténtalo de nuevo.');
  }
}

/**
 * Función para eliminar un usuario.
 * @param {string} usuario - El nombre de usuario a eliminar.
 */
// async function deleteUsuario(usuario) {
//   try {
//     let response = await fetchData(`${BASEURL}/api/administracion/${usuario}`, 'DELETE');
//     showUsuarios();
//     Swal.fire('Éxito!', response.message, 'success');
//   } catch (error) {
//     console.error('Error al eliminar usuario:', error);
//     alert('Ocurrió un error al eliminar usuario. Por favor, inténtalo de nuevo.');
//   }
// }
function deleteUsuario(usuario){
    Swal.fire({
        title: "Esta seguro de eliminar el usuario?",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
}).then(async (result) => {
    if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/administracion/${usuario}`, 'DELETE');
        showUsuarios();
        Swal.fire(response.message, "", "success");
}
});
}

// Espera a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', function () {
  const btnSaveUsuario = document.querySelector('#btn-agregar-usuario');
  btnSaveUsuario.addEventListener('click', saveUsuario);
  showUsuarios();
});
