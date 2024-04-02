import { ReactSetState } from "../utils/type";

type Input = {
  type: "text" | "email" | "number" | "password";
  inputValue: string;
  setInputValue: ReactSetState | (() => void);
  placeHolder: string;
};

const Input = ({ type, inputValue, setInputValue, placeHolder }: Input) => {
  return (
    <div className="my-2 w-full">
      <input
        className="border-2 border-solid p-2 outline-none rounded w-full"
        type={type}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeHolder}
        required
      />
    </div>
  );
};

export default Input;
