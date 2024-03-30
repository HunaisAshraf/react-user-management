import React, { useState } from "react";
import Input from "../components/Input";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="border-2 border-solid rounded py-3 px-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold">Signup</h1>
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
  );
};

export default SignUp;
