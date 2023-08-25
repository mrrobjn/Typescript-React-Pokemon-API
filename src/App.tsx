import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { PokemonCollection } from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}
export interface Detail {
  id: number;
  openDetail: boolean;
}
const App: React.FC = () => {
  const [pokeList, setPokeList] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [Detail, setDetail] = useState<Detail>({ id: 0, openDetail: false });
  const apiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20";
  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get(apiUrl);
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokeList((p) => [...p, poke.data]);
        setLoading(false);
      });
    };
    getPokemons();
  }, []);
  const nextItems = async () => {
    setLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokeList((p) => [...p, poke.data]);
    });
    setLoading(false);
  };
  return (
    <>
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokeList={pokeList}
          setDetail={setDetail}
          Detail={Detail}
        />
        {Detail.openDetail === false && (
          <div className="btn">
            <button onClick={nextItems} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
