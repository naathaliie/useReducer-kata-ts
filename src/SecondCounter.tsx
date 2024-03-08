/* /* Counter-komponenten ska ha en p-tagg (eller annan tagg) 
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

import { useReducer, useRef, useState } from "react";

//Alla olika alternativ som jag vill att action skall kunna utföra
const ACTION = {
  ADD: "add",
  REMOVE: "remove",
  CLEAR: "clear",
  RESET: "reset",
  HALFE: "halfe",
  ADD_OWN: "add_own",
};

//Typar upp State och Action för att minimera risken att något skrivs fel eller missas
type State = { count: number };
type Action = { type: string; payload?: number };

//Funktionen från useReducer
/*Gör allt som jag vill att mitt programm skall kunna göra, alla "actions". 
I och med att jag vill kunna utföra olika händelser så använder jag en switch-sats för varje alternativ*/
const countReducer = (state: State, { type, payload = 0 }: Action) => {
  switch (type) {
    case ACTION.ADD:
      return { count: state.count + 1 };
    case ACTION.REMOVE:
      return { count: state.count - 1 };
    case ACTION.RESET:
      return { count: (state.count = 0) };
    case ACTION.HALFE:
      return { count: Math.ceil(state.count / 2) };
    case ACTION.ADD_OWN:
      return { count: state.count + payload };

    //Default = om vi inte går in i något case så vill vi bara returnera state
    default:
      return state;
  }
};

const SecondCounter = () => {
  //Deklarerar useReducer, default värdet för state = 0
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="secounCounterDiv">
      <h3>SecondCounter</h3>
      <div>
        <p className="counterP">{state.count}</p>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTION.ADD, payload: 10 });
          }}
        >
          add
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTION.REMOVE });
          }}
        >
          remove
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTION.RESET });
          }}
        >
          RESET
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTION.HALFE });
          }}
        >
          Halfe
        </button>
      </div>
      <div>
        <label htmlFor="ownNumber">Skriv in en siffra:</label>
        <input
          ref={inputRef}
          type="number"
          id="ownNumber"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch({
              type: ACTION.ADD_OWN,
              payload: Number(inputRef.current?.value),
            });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setInputValue("");
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default SecondCounter;
