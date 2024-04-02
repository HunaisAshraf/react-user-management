import { FormEvent, useState } from "react";
import axios from "axios";
import { API_URl, validateForm } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import { ErrorType } from "../../utils/type";

const AddUser = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorType>();

  const admin = useSelector((state: RootState) => state.admin.admin);

  const navigate = useNavigate();

  // const validateForm = () => {
  //   let error: ErrorType = { name: "", email: "", phone: "", password: "" };
  //   let containError = false;

  //   if (!/^([a-zA-Z ]){2,30}$/.test(name)) {
  //     error.name = "invalid format";
  //     containError = true;
  //   }
  //   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  //     error.email = "invalid email";
  //     containError = true;
  //   }
  //   if (/^\d{10}$/.test(phone)) {
  //     error.phone = "Invalid phone number";
  //     containError = true;
  //   }
  //   if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/.test(password)
  //   ) {
  //     error.password =
  //       "password should contail uppercase, lowercase, number and special characters";
  //     containError = true;
  //   }

  //   setErrors(error);
  //   return containError;
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let validate = validateForm({
      name,
      email,
      phone,
      password,
    });

    if (!validate.notValid) {
      axios
        .post(
          `${API_URl}admin/add-user`,
          {
            name,
            email,
            phone,
            password,
          },
          {
            headers: {
              Authorization: admin?.token,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            navigate("/admin/dashboard");
          } else {
            toast.error(response.data.message);
          }
        });
    }
    setErrors(validate.error);
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form
        className="border-2 border-solid p-6 rounded-md md:w-[40%]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-center">Add User</h1>
        </div>

        <Input
          inputValue={name}
          setInputValue={setName}
          placeHolder="Name"
          type="text"
        />
        {errors?.name && <span className="text-red-600">{errors?.name}</span>}
        <Input
          inputValue={email}
          setInputValue={setEmail}
          placeHolder="Email"
          type="email"
        />
        {errors?.email && <span className="text-red-600">{errors?.email}</span>}
        <Input
          inputValue={phone}
          setInputValue={setPhone}
          placeHolder="Phone"
          type="number"
        />
        {errors?.phone && <span className="text-red-600">{errors?.phone}</span>}
        <Input
          inputValue={password}
          setInputValue={setPassword}
          placeHolder="Password"
          type="password"
        />
        {errors?.password && (
          <span className="text-red-600">{errors?.password}</span>
        )}
        <div className="text-center">
          <button className="bg-gray-800 p-2 rounded text-white font-semibold w-32">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
