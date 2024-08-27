import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Pokemon from "./Interfaces/pokemonInterface";
import { useEffect, useState } from "react";
import { getPokemonList } from "./services/pokemonListService";
import { getPokemon } from "./services/pokemonService";
import "./styles/App.css";
import PokeDetail from "./components/pokeDetail";


function PokedexApp() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [showDetail, setshowDetail] = useState<boolean>(false);
  const [idSearched, setIdSearched] = useState<number>(0);
  const [searchedState, setSearchedState] = useState<Pokemon[]>([]);

  const types : String[] = ["grass", "fire", "water", "bug", "normal", "poison", "electric","ground", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon"]

  useEffect(() => {
    const fetchPokemonUrlList = async () => {
      const list = await getPokemonList(); 
      const pokemonCompleteList: Pokemon[] = await Promise.all(
        list.map(async (el) => {
          const pokemon: Pokemon = await getPokemon(el.url);
          return pokemon;
        })
      );
      console.table(pokemonCompleteList)
        setPokemonList(pokemonCompleteList)
        setSearchedState(pokemonCompleteList)
    };

    fetchPokemonUrlList(); 

}, []);


function handleDetail(event:any){
  let id = parseInt(event.target.id);
  setIdSearched(id);
  setshowDetail(true);
}

function handleBackBtn(){
  setshowDetail(false);
  setIdSearched(0);
}

function handleSearch (event:any){
  if(event.target.value.length < 1){
    setPokemonList(searchedState);
  }else{
  let filteredList : Pokemon[] = pokemonList.filter(poke=> poke.name.includes(event.target.value.toLowerCase()))
  setPokemonList(filteredList);
  }
}

function handleFilter(event:any){
  if(event.target.value === "All types"){
    setPokemonList(searchedState);
  }else{
    let filteredList :Pokemon[] = searchedState.filter(poke => poke.type === event.target.value);
    setPokemonList(filteredList)
  }
}

  return (
    <>
      <h1 className="title">Pokedex App</h1>
      {!showDetail? 
        <div>
          <input
          placeholder="Search a Pokemon"
          onChange={handleSearch}
          />
          <select onChange={handleFilter}>
            <option>All types</option>
            {types.map(type =>{
              return (
                <option>{type}</option>
              )
            })}
          </select>
        </div>
        :
        null
      }
      <div className="pokemonListContent">
        {
          pokemonList && !showDetail ? pokemonList.map(el =>{
            return(
              <Card className= {"card" + el.type} key={el.id} sx={{ maxWidth: 345 }}>
                  <div className="borderImage">
                    <CardMedia
                        id={el.id.toString()} 
                        onClick={handleDetail}
                        className="imageCard"
                        component="img"
                        image={el.image.includes('.png')? el.image : ""}
                        alt={el.name}
                        sx={{
                        height: 140,
                        objectFit: "contain",
                        }}
                    />
                  </div>
                  <CardContent className="dataContent">
                      <Typography gutterBottom variant="h5" component="div" className="pokeName">
                      {el.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className={"type" + el.type}>
                      {el.type}
                      </Typography>
                      <button className={"type" + el.type} id={el.id.toString()} onClick={handleDetail}>Info</button>
                  </CardContent>
                  </Card>
            )
          }) 
          :
          null 
        }
      </div>
      {
        showDetail ?
        <div>
          <button className="backBtn" onClick={handleBackBtn}>Go Back</button>
          <PokeDetail
            name={searchedState[idSearched -1].name}
            image={searchedState[idSearched -1].image}
            type={searchedState[idSearched -1].type}
            height={searchedState[idSearched -1].height}
            weight={searchedState[idSearched -1].weight}
            move1={searchedState[idSearched -1].move1}
            move2={searchedState[idSearched -1].move2}
            move3={searchedState[idSearched -1].move3}
            hp={searchedState[idSearched -1].hp}
            attack={searchedState[idSearched -1].attack}
            defense={searchedState[idSearched -1].defense}
            speed={searchedState[idSearched -1].speed}
          />
        </div>
        :
        null 
      }
    </>
  )
}

export default PokedexApp;
