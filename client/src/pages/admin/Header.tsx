import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/adminSlice";
import { RootState } from "../../redux/store";

const Header = () => {
  const user = useSelector((state: RootState) => state.admin.admin);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(adminLogout());
  };
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md ">
      <div className="">
        <Link to="/admin/dashboard" className="text-3xl font-semibold">
          ADMIN
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <p>{user?.name}</p>
            {user?.img ? (
              <img
                src={`http://localhost:3000/uploads/${user?.img}`}
                alt="user-img"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <FaUserCircle size={30} />
            )}
            <Button className="bg-gray-800" onClick={handleLogout}>
              LogOut
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
