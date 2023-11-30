import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Number of items per page

  const axiosSecure = useAxiosSecure();
  // State for holding search term and search results
  const [searchTerm, setSearchTerm] = useState("");

  const [searchedUsers, setSearchedUsers] = useState([]);
  // const { data: searchedUsers = [] } = useQuery({
  //   queryKey: ["searchedUsers", searchTerm],
  //   queryFn: async () => {
  //     if (searchTerm.trim() === "") {
  //       return [];
  //     }
  //     try {
  //       const response = await axiosSecure.get(
  //         `/users/search?searchTerm=${searchTerm}`
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error searching users:", error);
  //       return [];
  //     }
  //   },
  //   enabled: !!searchTerm.trim(), // Query will be enabled only if searchTerm has a non-empty value
  // });

  // useEffect(() => {
  //   if (searchTerm.trim() === "") {
  //     setSearchedUsers([]);
  //     return;
  //   }

  //   const fetchSearchedUsers = async () => {
  //     try {
  //       const response = await axiosSecure.get(
  //         `/users/search?searchTerm=${searchTerm}`
  //       );
  //       console.log(response.data);
  //       setSearchedUsers(response.data);
  //     } catch (error) {
  //       console.error("Error here:", error);
  //       setSearchedUsers([]);
  //     }
  //   };

  //   fetchSearchedUsers();
  // }, [searchTerm, axiosSecure]);

  console.log(searchTerm);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const { data: users = [], refetch } = useQuery({
  //   queryKey: ["users", page], // Include 'page' in the query key
  //   queryFn: async () => {
  //     try {
  //       const response = await axiosSecure.get(
  //         `/users?page=${page}&pageSize=${pageSize}`
  //       );
  //       setPage(response.data.currentPage);
  //       setTotalPages(response.data.totalPages);
  //       return response.data.data;
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       return [];
  //     }
  //   },
  // });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get(
          `/users?page=${page}&pageSize=${pageSize}&search=${searchTerm}`
        );
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setUsers(response.data.data);
        setSearchedUsers(response.data.data)
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, [page, pageSize, axiosSecure, searchTerm]);

  // const { data: users = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/users");
  //     return res.data;
  //   },
  // });

  // console.log(users);
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an admin now`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log(searchedUsers);
  console.log(users);
  //
  // useEffect(() => {
  //   setSearchedUsers(users);
  // }, [setSearchedUsers, users]);

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>

      {/* Search input */}
      <div className="my-4 mx-6">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="border lg:w-[300px] border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* <tbody>
            {searchedUsers.length > 0
              ? searchedUsers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center  gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user?.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-lg bg-purple-200"
                        >
                          <FaUsers className=" text-xl "></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center  gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user?.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-lg bg-purple-200"
                        >
                          <FaUsers className=" text-xl "></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody> */}

          <tbody>
            {searchedUsers?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center  gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-purple-200"
                    >
                      <FaUsers className=" text-xl "></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <div className="text-center   flex items-center justify-end my-5   mr-12 ">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
