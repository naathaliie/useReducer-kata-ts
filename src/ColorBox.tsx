/* Skapa komponenten ColorBox som innehåller ett textfält, 
en knapp och en div. När användaren klickar på knappen 
ska diven få den färgen som användaren skrivit i textfältet. */

import { useReducer, useRef } from "react";
type State = {
  color: string;
};

type Action = {
  type: string;
  payload: string;
};

const ACTION = {
  CHANGE_COLOR: "changeColor",
};
const colorReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTION.CHANGE_COLOR:
      return { color: payload };

    default:
      return state;
  }
};

const ColorBox = () => {
  const [state, dispatch] = useReducer(colorReducer, { color: "white" });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = () => {
    let color = String(inputRef.current?.value);

    dispatch({
      type: ACTION.CHANGE_COLOR,
      payload: color,
    });
  };

  return (
    <div className="colorBoxDiv">
      <h3>ColorBox</h3>
      <div>
        <input ref={inputRef} type="text" />
      </div>
      <div>
        <button onClick={handleOnChange}>klicka mig</button>
      </div>
      <div
        className="theColorBox"
        style={{ backgroundColor: state.color }}
      ></div>
    </div>
  );
};

export default ColorBox;
