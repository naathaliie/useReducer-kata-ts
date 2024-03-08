/* Counter-komponenten ska ha en p-tagg (eller annan tagg) 
för att visa siffran vi räknar upp/ner. Två knappar för att 
räkna upp och ner. All logik i reducer-funktionen och vi 
använder enbart userReducer istf useState.

När du fått Countern att fungera så lägger vi till följande:
En till knapp Reset som nollställer räknaren till 0.
En till knapp Halve som halverar räknarens siffra (avrundat uppåt)
 */

import { useReducer } from "react";

const ACTION = {
  ADD: "add",
  REMOVE: "remove",
};

//store
const countReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION.ADD:
      return { count: state.count + 1 };
    case ACTION.REMOVE:
      return { count: state.count - 1 };

    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  return (
    <div className="counterDiv">
      <h3>Counter</h3>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.ADD });
          }}
        >
          add
        </button>
      </div>
      <div>
        <p>{state?.count}</p>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.REMOVE });
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Counter;
