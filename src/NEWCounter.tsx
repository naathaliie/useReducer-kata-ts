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
***Bygg en robust komponent där vi inte har några röda squiggly lines eller får error.

***EXTRA UTMANING***
Bakgrundsfärg
Lägg till så att bakgrundsfärgern ändras utifrån följande:

När siffran är negativ så ska bakgrundsfärgen vara orange
När siffran är positiv så ljusgrön
När siffran är udda så ljusblå
När siffran är jämn så rosa
Primtal ger lila
Kom ihåg att om bakgrundsfärgen är mörk behöver textfärgen vara ljus.*/

import { useEffect, useReducer, useRef, useState } from "react";
import isPrim from "./functions/isPrim";

//Create a type alias for the state
type State = {
  count: number;
};

//Create a type alias for the Action
type Action = {
  type: string;
  payload: number;
};

//Our actions options
const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  RESET: "reset",
  MINUS_HALF: "minusHalf",
  PLUS_HALF: "plusHalf",
};

const counterReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTIONS.ADD:
      return { count: state.count + payload };

    case ACTIONS.REMOVE:
      return { count: state.count - payload };

    case ACTIONS.RESET:
      return { count: 0 };

    case ACTIONS.MINUS_HALF:
      return { count: Math.ceil(state.count / 2) }; // In this case you could also have used Math.round()

    case ACTIONS.PLUS_HALF:
      return { count: Math.ceil(state.count * 2) };

    default:
      return state;
  }
};

const NEWCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");

  //Backgrundsfärg skall baseras på state
  useEffect(() => {
    switch (true) {
      case isPrim(state.count):
        return setBackgroundColor("purple");
      case state.count < 0:
        return setBackgroundColor("orange");
      case state.count > 0:
        return setBackgroundColor("lightgreen");
      //odd
      case state.count % 2 !== 0:
        return setBackgroundColor("lightblue");
      //even
      case state.count % 2 === 0:
        return setBackgroundColor("pink");
      //isPrim is a function created elsewhere

      default:
        break;
    }

    let ignore = false;
    return () => {
      ignore = true;
    };
  }, [state]);

  /*****HandleOnClick*****/
  const handleOnClick = () => {
    const numberToAdd = Number(inputRef.current?.value);
    dispatch({ type: ACTIONS.ADD, payload: numberToAdd });
  };
  /*****HandleChange*****/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div className="nEWCounterDiv" style={{ backgroundColor: backgroundColor }}>
      <h3>NEWCounter</h3>
      <div>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.ADD, payload: 1 });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.REMOVE, payload: 1 });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.RESET, payload: 0 });
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.ADD, payload: 10 });
          }}
        >
          +10
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.REMOVE, payload: 10 });
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
      <section className="colorInfoSect">
        <ul>
          <li className="whiteLi">Default värde</li>
          <li className="orangeLi">Negativt tal</li>
          <li className="lightGreenLi">Positivt tal</li>
          <li className="lightBlueLi">Udda tal</li>
          <li className="pinkLi">Jämt tal</li>
          <li className="purpleLi">Primtal</li>
        </ul>
      </section>
    </div>
  );
};

export default NEWCounter;
