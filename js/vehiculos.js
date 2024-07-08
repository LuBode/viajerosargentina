document.addEventListener('DOMContentLoaded', () => {
    const formAgregar = document.getElementById('formAgregar');
    const listaVehiculos = document.getElementById('vehiculos');

    // Función para cargar los vehículos desde la API
    function cargarVehiculos() {
        fetch('/api/alquiler-de-autos/')
            .then(response => response.json())
            .then(vehiculos => {
                listaVehiculos.innerHTML = '';
                vehiculos.forEach(vehiculo => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${vehiculo.nombre}</strong> 
                        (Categoría: ${vehiculo.categoria}, Personas: ${vehiculo.cant_personas}, 
                        Chicas: ${vehiculo.cant_valijas_c}, Medianas: ${vehiculo.cant_valijas_m}, 
                        Grandes: ${vehiculo.cant_valijas_g}, Autonomía: ${vehiculo.autonomia}, 
                        Stock: ${vehiculo.stock_disponible})
                        <button onclick="eliminarVehiculo(${vehiculo.id})">Eliminar</button>
                        <button onclick="cargarFormEditar(${vehiculo.id})">Editar</button>
                    `;
                    listaVehiculos.appendChild(li);
                });
            })
            .catch(error => console.error('Error al cargar vehículos:', error));
    }

    // Función para agregar un nuevo vehículo
    formAgregar.addEventListener('submit', event => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const categoria = document.getElementById('categoria').value;
        const cant_personas = parseInt(document.getElementById('cant_personas').value);
        const cant_valijas_c = parseInt(document.getElementById('cant_valijas_c').value);
        const cant_valijas_m = parseInt(document.getElementById('cant_valijas_m').value) || null;
        const cant_valijas_g = parseInt(document.getElementById('cant_valijas_g').value) || null;
        const autonomia = parseInt(document.getElementById('autonomia').value);
        const stock_disponible = parseInt(document.getElementById('stock_disponible').value);

        const nuevoVehiculo = {
            nombre: nombre,
            categoria: categoria,
            cant_personas: cant_personas,
            cant_valijas_c: cant_valijas_c,
            cant_valijas_m: cant_valijas_m,
            cant_valijas_g: cant_valijas_g,
            autonomia: autonomia,
            stock_disponible: stock_disponible
        };

        fetch('/api/alquiler-de-autos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoVehiculo),
        })
        .then(response => response.json())
        .then(() => {
            formAgregar.reset();
            cargarVehiculos();
        })
        .catch(error => console.error('Error al agregar vehículo:', error));
    });

    // Función para eliminar un vehículo
    function delete_auto(nombre) {
        if (confirm('¿Estás seguro de querer eliminar este vehículo?')) {
            fetch(`/api/alquiler-de-autos/${nombre}`, {
                method: 'DELETE',
            })
            .then(() => cargarVehiculos())
            .catch(error => console.error('Error al eliminar vehículo:', error));
        }
    }

    // Función para cargar el formulario de edición de un vehículo
    function cargarFormEditar(id) {
        fetch(`/api/alquiler-de-autos/${id}`)
            .then(response => response.json())
            .then(vehiculo => {
                // Llenar el formulario con los datos del vehículo
                document.getElementById('editId').value = vehiculo.id;
                document.getElementById('editNombre').value = vehiculo.nombre;
                document.getElementById('editCategoria').value = vehiculo.categoria;
                document.getElementById('editCantPersonas').value = vehiculo.cant_personas;
                document.getElementById('editCantValijasC').value = vehiculo.cant_valijas_c;
                document.getElementById('editCantValijasM').value = vehiculo.cant_valijas_m || '';
                document.getElementById('editCantValijasG').value = vehiculo.cant_valijas_g || '';
                document.getElementById('editAutonomia').value = vehiculo.autonomia;
                document.getElementById('editStockDisponible').value = vehiculo.stock_disponible;

                // Mostrar el formulario de edición
                document.getElementById('editarForm').style.display = 'block';
            })
            .catch(error => console.error('Error al cargar vehículo para editar:', error));
    }

    // Evento para el botón de cancelar edición
    document.getElementById('btnCancelar').addEventListener('click', () => {
        document.getElementById('editarForm').style.display = 'none';
    });

    // Evento para el formulario de edición
    document.getElementById('formEditar').addEventListener('submit', event => {
        event.preventDefault();

        const id = document.getElementById('editId').value;
        const nombre = document.getElementById('editNombre').value;
        const categoria = document.getElementById('editCategoria').value;
        const cant_personas = parseInt(document.getElementById('editCantPersonas').value);
        const cant_valijas_c = parseInt(document.getElementById('editCantValijasC').value);
        const cant_valijas_m = parseInt(document.getElementById('editCantValijasM').value) || null;
        const cant_valijas_g = parseInt(document.getElementById('editCantValijasG').value) || null;
        const autonomia = parseInt(document.getElementById('editAutonomia').value);
        const stock_disponible = parseInt(document.getElementById('editStockDisponible').value);

        const vehiculoActualizado = {
            id,
            nombre,
            categoria,
            cant_personas,
            cant_valijas_c,
            cant_valijas_m,
            cant_valijas_g,
            autonomia,
            stock_disponible
        };

        fetch(`/api/alquiler-de-autos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculoActualizado),
        })
        .then(() => {
            document.getElementById('editarForm').style.display = 'none';
            cargarVehiculos();
        })
        .catch(error => console.error('Error al actualizar vehículo:', error));
    });

     // Función para buscar vehículos por nombre o categoría
     window.buscar = () => {
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        fetch('/api/alquiler-de-autos/')
            .then(response => response.json())
            .then(vehiculos => {
                listaVehiculos.innerHTML = '';
                vehiculos.forEach(vehiculo => {
                    // Convertir los valores a minúsculas para una búsqueda insensible a mayúsculas
                    const nombreLowerCase = vehiculo.nombre.toLowerCase();
                    const categoriaLowerCase = vehiculo.categoria.toLowerCase();
                    
                    // Verificar si el nombre o la categoría contienen el texto de búsqueda
                    if (nombreLowerCase.includes(searchText) || categoriaLowerCase.includes(searchText)) {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <strong>${vehiculo.nombre}</strong> 
                            (Categoría: ${vehiculo.categoria}, Personas: ${vehiculo.cant_personas}, 
                            Chicas: ${vehiculo.cant_valijas_c}, Medianas: ${vehiculo.cant_valijas_m}, 
                            Grandes: ${vehiculo.cant_valijas_g}, Autonomía: ${vehiculo.autonomia}, 
                            Stock: ${vehiculo.stock_disponible})
                            <button onclick="eliminarVehiculo(${vehiculo.id})">Eliminar</button>
                            <button onclick="cargarFormEditar(${vehiculo.id})">Editar</button>
                        `;
                        listaVehiculos.appendChild(li);
                    }
                });
            })
            .catch(error => console.error('Error al buscar vehículos:', error));
    };

    // Cargar los vehículos al cargar la página
    cargarVehiculos();
});
