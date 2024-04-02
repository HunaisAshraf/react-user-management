import { FormEvent, useEffect, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_URl, validateForm } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { type ErrorType } from "../../utils/type";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPasword] = useState<string>("");
  const [errors, setError] = useState<ErrorType>();

  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const validate = validateForm({
        name,
        email,
        phone,
        password,
        confirmPassword,
      });

      if (!validate.notValid) {
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
      }

      setError(validate.error);
    } catch (error) {
      console.log(error);
      toast.error("somethig went wrong");
    }
  };

  useEffect(() => {
    if (user?.token) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Toaster />
      <form
        className="border-2 border-solid rounded py-3 px-6 w-[40%]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold">Signup</h1>
        <Input
          type="text"
          inputValue={name}
          setInputValue={setName}
          placeHolder="Name"
        />
        {errors?.name && <span className="text-red-600">{errors?.name}</span>}
        <Input
          type="email"
          inputValue={email}
          setInputValue={setEmail}
          placeHolder="Email"
        />
        {errors?.email && <span className="text-red-600">{errors?.email}</span>}
        <Input
          type="number"
          inputValue={phone}
          setInputValue={setPhone}
          placeHolder="Phone"
        />
        {errors?.phone && <span className="text-red-600">{errors?.phone}</span>}
        <Input
          type="password"
          inputValue={password}
          setInputValue={setPassword}
          placeHolder="Password"
        />
        {errors?.password && (
          <span className="text-red-600">{errors?.password}</span>
        )}
        <Input
          type="password"
          inputValue={confirmPassword}
          setInputValue={setConfirmPasword}
          placeHolder="Confirm Password"
        />
        {errors?.confirmPassword && (
          <span className="text-red-600">{errors?.confirmPassword}</span>
        )}
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
