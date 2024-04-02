import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { API_URl } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${API_URl}user/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        if (data.success) {
          let user = {
            ...data.user,
            token: data?.token,
          };

          dispatch(updateUser(user));
          localStorage.setItem("auth", JSON.stringify(user));
          navigate("/home");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user?.token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className="min-h-[80vh] flex justify-center items-center">
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

          <Link to="/signup">
            <p className="text-center text-blue-700">Create an account</p>
          </Link>
        </form>
      </div>

      {/* <LoginForm
        title="Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        signUpPage={true}
      /> */}
    </>
  );
};

export default Login;
