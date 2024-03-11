/* En ny komponent ChangeText innehåller ett input-fält för text, 
en knapp och en p-tagg. När man klickar på knappen så kopieras 
texten från input till p-taggen 

UTMANING: Ändra "kopiera" till "flytta" dvs inputfältet töms. 
Sätt även fokus tillbaka på inputfältet. Om textfältet är 
tomt ska inte p-taggen ändras.*/

import { useReducer, useRef, useState } from "react";
//typar upp vad state får vara
type State = {
  text: string;
};
//typar upp vad action får vara
type Action = {
  type: string;
  payload?: string;
};
//Vilka actions man skall kunna utföra
const ACTION = {
  CHANGE_TEXT: "change_text",
};

const textReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTION.CHANGE_TEXT:
      return { text: payload };

    default:
      return state;
  }
};

type TheText = {
  text: string;
};

const ChangeText = () => {
  const [state, dispatch] = useReducer(textReducer, { text: "Ändra mig" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWord, setInputWord] = useState("tom");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
  };
  const handleOnClick = () => {
    setInputWord("");
    inputRef.current?.focus();
  };

  return (
    <div className="changeTextDiv">
      <h3>Change Text</h3>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={inputWord}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({
              type: ACTION.CHANGE_TEXT,
              payload: inputRef.current?.value,
            });
            handleOnClick();
          }}
        >
          Klicka mig
        </button>
      </div>
      <div>
        <p>Text: {state.text}</p>
      </div>
    </div>
  );
};

export default ChangeText;
