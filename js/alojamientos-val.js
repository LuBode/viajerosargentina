function filterResults() {
    const destination = document.getElementById('destinationFilter').value.toLowerCase();
    const type = document.getElementById('typeFilter').value.toLowerCase();
    const people = document.getElementById('peopleFilter').value;
    const date = document.getElementById('dateFilter').value;
    // Aquí puedes agregar el código necesario para filtrar los resultados
    console.log('Filtrando resultados por:', destination, type, people, date);
}