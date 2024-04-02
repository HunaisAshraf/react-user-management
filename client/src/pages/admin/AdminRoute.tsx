import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

type Element = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Element) => {
  const admin = useSelector((state: RootState) => state.admin.admin);

  const navigate = useNavigate();

  useEffect(() => {
    if (!admin?.token) {
      navigate("/admin/login");
    }
  }, [admin]);

  return <>{children}</>;
};

export default AdminRoute;
