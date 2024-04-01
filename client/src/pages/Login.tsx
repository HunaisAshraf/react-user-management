import { FormEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { API_URl } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { RootState } from "../redux/store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      let { data } = await axios.post(`${API_URl}user/login`, {
        email,
        password,
      });
      if (data.success) {
        let user = {
          ...data.user,
          token: data?.token,
        };

          console.log(user)
        dispatch(login(user));
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster />
      <form
        className="border-2 border-solid rounded p-3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold">Login</h1>
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
      </form>
    </div>
  );
};

export default Login;
