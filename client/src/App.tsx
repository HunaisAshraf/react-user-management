import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

// type Element = {
//   children: JSX.Element;
// };

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
