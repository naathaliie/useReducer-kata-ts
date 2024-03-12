/* Hämta ett API och svisa upp någonting i från det med useEffect(); */

import { useState, useEffect } from "react";

const StarWarsAgain = () => {
  const [swCaracter, setSwCaracter] = useState("");

  useEffect(() => {
    const apiURL = "https://swapi.py4e.com/api/people/";

    const fetchAPI = async () => {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw Error("Failed to load data");
      } else {
        const data = await response.json();
        setSwCaracter(data.results[3].name);
      }
    };

    fetchAPI();

    return () => {};
  }, []);

  return (
    <div className="starWarsAgainDiv">
      <h3>StarWarsAgain</h3>
      <p>info: {swCaracter}</p>
    </div>
  );
};

export default StarWarsAgain;
