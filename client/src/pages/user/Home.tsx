import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <h1 className="font-semibold text-5xl">
        Welcome <span className="text-blue-600">{user?.name}</span>
      </h1>
    </div>
  );
};

export default Home;
