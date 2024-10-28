document.getElementById('btnBuscar').addEventListener('click', () =>{
    const query= document.getElementById('inputBuscar').value.trim();
    if(query){
        buscarImagenes(query);
    }
})

async function buscarImagenes(query){
    const url= `https://images-api.nasa.gov/search?q=${query}`;
    try{
        const response= await fetch(url);
        const data= await response.json();
        mostrarResultados(data.collection.items)
    } catch (error){
        console.error('Error fetching data:', error);
    }
}

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';
    items.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const image = item.links ? item.links[0].href : '';
  
      const cardHTML = `
        <div class="col-md-3 my-2">
          <div class="card">
            <img src="${image}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description || 'Sin descripción disponible'}</p>
              <p class="card-text"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
            </div>
          </div>
        </div>
      `;
      contenedor.innerHTML += cardHTML;
    });
  }