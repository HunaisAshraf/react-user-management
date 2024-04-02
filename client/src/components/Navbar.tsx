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
        <Link to="/home" className="text-3xl font-semibold">
          AECH
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <Link to="/profile">
              <p>{user?.name}</p>
            </Link>
            <Link to="/profile">
              {user?.img ? (
                <img
                  src={`http://localhost:3000/uploads/${user?.img}`}
                  alt="user-img"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <FaUserCircle size={30} />
              )}
            </Link>
            <Button onClick={handleLogout}>LogOut</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
