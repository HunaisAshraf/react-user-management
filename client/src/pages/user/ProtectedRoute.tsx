import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Element = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Element) => {
  const user = useSelector((store: RootState) => store.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate("/");
    }
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
