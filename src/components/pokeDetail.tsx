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
  }: PokeDetailProps) {
    return(
        <div className={"detCard" + type}>
            <img className="detImage" src={image} alt="imageNotFound"></img>
            <div className="dataContent">
                <div className="detHeader">
                    <h1>{capitalizeFirstLetter(name)}</h1>
                    <h2>Type: {type}</h2>
                    <h2>Stats:</h2>
                </div>
                <div className={"data" + type}>
                    <div className="dataRow">
                        <h3>Height:</h3>
                        <h4>{height}</h4>
                    </div>
                    <div className="dataRow">
                        <h3>Weight:</h3>
                        <h4>{weight}</h4>
                    </div>
                    <div className="dataRow">
                        <h3>Moves:</h3>
                        <div>
                            <h4>{move1.toUpperCase()}</h4>
                            <h4>{move2.toUpperCase()}</h4>
                            <h4>{move3.toUpperCase()}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}