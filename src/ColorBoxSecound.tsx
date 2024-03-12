/* /* Skapa komponenten ColorBox som innehåller ett textfält, 
en knapp och en div. När användaren klickar på knappen 
ska diven få den färgen som användaren skrivit i textfältet. */

import { useReducer, useRef } from "react";

type Action = {
  type: string;
  payload: string;
};

type State = {
  color: string;
};

const ACTIONS = {
  CHANGE_COLOR: "changeColor",
};

const colorReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTIONS.CHANGE_COLOR:
      return { color: payload };

    default:
      return state;
  }
};

const ColorBoxSecound = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(colorReducer, { color: "white" });
  return (
    <div className="colorBoxSecoundDiv">
      <h3>ColorBoxSecound</h3>
      <div>
        <input ref={inputRef} type="text" />
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({
              type: ACTIONS.CHANGE_COLOR,
              payload: inputRef.current?.value || "",
            });
          }}
        >
          klicka mig
        </button>
      </div>
      <div
        className="theColorDiv"
        style={{ backgroundColor: state.color }}
      ></div>
    </div>
  );
};

export default ColorBoxSecound;
