import React, { FormEvent, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_URl } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPasword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        return toast.error("password dosen't match");
      }

      const { data } = await axios.post(`${API_URl}user/signup`, {
        name,
        email,
        phone,
        password,
      });

      if (data.success) {
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somethig went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster />
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
  );
};

export default SignUp;
