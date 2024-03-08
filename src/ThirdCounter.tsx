/* Counter-komponenten ska ha en p-tagg (eller annan tagg) 
för att visa siffran vi räknar upp/ner. Två knappar för att 
räkna upp och ner. All logik i reducer-funktionen och vi 
använder enbart userReducer istf useState.

När du fått Countern att fungera så lägger vi till följande:
En till knapp Reset som nollställer räknaren till 0.
En till knapp Halve som halverar räknarens siffra (avrundat uppåt)

Utmaning
Lägg till ett inputfält där man ska kunna skriva en siffra och lägg 
till en knapp Add som lägger till siffran till count. Hint: payload

Lägg till en knapp Remove som tar bort siffran i inputfältet från vår räknare
 */

import { useReducer } from "react";

//Alla actions som skall kunna göras
const ACTION = {
  ADD: "add",
  REMOVE: "remove",
};

//Skapar egna Datatyper av State och Action för att typa upp dem. (En typ skall alltid börja med en versal)
type State = { count: number };
type Action = { type: string; payload?: number };

//Funktionen som kommer att uppdatera count beroende på action
const countReducer = (state: State, { type, payload = 0 }: Action) => {
  switch (type) {
    case ACTION.ADD:
      return { count: state.count + 1 };
    case ACTION.REMOVE:
      return { count: state.count - 1 };

    default:
      state;
  }
};

const ThirdCounter = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  return (
    <div className="thirdCounterDiv">
      <h3>ThirdCounter</h3>
      <div>
        <p>{state.count}</p>
        <button
          onClick={() => {
            dispatch({ type: ACTION.ADD });
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTION.REMOVE });
          }}
        >
          -1
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default ThirdCounter;
