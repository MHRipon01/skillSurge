import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
















const AllUsers = () => {



  
  // State for holding search term and search results
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchedUsers = [] } = useQuery({
    queryKey: ["searchedUsers", searchTerm],
    queryFn: async () => {
      if (searchTerm.trim() === "") {
        return [];
      }
      try {
        const response = await axiosSecure.get(`/users/search?searchTerm=${searchTerm}`);
        return response.data;
      } catch (error) {
        console.error("Error searching users:", error);
        return [];
      }
    },
    enabled: !!searchTerm.trim(), // Query will be enabled only if searchTerm has a non-empty value
  });

  // Function to handle input change for search term
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };










  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

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
          <tbody>
  {(searchTerm.trim() !== "" ? searchedUsers : users).map((user, index) => (
    <tr key={user._id}>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center  gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={user?.img} alt="Avatar Tailwind CSS Component" />
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
            className="btn btn-lg bg-orange-400"
          >
            <FaUsers className="text-red-600 text-xl "></FaUsers>
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

        </table>
      </div>
    </div>
  );
};

export default AllUsers;
