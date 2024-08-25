import PokemonList from "../Interfaces/pokemonListInterface";

const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=151";

export const getPokemonList = async (): Promise<PokemonList[]> => {
    try {
      const response = await fetch(URL_API);
      const pokemonList = await response.json();
      const resPokemonList: PokemonList[] = pokemonList.results;
      return resPokemonList;
    } catch (error) {
      console.log(error);
      return []; 
    }
  };