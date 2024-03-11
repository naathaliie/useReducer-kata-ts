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
      const data = await response.json();
      if (!ignore) {
        setCharacter({
          name: data.results[0].name,
          height: data.results[0].height,
          gender: data.results[0].gender,
        });
      }
    };

    let ignore = false;
    fetchAPI();

    return () => {
      ignore = true;
    };
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
