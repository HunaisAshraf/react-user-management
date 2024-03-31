import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
