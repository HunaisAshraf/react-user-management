import { Toaster } from "react-hot-toast";
import Input from "./Input";
import { ReactSetState } from "../utils/type";
import { FormEvent } from "react";

type Form = {
  name: string;
  setName: ReactSetState;
  phone: string;
  setPhone: ReactSetState;
  email: string;
  setEmail: ReactSetState;
  password: string;
  setPassword: ReactSetState;
  confirmPassword?: string ;
  setConfirmPasword?: ReactSetState;
  handleSubmit: (e: FormEvent) => void;
  title: string;
};

const UserForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPasword,
  handleSubmit,
  title,
}: Form) => {
  return (
    <div>
      <div className="min-h-[80vh] flex justify-center items-center">
        <Toaster />
        <form
          className="border-2 border-solid rounded py-3 px-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-3xl font-bold">{title}</h1>
          <Input
            type="text"
            inputValue={name}
            setInputValue={setName}
            placeHolder="Name"
          />
          <Input
            type="email"
            inputValue={email}
            setInputValue={setEmail}
            placeHolder="Email"
          />
          <Input
            type="number"
            inputValue={phone}
            setInputValue={setPhone}
            placeHolder="Phone"
          />
          <Input
            type="password"
            inputValue={password}
            setInputValue={setPassword}
            placeHolder="Password"
          />

          <Input
            type="password"
            inputValue={confirmPassword}
            setInputValue={setConfirmPasword}
            placeHolder="Confirm Password"
          />

          <div className="text-center py-3">
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-2 px-3 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
