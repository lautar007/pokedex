import Pokemon from "../Interfaces/pokemonInterface";


export const getPokemon = async (url: string): Promise<Pokemon> => {
    try {
      const response = await fetch(url);
      const pokemon: any = await response.json();
      const resPokemon: Pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types[0].type.name,
        height: pokemon.height,
        weight: pokemon.weight,
        move1: pokemon.moves[0].move.name,
        move2: pokemon.moves[1].move.name,
        move3: pokemon.moves[2].move.name,
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat
      }
      return resPokemon;
    } catch (error) {
      console.log(error);
      return {
        id: 0,
        name:"",
        image: "",
        type: "",
        height: 0,
        weight:0,
        move1: "",
        move2: "",
        move3: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0
      }
    }
  };
