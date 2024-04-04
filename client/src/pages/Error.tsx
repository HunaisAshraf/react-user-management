import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-semibold text-4xl my-4">Page Not Found</h1>
        <Button onClick={() => navigate("/home")}>Go Home</Button>
      </div>
    </div>
  );
};

export default Error;
