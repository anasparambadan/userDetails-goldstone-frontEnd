import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { createUsers, exportCsv, getUsers } from "../api/userRequest";
import { BsFiletypeCsv } from "react-icons/bs";

const UserTable = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const handleEdit = (user) => {
    setUser(user);
    handleModal();
  };
  const handleModal = () => setShowModal((prev) => !prev);

  const userData = async () => {
    try {
      const allUsers = await getUsers();
      if (allUsers.data.length > 0) {
        setUserDetails(allUsers.data);
      } else {
        const users = await axios
          .get("https://gorest.co.in/public-api/users")
          .then((response) => response.data.data);

        const { data } = await createUsers(users);
        setUserDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, [showModal]);
  const exportHandler = async (data) => {
    try {
      const response = await exportCsv(data);
      const csvContent = response.data;
      const filename = "data.csv";
      const dataUrl = URL.createObjectURL(
        new Blob([csvContent], { type: "text/csv" })
      );
      const link = document.createElement("a");
      link.href = dataUrl;
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        {/* <CSVLink {...csvReport}> */}
        <div className=" flex justify-end my-3 font-bold  pr-16">
          <span
            className="bg-blue-400 shadow-md flex space-x-2items-center cursor-pointer rounded-xl p-2 text-white"
            onClick={() => exportHandler(userDetails)}
          >
            <h3>Export</h3> <BsFiletypeCsv size={30} />
          </span>
        </div>
        {/* </CSVLink> */}
        {showModal && <Modal modalStatus={handleModal} editUser={user} />}
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Sr. NO</th>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 font-medium text-gray-900">Email</th>
              <th className="px-6 py-4 font-medium text-gray-900">Gender</th>
              <th className="px-6 py-4 font-medium text-gray-900">Status</th>
              <th className="px-6 py-4 font-medium text-gray-900">Option</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {userDetails.map((item, i) => {
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
