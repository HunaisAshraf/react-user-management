import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { API_URl } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import LoginForm from "../../components/LoginForm";

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

          dispatch(login(user));
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
      <LoginForm
        title="Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        signUpPage={true}
      />
    </>
  );
};

export default Login;
