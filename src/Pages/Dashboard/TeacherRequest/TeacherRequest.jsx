import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacherRequest");

      return res.data;
    },
  });

  //   const { data: users = []  } = useQuery({
  //     queryKey: ["users"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get("/users");
  //       return res.data;
  //     },
  //   });

  // console.log(requests);

  const handleApproveStatus = (user) => {
    console.log("update");
    console.log(user._id);
    axiosSecure.patch(`/users/teacher/${user._id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a teacher now`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
    axiosSecure.patch(`/users/madeTeacher/${user.email}`).then((res) => {
      console.log(res.data);
    });
  };

  const handleRejectStatus = (user) => {
    console.log("update");
    console.log(user?.email);
    axiosSecure.patch(`/users/teacherReject/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name}'s request rejected!'`,
          showConfirmButton: true,
          timer: 1000,
        });
      }
    });
    //updating in the main users collection
    axiosSecure.patch(`/users/rejectReq/${user.email}`).then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center my-5">
        Total Request:{requests.length}{" "}
      </h2>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Experience </th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Approve </th>
            <th>Reject </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{item?.name} </td>
              <td>{item?.experience}</td>
              <td>{item?.title}</td>
              <td>{item?.category}</td>
              <td>{item?.status}</td>
              <td>
                <div className="">
                  {(item?.status === "pending") && (
                    <button
                      onClick={() => handleApproveStatus(item)}
                      className="flex"
                    >
                      <FaCheck className="text-2xl text-green-500 mx-2"></FaCheck>
                      approve
                    </button>
                  )}
                </div>
              </td>
              <th>
                {
                    item?.status === 'pending' &&  <button
                  onClick={() => handleRejectStatus(item)}
                  className="btn btn-ghost btn-xs"
                >
                  <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                </button>
                }
               
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TeacherRequest;
