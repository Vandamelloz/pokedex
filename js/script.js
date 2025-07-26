const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonimagem = document.querySelector('.pokemon_image');
const form = document.querySelector('.forms');
const input = document.querySelector('.input_search');

const buttonPrev= document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');
let searchPokemon= 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //await espera o fetch dar uma resposta para seguir para as demais linhas, para isto, a função deve ser assincrona
    //respota da APi, onde irá buscar os dados
    if (APIResponse.status == 200) { //se o pokemon for encontrado
        const data = await APIResponse.json(); //pegar a resposta da api e utilizar json para extrair os dados em json da api                                          
        return data;
    }
    else{
        return null;
    }

}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {//verifica se o pokemon existe nome ou numero
        pokemonimagem.style.display= 'block';

        pokemonName.innerHTML = data.name; //name está dentro da api
        pokemonNumber.innerHTML = data.id;
        pokemonimagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon= data.id;
    } else {
        pokemonimagem.style.display= 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }

}
form.addEventListener('submit', (event) => {
    event.preventDefault();// bloquar evento padrão, não pode enviar o formulario vazio
    renderPokemon(input.value.toLowerCase());

});
buttonPrev.addEventListener('click', () => {
    if(searchPokemon>1){
searchPokemon -=1;
renderPokemon(searchPokemon);
 }
});
buttonNext.addEventListener('click', () => {
searchPokemon +=1;
renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

