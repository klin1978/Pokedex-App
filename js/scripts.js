let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class', 'btn', 'btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-container');
        listPokemon.classList.add('list-group-item');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showLoadingMessage() {
        let showLoadingMessage = document.querySelector('.loading-message');
        showLoadingMessage.innerText = 'Loading, please wait';
        showLoadingMessage.classList.add('is-visible');
    }

    function hideLoadingMessage() {
        let hideLoadingMessage = document.querySelector('.loading-message');
        hideLoadingMessage.classList.remove('is-visible');
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        })
    }

    function loadDetails(pokemon){
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function(){

            let modalTitle = document.querySelector('.modal-title');
            modalTitle.innerText = pokemon.name;

            let pokemonHeight = document.querySelector('.pokemon-height');
            pokemonHeight.innerText = 'Height:' + ' ' + pokemon.height;

            let pokemonImage = document.querySelector('.pokemon-image');
            pokemonImage.src = pokemon.imageUrl;
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showDetails,
    };
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
     });
});

