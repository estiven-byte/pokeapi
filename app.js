const btnBuscar = document.getElementById('btnBuscar');
const inputNombre = document.getElementById('inputNombre');
const resultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', async () => {
    const nombre = inputNombre.value.toLowerCase().trim();

    if(!nombre) return;

    resultado.innerHTML = 'Buscando......';

    try{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if(!respuesta.ok){
            throw new Error('pokemon no encontrado')
        }

        const datos = await respuesta.json();
        mostrarPokemon(datos);
    }
    catch (error){
        resultado.innerHTML = `<p> X ${error.message}</p>`;
    }
    

});
function mostrarPokemon(datos){
    const tipos = datos.types.map(t => t.type.name).join(', ');
    resultado.innerHTML = `
        <div class="tarjeta">
            <h2>${datos.name}</h2>
            <img src="${datos.sprites.front_default}">
            <p>Tipo: ${tipos}</p>
            <p>Peso: ${datos.weight}</p>
            <p>Altura: ${datos.height}</p>
        </div>
    `
}