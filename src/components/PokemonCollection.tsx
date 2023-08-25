import { PokemonItem } from "./PokemonItem";
import { PokemonDetail } from "../interface";
import "./Pokemon.css";
import { Detail } from "../App";
interface Props {
  Detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  pokeList: PokemonDetail[];
}
export const PokemonCollection: React.FC<Props> = (props) => {
  const { pokeList, setDetail, Detail } = props;
  return (
    <div>
      <section className="collection-container">
        {pokeList.map((poke, i) => {
          return (
            <PokemonItem
              pokeList={pokeList}
              setDetail={setDetail}
              Detail={Detail}
              key={i}
              id={poke.id}
              abilities={poke.abilities}
              name={poke.name}
              image={poke.sprites.front_default}
            />
          );
        })}
      </section>
    </div>
  );
};
