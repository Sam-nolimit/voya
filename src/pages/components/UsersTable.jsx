import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Table from "../../components/Table/Table";
import { v4 as uuidv4 } from "uuid";

import {
  buildOverviewsTableData,
  usersTableColumn,
  userTableRows,
} from "../data";
import Modal from "../../components/Modal";

function UsersTable() {
  const [term, setTerm] = useState("");
  const [rowsSelected, setRowsSelected] = useState(0);
  const [users, setUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [userArray, setUserArray] = useState(userTableRows);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    fullName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const toggleSelectionType = (selection) => {
  //     setRowsSelected(selection);
  //   };

  const getSelected = useCallback(
    (rows) => {
      const len = rows?.length;
      setRowsSelected(len);
    },
    [rowsSelected]
  );

  const toggleAddUserModal = useCallback(
    () => setOpenAddUserModal(!openAddUserModal),
    [openAddUserModal]
  );

  const toggleEditModal = (data) => {
    setOpenEditModal(!openEditModal);
    setSelectedItem(data);
  };

  const toggleDeleteModal = (data) => {
    setOpenDeleteModal(!openDeleteModal);
    setSelectedItem(data.id);
  };

  console.log({ userArray, selectedItem });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://voyateks.free.beeceptor.com/api/users"
      );

      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("An Error occurred: ", error.message);
    }
  };

  useEffect(() => {
    // fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const { email, fullName, role, password } = formData;

    try {
      const newUser = {
        id: uuidv4(),
        email,
        fullName,
        role,
        password,
      };

      const response = axios.post(
        "https://voyateks.free.beeceptor.com/api/users",
        newUser
      );

      if ((await response).status === 200) {
        alert("New User created successfully");
      }
    } catch (error) {
      console.log("An error occurred", error.message);
    }
  };

  return (
    <div className="mt-4 w-full">
      <div
        className="flex justify-between items-center bg-[#fff] p-3"
        style={{ borderRadius: "10px 10px 0px 0px" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <SearchBar
            term={term}
            setTerm={setTerm}
            placeholder="Search here..."
          />
          <button
            type="button"
            className="px-4 py-2 border-2 border-[#] bg-inherit flex justify-center items-center gap-2 rounded-md text-xs text-[#000]"
            // onClick={() => setOpenFilterModal(!openFilterModal)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.70479 9.33306C5.55788 9.33306 5.43481 9.28328 5.3356 9.18373C5.23605 9.08452 5.18627 8.96146 5.18627 8.81454C5.18627 8.66763 5.23605 8.54457 5.3356 8.44536C5.43481 8.3458 5.55788 8.29602 5.70479 8.29602H6.74183C6.88874 8.29602 7.01197 8.3458 7.11153 8.44536C7.21074 8.54457 7.26034 8.66763 7.26034 8.81454C7.26034 8.96146 7.21074 9.08452 7.11153 9.18373C7.01197 9.28328 6.88874 9.33306 6.74183 9.33306H5.70479ZM2.07516 4.14788C1.92825 4.14788 1.80518 4.09827 1.70597 3.99906C1.60642 3.89951 1.55664 3.77627 1.55664 3.62936C1.55664 3.48244 1.60642 3.35921 1.70597 3.25965C1.80518 3.16044 1.92825 3.11084 2.07516 3.11084H10.3715C10.5184 3.11084 10.6414 3.16044 10.7406 3.25965C10.8402 3.35921 10.89 3.48244 10.89 3.62936C10.89 3.77627 10.8402 3.89951 10.7406 3.99906C10.6414 4.09827 10.5184 4.14788 10.3715 4.14788H2.07516ZM3.63071 6.74047C3.4838 6.74047 3.36057 6.69069 3.26101 6.59114C3.1618 6.49193 3.1122 6.36886 3.1122 6.22195C3.1122 6.07504 3.1618 5.9518 3.26101 5.85225C3.36057 5.75304 3.4838 5.70343 3.63071 5.70343H8.8159C8.96281 5.70343 9.08588 5.75304 9.18508 5.85225C9.28464 5.9518 9.33442 6.07504 9.33442 6.22195C9.33442 6.36886 9.28464 6.49193 9.18508 6.59114C9.08588 6.69069 8.96281 6.74047 8.8159 6.74047H3.63071Z"
                fill="black"
              />
            </svg>
            Filter
          </button>
        </div>

        <button
          type="button"
          onClick={toggleAddUserModal}
          className="px-4 py-2 bg-[#0D6EFD] rounded-md text-white text-sm flex items-center justify-center gap-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 15.9375H9.00007C10.8394 15.9354 12.6027 15.2038 13.9033 13.9033C15.2038 12.6027 15.9354 10.8394 15.9375 9.00007V9C15.9375 7.62789 15.5306 6.2866 14.7683 5.14573C14.006 4.00487 12.9225 3.11567 11.6549 2.59059C10.3872 2.0655 8.99231 1.92812 7.64656 2.1958C6.30082 2.46349 5.06468 3.12422 4.09445 4.09445C3.12422 5.06467 2.46349 6.30082 2.19581 7.64656C1.92812 8.9923 2.06551 10.3872 2.59059 11.6549C3.11567 12.9225 4.00487 14.006 5.14573 14.7683C6.2866 15.5306 7.6279 15.9375 9 15.9375ZM9.625 9.5625H9.5625V9.625V12.125C9.5625 12.2742 9.50324 12.4173 9.39775 12.5227C9.29226 12.6282 9.14919 12.6875 9 12.6875C8.85082 12.6875 8.70775 12.6282 8.60226 12.5227C8.49677 12.4173 8.4375 12.2742 8.4375 12.125V9.625V9.5625H8.375H5.875C5.72582 9.5625 5.58275 9.50324 5.47726 9.39775C5.37177 9.29226 5.3125 9.14918 5.3125 9C5.3125 8.85082 5.37177 8.70774 5.47726 8.60225C5.58275 8.49676 5.72582 8.4375 5.875 8.4375H8.375H8.4375V8.375V5.875C8.4375 5.72582 8.49677 5.58274 8.60226 5.47725C8.70775 5.37176 8.85082 5.3125 9 5.3125C9.14919 5.3125 9.29226 5.37176 9.39775 5.47725C9.50324 5.58274 9.5625 5.72582 9.5625 5.875V8.375V8.4375H9.625H12.125C12.2742 8.4375 12.4173 8.49676 12.5228 8.60225C12.6282 8.70774 12.6875 8.85082 12.6875 9C12.6875 9.14918 12.6282 9.29226 12.5228 9.39775C12.4173 9.50324 12.2742 9.5625 12.125 9.5625H9.625ZM4.52072 2.29628C5.84658 1.41036 7.40537 0.937507 8.99997 0.9375C11.1376 0.939766 13.187 1.78994 14.6985 3.30146C16.2101 4.813 17.0602 6.86243 17.0625 9.00007C17.0625 10.5947 16.5896 12.1534 15.7037 13.4793C14.8178 14.8052 13.5586 15.8385 12.0854 16.4488C10.6122 17.059 8.99106 17.2187 7.42709 16.9076C5.86312 16.5965 4.42652 15.8286 3.29896 14.701C2.17139 13.5735 1.40352 12.1369 1.09242 10.5729C0.781329 9.00894 0.940993 7.38784 1.55122 5.91461C2.16146 4.44139 3.19485 3.1822 4.52072 2.29628Z"
              fill="white"
              stroke="white"
              stroke-width="0.125"
            />
          </svg>
          New User
        </button>
      </div>

      <div className="relative mx-auto h-full w-full">
        <Table
          column={usersTableColumn}
          data={buildOverviewsTableData(userArray)}
          loading={false}
          handleEditAction={toggleEditModal}
          handleDeleteAction={toggleDeleteModal}
          getSelected={getSelected}
        />
      </div>

      <Modal
        close
        onClick={toggleAddUserModal}
        active={openAddUserModal}
        size="md:w-[40rem]"
      >
        <div className="w-full bg-white rounded-md p-7">
          <div className="flex justify-center items-center flex-col gap-3">
            <div className="w-[64px] h-[64px] rounded-full bg-[#D2E4FE] p-3 flex justify-center items-center">
              <svg
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.2978 24.2498C25.584 21.242 22.9079 18.8983 19.7003 17.5961C21.2954 16.3998 22.4737 14.7319 23.0682 12.8287C23.6627 10.9255 23.6433 8.88349 23.0128 6.99193C22.3823 5.10037 21.1726 3.45514 19.555 2.28929C17.9375 1.12345 15.9942 0.496094 14.0003 0.496094C12.0064 0.496094 10.0631 1.12345 8.44555 2.28929C6.82803 3.45514 5.61833 5.10037 4.98781 6.99193C4.35729 8.88349 4.33791 10.9255 4.93242 12.8287C5.52693 14.7319 6.70519 16.3998 8.3003 17.5961C5.0927 18.8983 2.4166 21.242 0.702799 24.2498C0.596606 24.4206 0.525828 24.611 0.494675 24.8096C0.463521 25.0083 0.472627 25.2112 0.521451 25.4062C0.570275 25.6013 0.657821 25.7845 0.778884 25.9451C0.899947 26.1057 1.05206 26.2402 1.22617 26.3408C1.40028 26.4414 1.59284 26.506 1.7924 26.5307C1.99196 26.5553 2.19445 26.5397 2.38782 26.4845C2.5812 26.4294 2.76152 26.3359 2.91806 26.2097C3.0746 26.0835 3.20416 25.9271 3.29905 25.7498C5.56405 21.8348 9.56405 19.4998 14.0003 19.4998C18.4366 19.4998 22.4366 21.8361 24.7015 25.7498C24.9072 26.0805 25.2334 26.3182 25.6111 26.4128C25.9888 26.5073 26.3885 26.4513 26.7257 26.2565C27.0629 26.0617 27.3111 25.7434 27.4178 25.3689C27.5246 24.9945 27.4816 24.5932 27.2978 24.2498ZM7.5003 9.99984C7.5003 8.71426 7.88152 7.45756 8.59575 6.38864C9.30998 5.31972 10.3251 4.4866 11.5129 3.99463C12.7006 3.50266 14.0075 3.37394 15.2684 3.62474C16.5293 3.87554 17.6875 4.49461 18.5965 5.40365C19.5055 6.31269 20.1246 7.47088 20.3754 8.73176C20.6262 9.99263 20.4975 11.2996 20.0055 12.4873C19.5135 13.675 18.6804 14.6902 17.6115 15.4044C16.5426 16.1186 15.2859 16.4998 14.0003 16.4998C12.277 16.4979 10.6249 15.8124 9.4063 14.5938C8.18774 13.3753 7.50228 11.7231 7.5003 9.99984Z"
                  fill="#0D6EFD"
                />
              </svg>
            </div>

            <h3 className="text-[18px] text-[#1D2739] font-semibold">
              New User
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="New User's Email Address"
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="New User's Full Name"
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Role
                </label>

                <select
                  value={formData.role}
                  name="role"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select a role</option>
                  <option value="administrator">Admin</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password for New User"
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-4 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 bg-blue-500"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        close
        onClick={toggleEditModal}
        active={openEditModal}
        size="md:w-[40rem]"
      >
        <div className="w-full bg-white rounded-md p-7">
          <div className="flex justify-center items-center flex-col gap-3">
            <div className="w-[64px] h-[64px] rounded-full bg-[#D2E4FE] p-3 flex justify-center items-center">
              <svg
                width="28"
                height="27"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.2978 24.2498C25.584 21.242 22.9079 18.8983 19.7003 17.5961C21.2954 16.3998 22.4737 14.7319 23.0682 12.8287C23.6627 10.9255 23.6433 8.88349 23.0128 6.99193C22.3823 5.10037 21.1726 3.45514 19.555 2.28929C17.9375 1.12345 15.9942 0.496094 14.0003 0.496094C12.0064 0.496094 10.0631 1.12345 8.44555 2.28929C6.82803 3.45514 5.61833 5.10037 4.98781 6.99193C4.35729 8.88349 4.33791 10.9255 4.93242 12.8287C5.52693 14.7319 6.70519 16.3998 8.3003 17.5961C5.0927 18.8983 2.4166 21.242 0.702799 24.2498C0.596606 24.4206 0.525828 24.611 0.494675 24.8096C0.463521 25.0083 0.472627 25.2112 0.521451 25.4062C0.570275 25.6013 0.657821 25.7845 0.778884 25.9451C0.899947 26.1057 1.05206 26.2402 1.22617 26.3408C1.40028 26.4414 1.59284 26.506 1.7924 26.5307C1.99196 26.5553 2.19445 26.5397 2.38782 26.4845C2.5812 26.4294 2.76152 26.3359 2.91806 26.2097C3.0746 26.0835 3.20416 25.9271 3.29905 25.7498C5.56405 21.8348 9.56405 19.4998 14.0003 19.4998C18.4366 19.4998 22.4366 21.8361 24.7015 25.7498C24.9072 26.0805 25.2334 26.3182 25.6111 26.4128C25.9888 26.5073 26.3885 26.4513 26.7257 26.2565C27.0629 26.0617 27.3111 25.7434 27.4178 25.3689C27.5246 24.9945 27.4816 24.5932 27.2978 24.2498ZM7.5003 9.99984C7.5003 8.71426 7.88152 7.45756 8.59575 6.38864C9.30998 5.31972 10.3251 4.4866 11.5129 3.99463C12.7006 3.50266 14.0075 3.37394 15.2684 3.62474C16.5293 3.87554 17.6875 4.49461 18.5965 5.40365C19.5055 6.31269 20.1246 7.47088 20.3754 8.73176C20.6262 9.99263 20.4975 11.2996 20.0055 12.4873C19.5135 13.675 18.6804 14.6902 17.6115 15.4044C16.5426 16.1186 15.2859 16.4998 14.0003 16.4998C12.277 16.4979 10.6249 15.8124 9.4063 14.5938C8.18774 13.3753 7.50228 11.7231 7.5003 9.99984Z"
                  fill="#0D6EFD"
                />
              </svg>
            </div>

            <h3 className="text-[18px] text-[#1D2739] font-semibold">
              Edit User
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={selectedItem?.email}
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={selectedItem?.fullName}
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Role
                </label>

                <select
                  value={formData.role}
                  name="role"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-500">
                  Create Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password for New User"
                  className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 border-[none] outline-none w-[500px] bg-inherit"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-4 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 bg-blue-500"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        close
        onClick={toggleDeleteModal}
        active={openDeleteModal}
        size="md:w-[30rem]"
      >
        <div className="w-full bg-white p-7 rounded-md ">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-[#1D2739] text-[20px] font-bold">
              Delete User
            </h3>

            <p className="text-[16px] text-[#667185] text-center">
              This user and all associated data will be permanently removed. Do
              you wish to continue
            </p>

            <div className="flex justify-center items-center gap-8">
              <button
                type="button"
                className="px-6 py-3 border-2 border-[#D0D5DD] bg-[#F7F9FC] text-[#475367] text-[14px] rounded-md font-bold"
              >
                Cancel action
              </button>

              <button
                type="button"
                className="px-6 py-3 border-2 border-[#EB9B98] bg-[#FBEAE9] text-[#D42620] text-[14px] rounded-md font-bold flex items-center gap-4"
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6875 2.75V2.8125H11.75H14.875C15.0242 2.8125 15.1673 2.87176 15.2727 2.97725C15.3782 3.08274 15.4375 3.22582 15.4375 3.375C15.4375 3.52418 15.3782 3.66726 15.2727 3.77275C15.1673 3.87824 15.0242 3.9375 14.875 3.9375H14.25H14.1875V4V15.25C14.1875 15.5649 14.0624 15.867 13.8397 16.0897C13.617 16.3124 13.3149 16.4375 13 16.4375H3C2.68506 16.4375 2.38301 16.3124 2.16031 16.0897C1.93761 15.867 1.8125 15.5649 1.8125 15.25V4V3.9375H1.75H1.125C0.975816 3.9375 0.832742 3.87824 0.727253 3.77275C0.621763 3.66726 0.5625 3.52418 0.5625 3.375C0.5625 3.22582 0.621763 3.08274 0.727253 2.97725C0.832742 2.87176 0.975816 2.8125 1.125 2.8125H4.25H4.3125V2.75V2.125C4.3125 1.6443 4.50346 1.18328 4.84337 0.843369C5.18328 0.503459 5.64429 0.3125 6.125 0.3125H9.875C10.3557 0.3125 10.8167 0.503459 11.1566 0.843369C11.4965 1.18328 11.6875 1.6443 11.6875 2.125V2.75ZM10.5 2.8125H10.5625V2.75V2.125C10.5625 1.94266 10.4901 1.7678 10.3611 1.63886C10.2322 1.50993 10.0573 1.4375 9.875 1.4375H6.125C5.94266 1.4375 5.7678 1.50993 5.63886 1.63886C5.50993 1.7678 5.4375 1.94266 5.4375 2.125V2.75V2.8125H5.5H10.5ZM13 15.3125H13.0625V15.25V4V3.9375H13H3H2.9375V4V15.25V15.3125H3H13ZM6.6875 7.125V12.125C6.6875 12.2742 6.62824 12.4173 6.52275 12.5227C6.41726 12.6282 6.27418 12.6875 6.125 12.6875C5.97582 12.6875 5.83274 12.6282 5.72725 12.5227C5.62176 12.4173 5.5625 12.2742 5.5625 12.125V7.125C5.5625 6.97582 5.62176 6.83274 5.72725 6.72725C5.83274 6.62176 5.97582 6.5625 6.125 6.5625C6.27418 6.5625 6.41726 6.62176 6.52275 6.72725C6.62824 6.83274 6.6875 6.97582 6.6875 7.125ZM10.4375 7.125V12.125C10.4375 12.2742 10.3782 12.4173 10.2727 12.5227C10.1673 12.6282 10.0242 12.6875 9.875 12.6875C9.72582 12.6875 9.58274 12.6282 9.47725 12.5227C9.37176 12.4173 9.3125 12.2742 9.3125 12.125V7.125C9.3125 6.97582 9.37176 6.83274 9.47725 6.72725C9.58274 6.62176 9.72582 6.5625 9.875 6.5625C10.0242 6.5625 10.1673 6.62176 10.2727 6.72725C10.3782 6.83274 10.4375 6.97582 10.4375 7.125Z"
                    fill="#D42620"
                    stroke="white"
                    stroke-width="0.125"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UsersTable;
