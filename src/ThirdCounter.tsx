/* Skapa en Counter-komponent som har två knappar för att 
räkna upp / ner en räknare. Counter-komponenten ska ha en 
p-tagg (eller annan tagg) för att visa siffran vi räknar upp/ner. 
All logik för att ändra state ska ligga i reducer-funktionen 
och vi använder enbart userReducer istf useState.

Se till att typa upp allt (ifall du använder TS).

När du fått Countern att fungera så lägger vi till följande:

En till knapp Reset som nollställer räknaren till 0.
En knapp Add 10 som lägger till 10
En knapp Remove 10 som tar bort 10
En till knapp Halve som halverar räknarens siffra (avrundat uppåt)
En till knapp Double som dubblerar räknarens siffra (avrundat uppåt) */

import { useReducer } from "react";

type State = {
  count: number;
};
type Action = {
  type: string;
  payload: number;
};

const ACTION = {
  ADD: "add",
  REMOVE: "remove",
  RESET: "reset",
};

const countReducer = (state: State, { type, payload = 0 }: Action) => {
  switch (type) {
    case ACTION.ADD:
      return { count: state.count + 1 };
    case ACTION.REMOVE:
      return { count: state.count - 1 };
    case ACTION.RESET:
      return { count: 0 };

    default:
      return state;
  }
};

const ThirdCounter = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  return (
    <div className="thirdCounterDiv">
      <h3>ThirdCounter</h3>

      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.ADD, payload: 0 });
          }}
        >
          +
        </button>
      </div>
      <div>
        <p>
          Ändra mig: <span className="spanText">{state.count}</span>
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.REMOVE, payload: 0 });
          }}
        >
          -
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.RESET, payload: 0 });
          }}
        >
          Nollställ
        </button>
      </div>
    </div>
  );
};

export default ThirdCounter;
