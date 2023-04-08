let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']},
    {name: 'Sandslash', height: 1.0, types: ['ground']}
];
for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height <= 1.0) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>');
    } else if (pokemonList[i].height > 1.0) {
        document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - ' + 'Wow, that\'\s big!' + '<br>');
    }
}