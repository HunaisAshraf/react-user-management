import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { API_URl } from "../utils/constants";
import { useEffect } from "react";
import { updateImg } from "../redux/userSlice";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userImg = useSelector((state: RootState) => state.user.userImg);

  const dispatch = useDispatch();

  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(`${API_URl}user/get-img`, {
        headers: {
          Authorization: `${user?.token}`,
        },
      });
      if (data.success) {
        dispatch(updateImg(data?.image));
        localStorage.setItem("userImg", data?.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return <div>Home</div>;
};

export default Home;
