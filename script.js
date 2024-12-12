async function buscarPokemon() {
    const nomePokemon = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemonInfo');

    // Limpa a informação anterior
    pokemonInfoDiv.innerHTML = '';

    if (!nomePokemon) {
        pokemonInfoDiv.innerHTML = '<p>Por favor, insira o nome de um Pokémon.</p>';
        return;
    }

    try {
        // Fazendo uma requisição à API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
        if (!response.ok) {
            pokemonInfoDiv.innerHTML = '<p>Pokémon não encontrado! Tente novamente.</p>';
            return;
        }

        // Obtendo os dados do Pokémon
        const pokemon = await response.json();

        // Exibindo as informações do Pokémon
        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const pokemonType = pokemon.types.map(type => type.type.name).join(', ');
        const pokemonImage = pokemon.sprites.front_default;

        pokemonInfoDiv.innerHTML = `
            <img src="${pokemonImage}" alt="${pokemonName}">
            <p>Nome: ${pokemonName}</p>
            <p>Tipo(s): ${pokemonType}</p>
            <p>Altura: ${pokemon.height / 10} m</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>
        `;
    } catch (error) {
        console.error(error);
        pokemonInfoDiv.innerHTML = '<p>Ocorreu um erro ao buscar os dados do Pokémon.</p>';
    }
}
