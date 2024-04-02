import { FormEvent, useState } from "react";
import axios from "axios";
import { API_URl } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";

const AddUser = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const admin = useSelector((state: RootState) => state.admin.admin);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
        <Input
          inputValue={email}
          setInputValue={setEmail}
          placeHolder="Email"
          type="email"
        />
        <Input
          inputValue={phone}
          setInputValue={setPhone}
          placeHolder="Phone"
          type="number"
        />
        <Input
          inputValue={password}
          setInputValue={setPassword}
          placeHolder="Password"
          type="password"
        />
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
