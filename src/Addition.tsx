/* En ny komponent Addition som har två inputfält och en 
knapp samt en p-tagg. När användaren klickar på knappen 
ska siffrorna i fälten adderas och summan visas i p-taggen */

import { useReducer, useRef } from "react";

//Typar upp State
type State = {
  count: number;
};

//Typar upp Atate
type Action = {
  type: string;
  payload?: number;
};

//Vad vi skall kunna göra för actions
const ACTION = {
  ADDITION: "addition",
};

const additionReducer = (state: State, { type, payload }: Action) => {
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

  const handleOnClick = () => {
    const value1 = Number(input1Ref.current?.value);
    const value2 = Number(input2Ref.current?.value);

    dispatch({
      type: ACTION.ADDITION,
      payload: value1 + value2,
    });
  };

  return (
    <div className="additionDiv">
      <h3>Addition</h3>
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
