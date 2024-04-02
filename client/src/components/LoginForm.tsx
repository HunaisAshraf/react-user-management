import { Link } from "react-router-dom";
import Input from "./Input";
import { ReactSetState } from "../utils/type";
import { FormEvent } from "react";

type Form = {
  title: string;
  handleSubmit: (e: FormEvent) => void;
  email: string;
  setEmail: ReactSetState;
  password: string;
  setPassword: ReactSetState;
  signUpPage: boolean;
};

const LoginForm = ({
  title,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  signUpPage,
}: Form) => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form
        className="border-2 border-solid rounded p-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold">{title}</h1>
        <Input
          inputValue={email}
          setInputValue={setEmail}
          type="email"
          placeHolder="Email"
        />
        <Input
          inputValue={password}
          setInputValue={setPassword}
          type="password"
          placeHolder="Password"
        />
        <div className="text-center py-3">
          <button
            type="submit"
            className="bg-blue-700 text-white font-semibold py-2 px-3 rounded"
          >
            Submit
          </button>
        </div>
        {signUpPage && (
          <Link to="/signup">
            <p className="text-center text-blue-700">Create an account</p>
          </Link>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
