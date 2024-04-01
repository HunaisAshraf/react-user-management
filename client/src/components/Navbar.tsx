import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "./Button";
import { logout } from "../redux/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md ">
      <div className="">
        <h1 className="text-3xl font-semibold">AECH</h1>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <Link to="/profile">
              <p>{user?.name}</p>
            </Link>
            <FaUserCircle size={30} />
            <Button onClick={handleLogout}>LogOut</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
