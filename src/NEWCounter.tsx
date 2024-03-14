/* Skapa en Counter-komponent som har två knappar för att räkna upp / ner en räknare. 
Counter-komponenten ska ha en p-tagg (eller annan tagg) för att visa siffran vi räknar 
upp/ner. All logik för att ändra state ska ligga i reducer-funktionen och vi använder 
enbart userReducer istf useState.

Se till att typa upp allt (ifall du använder TS).

När du fått Countern att fungera så lägger vi till följande:

En till knapp Reset som nollställer räknaren till 0.
En knapp Add 10 som lägger till 10
En knapp Remove 10 som tar bort 10
En till knapp Halve som halverar räknarens siffra (avrundat uppåt)
En till knapp Double som dubblerar räknarens siffra (avrundat uppåt) 

***Utmaning***
*Lägg till ett inputfält där man ska kunna skriva en siffra och lägg 
till en knapp Add som lägger till siffran till count. Hint: payload
**Lägg till en knapp Remove som tar bort siffran i inputfältet från vår räknare
***Bygg en robust komponent där vi inte har några röda squiggly lines eller får error.*/

import { useReducer, useRef, useState } from "react";
//Create a type alias for the state
type State = {
  count: number;
};

//Create a type alias for the Action
type Action = {
  type: string;
  payload?: number;
};

//Our actions options
const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  RESET: "reset",
  ADD_TEN: "addTen",
  REMOVE_TEN: "removeTen",
  MINUS_HALF: "minusHalf",
  PLUS_HALF: "plusHalf",
  ADD_PAYLOAD: "addPayload",
};

const counterReducer = (state: State, { type, payload = 0 }: Action) => {
  switch (type) {
    case ACTIONS.ADD:
      return { count: state.count + 1 };

    case ACTIONS.REMOVE:
      return { count: state.count - 1 };

    case ACTIONS.RESET:
      return { count: 0 };

    case ACTIONS.ADD_TEN:
      return { count: state.count + 10 };

    case ACTIONS.REMOVE_TEN:
      return { count: state.count - 10 };

    case ACTIONS.MINUS_HALF:
      return { count: Math.ceil(state.count / 2) };

    case ACTIONS.PLUS_HALF:
      return { count: Math.ceil(state.count * 2) };

    case ACTIONS.ADD_PAYLOAD:
      return { count: state.count + payload };

    default:
      return state;
  }
};

const NEWCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");

  /*****HandleOnClick*****/
  const handleOnClick = () => {
    const numberToAdd = Number(inputRef.current?.value);
    dispatch({ type: ACTIONS.ADD_PAYLOAD, payload: numberToAdd });
  };
  /*****HandleChange*****/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="nEWCounterDiv">
      <h3>NEWCounter</h3>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.ADD });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.REMOVE });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.RESET });
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.ADD_TEN });
          }}
        >
          +10
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.REMOVE_TEN });
          }}
        >
          -10
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.MINUS_HALF });
          }}
        >
          - 1/2
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.PLUS_HALF });
          }}
        >
          x2
        </button>
      </div>
      <div>
        <p>Summan: {state.count}</p>
      </div>
      <div>
        <label htmlFor="inputCount">Skriv in en siffra </label>
        <input
          onChange={handleChange}
          value={inputText}
          ref={inputRef}
          id="inputCount"
          type="number"
        />
        <button onClick={handleOnClick}>Lägg till</button>
        <button
          onClick={() => {
            setInputText("");
            inputRef.current?.focus();
          }}
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default NEWCounter;
