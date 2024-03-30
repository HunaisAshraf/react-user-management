import React from "react";
import { ReactSetState } from "../utils/type";

type Input = {
  type: "text" | "email" | "number" | "password";
  inputValue: string;
  setInputValue: ReactSetState;
  placeHolder: string;
};

const Input = ({ type, inputValue, setInputValue, placeHolder }: Input) => {
  return (
    <div className="my-2">
      <input
        className="border-2 border-solid p-2 outline-none rounded"
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default Input;
