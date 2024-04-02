/* Skapa en Counter-komponent som har två knappar för att räkna upp / ner en räknare. 
Counter-komponenten ska ha en p-tagg (eller annan tagg) för att visa siffran vi räknar 
upp/ner. All logik för att ändra state ska ligga i reducer-funktionen och vi använder
 enbart userReducer istf useState.

En till knapp Reset som nollställer räknaren till 0.
En knapp Add 10 som lägger till 10
En knapp Remove 10 som tar bort 10
En till knapp Halve som halverar räknarens siffra (avrundat uppåt)
En till knapp Double som dubblerar räknarens siffra (avrundat uppåt)
Utmaning
Lägg till ett inputfält där man ska kunna skriva en siffra och lägg till en knapp Add som lägger till siffran till count. Hint: payload
Lägg till en knapp Remove som tar bort siffran i inputfältet från vår räknare
Bygg en robust komponent där vi inte har några röda squiggly lines eller får error.
Bakgrundsfärg
Lägg till så att bakgrundsfärgern ändras utifrån följande:

När siffran är negativ så ska bakgrundsfärgen vara orange
När siffran är positiv så ljusgrön
När siffran är udda så ljusblå
När siffran är jämn så rosa
Primtal ger lila
Kom ihåg att om bakgrundsfärgen är mörk behöver textfärgen vara ljus. */

import { useReducer, useState } from "react";
/* Gör en egen typ för State så att den är statisk och endast kan innehålla count som är ett nummer */
type State = {
  count: number;
};

/* Gör en egen typ för Action men i detta fallet använder jag en unionType, vilket innebär att Action kan vara antingen det ena eller det andra*/
type Action =
  | { type: typeof ACTION.REMOVE; payload: 0 }
  | {
      type: typeof ACTION.ADD;
      payload: number;
    }
  | {
      type: typeof ACTION.CLEAR;
      payload: 0;
    };

//Skapar upp alla olika val jag vill kunna använda som action i switch-satsen
const ACTION = {
  ADD: "add",
  REMOVE: "remove",
  CLEAR: "clear",
};

/* När jag kallar på dispatch (som är counterReducer-funktionen) skall följande ske.
En reducer tar alltid emot två properties, state (det nuvarande statet) samt en action (vad som skall hända) */
const counterReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION.ADD:
      return { count: state.count + action.payload };

    case ACTION.REMOVE:
      return { count: state.count - 1 };

    case ACTION.CLEAR:
      return { count: 0 };

    default:
      return state;
  }
};

const EnTillCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const [inputValue, setinputValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(Number(e.target.value));
  };

  const handleOnClick = () => {
    if (inputValue !== 0) {
      dispatch({ type: ACTION.ADD, payload: inputValue });
      setinputValue(0);
    } else {
      return alert("Ajjabajja");
    }
  };

  return (
    <div className="en_till_counter_box">
      <h3>EnTillCounter</h3>
      <button
        onClick={() => {
          dispatch({ type: ACTION.ADD, payload: 1 });
        }}
      >
        +
      </button>

      <button
        onClick={() => {
          dispatch({ type: ACTION.REMOVE, payload: 0 });
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTION.ADD, payload: 10 });
        }}
      >
        +10
      </button>
      <p>Summan är: {state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: ACTION.CLEAR, payload: 0 });
        }}
      >
        Nollställ
      </button>
      <label htmlFor="counter_input">Addera en siffra till summan: </label>
      <input
        id="counter_input"
        type="number"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleOnClick}>Lägg till</button>
    </div>
  );
};

export default EnTillCounter;
