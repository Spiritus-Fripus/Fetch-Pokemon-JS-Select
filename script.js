fetchAndRenderPokemon();

async function fetchAndRenderPokemon() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0",
    );
    if (!response.ok) {
      throw new Error("Could not find pokemon data from fetchAndRenderPokemon");
    }
    const data = await response.json();

    data.results.forEach(function (pokemon) {
      fetchPokemonData(pokemon);
    });

    onSelectChange();
  } catch (error) {
    console.error(error);
  }
}

async function fetchPokemonData(pokemon) {
  try {
    const url = pokemon.url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Could not fetch pokemon data from fetchPokemonData ");
    }
    const data = await response.json();
    await renderPokemon(data);
  } catch (error) {
    console.log(error);
  }
}

async function renderPokemon(pokeData) {
  const renderSelect = document.getElementById("pokemonSelect");
  const renderOption = document.createElement("option");
  renderOption.innerText = pokeData.name;

  renderSelect.appendChild(renderOption);
}

function onSelectChange() {
  const renderSelect = document.getElementById("pokemonSelect");
  renderSelect.addEventListener("change", async function (event) {
    try {
      const selectedPokemon = event.target.value;

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`,
      );

      if (!response.ok) {
        throw new Error("Could not fetch pokemon data from Listener 'change' ");
      }
      const data = await response.json();

      clearPokemonInfo();
      renderList(data, "name");
      renderList(data, "id");
      fetchType(data);
      renderPokemonImg(data);
    } catch (error) {
      console.error(error);
    }
  });
}

function renderPokemonImg(pokeSprite) {
  const pokemonSprite =
    pokeSprite.sprites.other["official-artwork"].front_default;
  const imgElementDefault = document.getElementById("pokemonImg");
  imgElementDefault.src = pokemonSprite;
  imgElementDefault.style.display = "block";
}

function renderList(data, paramJson) {
  const pokemonList = document.getElementById("listInfo");
  const createLi = document.createElement("li");
  createLi.setAttribute("id", "liInfo");
  createLi.innerText = data[paramJson];
  pokemonList.appendChild(createLi);
}

function clearPokemonInfo() {
  const pokemonList = document.getElementById("listInfo");
  pokemonList.innerText = "";
}

function fetchType(data) {
  const pokemonList = document.getElementById("listInfo");

  let liElements = [];

  data.types.forEach((types) => {
    const createLi = document.createElement("li");

    createLi.innerText = types.type.name;

    liElements.push(createLi);
  });

  liElements.forEach((li) => {
    pokemonList.appendChild(li);
  });
}
