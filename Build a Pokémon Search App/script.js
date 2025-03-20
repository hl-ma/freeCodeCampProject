const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const image = document.getElementById("image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttach = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const fetchPokemon = async () => {
    try {
        const pokemon = await fetch(`${pokemonUrl}${(searchInput.value).toLowerCase()}`);
        if (!pokemon.ok) {
            throw new Error("Pokémon not found");
        }
        return await pokemon.json();
    } catch (error) {
        console.error("Error fetching Pokémon:", error.message);
        return null;
    }
}

const searchPokemon = async () => {
    const pokemonData = await fetchPokemon();
    if (!pokemonData) {
        alert("Pokemon not found");
        clearPokemonCardAndStats();
        return;
    }
    createPokemonCard(pokemonData);
    handlePokemonStats(pokemonData);
}

const createPokemonCard = (pokemonData) => {
    pokemonName.textContent = (pokemonData.name).toUpperCase();
    pokemonId.textContent = `#${pokemonData.id}`;
    weight.textContent = `Weight: ${pokemonData.weight}`;
    height.textContent = `Height: ${pokemonData.height}`;
    image.innerHTML = `<img id="sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name} front image">`;
    types.innerHTML = pokemonData.types.map((el) => `
    <span class="type ${el.type.name}">${el.type.name}</span>
    `).join('');
}

const handlePokemonStats = (pokemonData) => {
    hp.textContent = `${pokemonData.stats[0].base_stat}`;
    attack.textContent = `${pokemonData.stats[1].base_stat}`;
    defense.textContent = `${pokemonData.stats[2].base_stat}`;
    specialAttach.textContent = `${pokemonData.stats[3].base_stat}`;
    specialDefense.textContent = `${pokemonData.stats[4].base_stat}`;
    speed.textContent = `${pokemonData.stats[5].base_stat}`;
}

const clearPokemonCardAndStats = () => {
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    image.innerHTML = "";
    types.innerHTML = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttach.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
}

searchButton.addEventListener("click", () => {
    searchPokemon();
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchPokemon();
    }
});