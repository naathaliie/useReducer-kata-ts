/* En ny komponent Addition som har två inputfält och en 
knapp samt en p-tagg. När användaren klickar på knappen 
ska siffrorna i fälten adderas och summan visas i p-taggen. 

UTMANING: Se till att komponenten Addition fungerar oavsett 
vad användaren stoppar i textfälten. Töm fälten när man 
klickar på knappen. Sätt fokus tillbaka på första textfältet. 
Se till att taborder är korrekt.*/

import { useReducer, useRef } from "react";

//Typar upp State
type State = {
  count: number;
};

//Typar upp Action
type Action = {
  type: string;
  payload?: number;
};

//Vad vi skall kunna göra för actions
const ACTION = {
  ADDITION: "addition",
};

const additionReducer = (state: State, { type, payload = 0 }: Action) => {
  switch (type) {
    case ACTION.ADDITION:
      return { count: payload };

    default:
      return state;
  }
};

const Addition = () => {
  const [state, dispatch] = useReducer(additionReducer, { count: 0 });
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  /* Vid klick samlas inputRef värdena in och parsas om till datatypen numer.
  Därefter anropas dispatch-funktionen som får parametrarna type och payload (i payload adderas tal 1 och 2) */
  const handleOnClick = () => {
    const value1 = Number(input1Ref.current?.value) || 0;
    const value2 = Number(input2Ref.current?.value) || 0;

    dispatch({
      type: ACTION.ADDITION,
      payload: value1 + value2,
    });
  };

  return (
    <div className="additionDiv">
      <h3>UseRef-Kata 2: Addition</h3>
      <div>
        <input ref={input1Ref} type="text" />
      </div>
      <div>
        <input ref={input2Ref} type="text" />
      </div>
      <div>
        <button onClick={handleOnClick}>Addera talen</button>
      </div>
      <div>
        <p>Adderat tal: {state.count}</p>
      </div>
    </div>
  );
};

export default Addition;
