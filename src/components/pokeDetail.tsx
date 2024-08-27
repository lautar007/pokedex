import "../styles/Detail.css";

function capitalizeFirstLetter(string:String) {
    if (!string) return ''; // Maneja el caso de una cadena vacía o null
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

type PokeDetailProps = {
    name: string;
    type: string;
    image: string;
    height: number;
    weight: number;
    move1: string;
    move2: string;
    move3: string;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };

  export default function PokeDetail({
    name,
    type,
    image,
    height,
    weight,
    move1,
    move2,
    move3,
    hp,
    attack,
    defense,
    speed
  }: PokeDetailProps) {
    return(
        <div className={"detCard" + type}>

            <img className="detImage" src={image} alt="imageNotFound"></img>

            <div className="detHeader">
                <h1>{capitalizeFirstLetter(name)}</h1>
                <h2>Type: {type}</h2>
            </div>

            <div className="dataHeight">
                <h3>Height:</h3>
                <h4>{height * 10 + " cm."}</h4>
            </div>

            <div className="dataWeight">
                <h3>Weight:</h3>
                <h4>{(weight * 0.1) + " kg."}</h4>
            </div>
            
            <div className="dataMoves">
                <h3>Moves:</h3>
                <div>
                    <h4>{move1.toUpperCase()}</h4>
                    <h4>{move2.toUpperCase()}</h4>
                    <h4>{move3.toUpperCase()}</h4>
                </div>
            </div>

            <div className="dataStats">
                <h3 className="statTitle">Stats:</h3>
                <div>
                    <div className="stat">
                        <h3>Health: </h3>
                        <h4 style={{ width: hp -2 +"%" }} >{hp}</h4>
                    </div>
                    <div className="stat">
                        <h3>Attack:</h3>
                        <h4 style={{ width: attack -2 +"%" }} >{attack}</h4>
                    </div>
                    <div className="stat">
                        <h3>Defense:</h3>
                        <h4 style={{ width: defense -2 +"%" }} >{defense}</h4>
                    </div>
                    <div className="stat">
                        <h3>Speed:</h3>
                        <h4 style={{ width: speed -2 +"%" }}>{speed}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}