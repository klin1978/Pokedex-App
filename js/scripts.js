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
        button.classList.add('button-class');
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
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
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function(){

            let modalContainer = document.querySelector('#modal-container');

            let modalTitle = document.querySelector('.modal-title');
            modalTitle.innerText = pokemon.name;

            let modalClose = document.querySelector('.modal-close');
            let modalCloseElement = document.createElement('button');
            modalCloseElement.innerText = 'close';
            modalCloseElement.addEventListener('click', hideModal);
            modalClose.innerHTML = '';
            modalClose.append(modalCloseElement);

            let pokemonHeight = document.querySelector('.pokemon-height');
            pokemonHeight.innerText = 'Height:' + ' ' + pokemon.height;

            let imageContainer = document.querySelector('#image-container');
            let pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.imageUrl;
            pokemonImage.classList.add('pokemon-image');
            imageContainer.innerHTML = '';
            imageContainer.append(pokemonImage);

            modalContainer.classList.add('is-visible');
        })
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
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

