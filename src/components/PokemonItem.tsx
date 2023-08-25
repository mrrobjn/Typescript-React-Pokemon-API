import React from "react";
import { Detail } from "../App";
import { PokemonDetail } from "../interface";

interface Props {
  Detail: Detail;
  setDetail: React.Dispatch<React.SetStateAction<Detail>>;
  id: number;
  name: string;
  image: string;
  abilities:
    | {
        ability: string;
        name: string;
      }[]
    | undefined;
  pokeList: PokemonDetail[];
}
export const PokemonItem: React.FC<Props> = (props) => {
  const { id, name, image, Detail, setDetail, pokeList } = props;
  const openDetail = (id: number) => {
    setDetail({ id: id, openDetail: true });
  };
  const closeDetail = () => {
    setDetail({ id: 0, openDetail: false });
  };
  const pokeDetail = pokeList.find((poke) => poke.id === Detail.id);
  return (
    <div>
      {Detail.openDetail ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img
                src={pokeDetail?.sprites.front_default}
                className="detail-img"
              />
              <p className="detail-name">{pokeDetail?.name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">
                Abilities:{" "}
                {pokeDetail?.abilities?.map((ab: any) => ab.ability.name)}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div onClick={() => openDetail(id)}>
          <section className="pokemon-list-container">
            <p className="pokemon-name">{name}</p>
            <img src={image} alt="pokemon"></img>
          </section>
        </div>
      )}
    </div>
  );
};
