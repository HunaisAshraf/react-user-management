import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error.tsx";
import Login from "./pages/user/Login.tsx";
import SignUp from "./pages/user/SignUp.tsx";
import Home from "./pages/user/Home.tsx";
import UserProfile from "./pages/user/UserProfile.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import ProtectedRoute from "./pages/user/ProtectedRoute.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminRoute from "./pages/admin/AdminRoute.tsx";
import EditUser from "./pages/admin/EditUser.tsx";
import Admin from "./pages/admin/Admin.tsx";
import AddUser from "./pages/admin/AddUser.tsx";

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
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element:<Admin />,
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        ),
      },
      {
        path: "add-user",
        element: (
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        ),
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
