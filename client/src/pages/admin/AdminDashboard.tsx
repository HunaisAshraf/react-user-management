import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_URl } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  const admin = useSelector((state: RootState) => state.admin.admin);

  const navigate = useNavigate();

  const getAllUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URl}admin/get-users`, {
        headers: {
          Authorization: `${admin?.token}`,
        },
      });
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { data } = await axios.delete(`${API_URl}admin/delete-user/${id}`, {
        headers: {
          Authorization: `${admin?.token}`,
        },
      });

      if (data?.success) {
        getAllUser();
        toast.success(data?.message);
      } else {
        toast.error("failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center mt-12">
        <div className="relative overflow-x-auto w-[80%]">
          <div className="flex justify-between items-center my-4">
            <h1 className="text-3xl ">Users List</h1>
            <button
              onClick={() => navigate("/admin/add-user")}
              className="p-2 bg-gray-800 text-white font-semibold rounded"
            >
              Add User
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user?.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{user?.name}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">{user?.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-gray-400  p-2 text-white rounded me-3"
                      onClick={() => navigate(`/admin/edit-user/${user?.id}`)}
                    >
                      <MdEdit size={25} />
                    </button>
                    <button
                      className="bg-gray-600 p-2 text-white rounded "
                      onClick={() => handleDelete(user?.id)}
                    >
                      <FaTrashAlt size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
