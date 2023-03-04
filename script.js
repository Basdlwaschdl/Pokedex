let types = ['normal', 'fire', 'water', 'grass', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
let colors = ['#A8A77A', '#EE8130', '#6390F0', '#7AC74C', '#A98FF3', '#C22E28', '#A33EA1', '#F7D02C', '#E2BF65', '#B6A136', '#F95587', '#96D9D6', '#A6B91A', '#735797', '#B7B7CE', '#6F35FC', '#705746', '#D685AD'];
let pokemonImg;
let pokemonName;
let pokemonType;
let pokemonWeight;
let pokemonHeight;
let pokemonId;
let pokemonStats;
let start = 1;
let limit = 21;


async function loadAllpokemon() {
    document.getElementById('background').style.display = 'none';
    for (let i = start; i < limit; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemonJson = await response.json();
        let name = pokemonJson['name'];
        let img = pokemonJson['sprites']['other']['home']['front_default'];
        let id = pokemonJson['id'];
        let type = pokemonJson['types'][0]['type']['name'];
        renderAllPokemon(name, img, id, type);
    }
}


async function renderAllPokemon(name, img, id, type) {
    let index = types.indexOf(type);
    let color = colors[index];
    document.getElementById('allPokemonMain').innerHTML += `
    <div class="allPokemon" style="background-color:${color};" onclick="loadPokemon('${name}')" >
        <h3>${name}</h3>
        <p>#${id}</p>
        <img src=${img}> 
    </div>`;
}


async function loadPokemon(name) {
    document.getElementById('allPokemonMain').style.filter = "blur(5px)"
    document.getElementById('background').style.display = '';
    document.getElementById('showPokemon').style.transform = "scale(1.0)"
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let pokemonJson = await response.json();
    pokemonImg = pokemonJson['sprites']['other']['home']['front_default'];
    pokemonName = pokemonJson['name'];
    pokemonType = pokemonJson['types'];
    pokemonWeight = pokemonJson['weight'] / 10;
    pokemonHeight = pokemonJson['height'] / 10;
    pokemonId = pokemonJson['id'];
    pokemonStats = pokemonJson['stats'];
    renderPokemon();
}


function renderPokemon() {
    document.getElementById('types').innerHTML = ``;
    for (let i = 0; i < pokemonType.length; i++) {
        let type = pokemonType[i]['type']['name'];
        let index = types.indexOf(type);
        let color = colors[index];
        document.getElementById('types').innerHTML += `
        <div id="typeSub${i}" style="background-color:${color};">${type}</div>`;
    }
    renderStats();
}


function renderStats() {
    for (let i = 0; i < pokemonStats.length; i++) {
        let stat = pokemonStats[i]['base_stat'];
        document.getElementById(`stats${i}`).innerHTML = `${stat}`;
        document.getElementById(`stats${i}`).style.width = `${stat}px`;
        document.getElementById('weight').innerHTML = `${pokemonWeight} Kg<p>Weight</p>`;
        document.getElementById('height').innerHTML = `${pokemonHeight} M<p>Height</p>`;
        document.getElementById('Name').innerHTML = `${pokemonName}`;
        document.getElementById('pokemonImg').style.backgroundImage = `url(${pokemonImg}`;
        document.getElementById('backIDsub').innerHTML = `
        <img src="img/arrow-left.ico" onclick="previosPokemon(${pokemonId})">
        <stan id="backId">#${pokemonId}</stan>
        <img src="img/arrow-right.ico" onclick="nextPokemon(${pokemonId})">`;
    }
}


function previosPokemon(pokemonId) {
    let name = pokemonId -= 1;
    if (name >= 1) {
        loadPokemon(name);
    }
}


function nextPokemon(pokemonId) {
    let name = pokemonId += 1;
    if (name <= 1279) {
        loadPokemon(name);
    }
}


function loadNextPokemons() {
    start += 20;
    limit += 20;
    loadAllpokemon();
}


function searchPokemon() {
    let name = document.getElementById('searchById').value;
    if (name < 1 || name > 1008) {
        alert('Please enter a ID between 1 and 1008')
    }
    else {
        loadPokemon(name);
    }
}


function closePokemon() {
    document.getElementById('showPokemon').style.transform = "scale(0.0)";
    document.getElementById('allPokemonMain').style.filter = "none"
    document.getElementById('background').style.display = 'none';
}