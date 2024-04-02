import { FormEvent, useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { API_URl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { adminLogin } from "../../redux/adminSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const admin = useSelector((state: RootState) => state.admin.admin);

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

          dispatch(adminLogin(user));
          localStorage.setItem("adminAuth", JSON.stringify(user));
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

  useEffect(() => {
    if (admin?.token) {
      navigate("/admin/dashboard");
    }
  }, []);
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
