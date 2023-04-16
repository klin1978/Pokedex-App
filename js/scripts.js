let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
    {name: 'Sandslash', height: 1.0, types: ['ground']}
];

function myLoopFunction(pokemon) {
    document.write(pokemon.name+' (height: '+pokemon.height+')'+'<br>');
}
pokemonList.forEach(myLoopFunction);
