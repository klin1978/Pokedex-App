let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
        {name: 'Sandslash', height: 1.0, types: ['ground']}
    ];
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon){
   pokemonRepository.addListItem(pokemon);
});
