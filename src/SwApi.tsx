import { useEffect, useState } from "react";

type StarWarsCharacter = {
  name: string;
  height: number;
  gender: string;
};

const SwApi = () => {
  const [character, setCharacter] = useState({} as StarWarsCharacter);

  useEffect(() => {
    const apiURL = "https://swapi.py4e.com/api/people/";

    const fetchAPI = async () => {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw Error("Failed to load data");
      } else {
        const data = await response.json();

        setCharacter({
          name: data.results[0].name,
          height: data.results[0].height,
          gender: data.results[0].gender,
        });
      }
    };

    fetchAPI();

    return () => {};
  }, []);

  return (
    <div className="swApiDiv">
      <h3>Star wars Api</h3>
      <div>
        {character
          ? `Namn: ${character.name}, Height: ${character.height}, Gender: ${character.gender}`
          : "Laddar..."}
      </div>
    </div>
  );
};

export default SwApi;
