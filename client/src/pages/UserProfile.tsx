import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ChangeEvent, useRef } from "react";
import Button from "../components/Button";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { API_URl } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { updateImg } from "../redux/userSlice";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const img = useSelector((state: RootState) => state.user.userImg);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const id = String(user?.id);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("image", file);

        const { data } = await axios.post(`${API_URl}user/add-img`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${user?.token}`,
          },
        });

        if (data?.success) {
          toast.success(data?.message);
          dispatch(updateImg(data?.image));
          localStorage.setItem("userImg", data?.img);
        } else {
          toast.error("failed to add image");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to add image");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Toaster />
      <div className="border-2 border-solid p-8 rounded">
        <div className="flex justify-between items-start mb-5">
          <h1 className="text-3xl ">User Detail</h1>
          <Button onClick={handleClick}>Edit</Button>
        </div>
        <div>
          <>
            <Button onClick={handleClick} className="rounded-full">
              {img ? (
                <img
                  src={`http://localhost:3000/uploads/${img}`}
                  alt=""
                  className="h-36 w-36 rounded-full"
                />
              ) : (
                <FaUserCircle size={80} className="text-black" />
              )}
            </Button>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleChange}
            />
          </>

          <h1 className="text-2xl my-1">Name : {user?.name}</h1>
          <h1 className="text-xl my-1">Email : {user?.email}</h1>
          <h1 className="text-xl my-1">Phone : {user?.phone}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
