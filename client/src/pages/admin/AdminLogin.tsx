import { FormEvent, useState } from "react";
import LoginForm from "../../components/LoginForm";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URl } from "../../utils/constants";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_URl}admin/login`, {
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
          navigate("/admin/dashboard");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <Toaster />
      <LoginForm
        title="Admin Login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        signUpPage={false}
      />
    </>
  );
};

export default AdminLogin;
