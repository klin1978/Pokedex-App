let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
        {name: 'Sandslash', height: 1.0, types: ['ground']}
    ];
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
})();

function myLoopFunction(pokemon) {
    document.write(pokemon.name+' (height: '+pokemon.height+')'+'<br>');
}
pokemonRepository.getAll().forEach(myLoopFunction);
