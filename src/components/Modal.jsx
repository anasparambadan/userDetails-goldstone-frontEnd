import React, { useState } from "react";
import { editUser } from "../api/userRequest";

const Modal = (props) => {
  const [user, setUser] = useState(props.editUser);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(user);
    props.modalStatus()
  };
  return (
    <div>
      <div
        className="relative z-40 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-blue-200 px-4 pb-4 pt-5 sm:p-6 max-h-fit sm:pb-4 ">
                <div className="w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Edit User Details
                    </h3>
                    <div className="mt-2 flex flex-col  gap-2 ">
                      <label htmlFor="name" className="ml-2">
                        Name :
                        <input
                          type="text"
                          onChange={handleChange}
                          value={user.name}
                          name="name"
                          className="border-b-orange-500 rounded-md p-2 mx-2 w-full "
                        />
                      </label>
                      <label htmlFor="email" className="ml-2">
                        Email :
                        <input
                          type="text"
                          onChange={handleChange}
                          value={user.email}
                          name="email"
                          className="border-b-orange-500 rounded-md p-2 mx-2 w-full "
                        />
                      </label>
                      <label htmlFor="gender" className="ml-2">
                        Gender :
                        <select
                          name="gender"
                          value={user.gender}
                          onChange={handleChange}
                          className="border-b-orange-500 rounded-md p-2 mx-2 w-full"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </label>
                      <label htmlFor="status" className="ml-2">
                        status :
                        <select
                          name="status"
                          value={user.status}
                          onChange={handleChange}
                          className="border-b-orange-500 rounded-md p-2 mx-2 w-full "
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleSubmit}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={props.modalStatus}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
