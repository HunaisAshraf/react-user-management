import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { API_URl, validateForm } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast, { Toaster } from "react-hot-toast";
import { ErrorType } from "../../utils/type";

const EditUser = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<ErrorType>();

  const { id } = useParams();

  const admin = useSelector((state: RootState) => state.admin.admin);

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(`${API_URl}admin/user-details/${id}`, {
        headers: {
          Authorization: admin?.token,
        },
      });

      if (data.success) {
        setName(data.user.name);
        setEmail(data.user.email);
        setPhone(data.user.phone);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const validate = validateForm({ name, email, phone });

      if (!validate.notValid) {
        console.log("ksdfkajsdkjfhksd");
        const { data } = await axios.put(
          `${API_URl}admin/edit-user/${id}`,
          {
            name,
            email,
            phone,
          },
          {
            headers: {
              Authorization: admin?.token,
            },
          }
        );

        if (data?.success) {
          navigate("/admin/dashboard");
        } else {
          toast.error(data?.message);
        }
      }

      setErrors(validate.error);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Toaster />
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

        <div className="text-center">
          <button className="bg-gray-800 p-2 rounded text-white font-semibold w-32">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
