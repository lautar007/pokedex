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

  useEffect(() => {
    const fetchPokemonUrlList = async () => {
      const list = await getPokemonList(); 
      const pokemonCompleteList: Pokemon[] = await Promise.all(
        list.map(async (el) => {
          const pokemon: Pokemon = await getPokemon(el.url);
          return pokemon;
        })
      );

        setPokemonList(pokemonCompleteList)
    };

    fetchPokemonUrlList(); 

}, []);

console.log(pokemonList[0]);

function handleDetail(event:any){
  let id = parseInt(event.target.id);
  setIdSearched(id);
  setshowDetail(true);
}

function handleBackBtn(){
  setshowDetail(false);
  setIdSearched(0);
}

  return (
    <>
      <h1 className="title">Pokedex App</h1>
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
            name={pokemonList[idSearched -1].name}
            image={pokemonList[idSearched -1].image}
            type={pokemonList[idSearched -1].type}
            height={pokemonList[idSearched -1].height}
            weight={pokemonList[idSearched -1].weight}
            move1={pokemonList[idSearched -1].move1}
            move2={pokemonList[idSearched -1].move2}
            move3={pokemonList[idSearched -1].move3}
          />
        </div>
        :
        null 
      }
    </>
  )
}

export default PokedexApp;
