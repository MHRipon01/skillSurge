import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaAudioDescription,
  FaCheck,
  FaGofore,
  FaTrashAlt,
} from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Firebase/AuthProvider";
const AllReqClass = () => {
  const axiosSecure = useAxiosSecure();



const {user} = useContext(AuthContext)
  const { data: pendingClasses = [], refetch } = useQuery({
    queryKey: ["pendingClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pendingClasses");
      return res.data;
    },
  });
  console.log(pendingClasses);

  const handleApproveClass =async (reqClass) => {
    console.log("update");
    console.log(reqClass);
    axiosSecure.patch(`/approveClass/${reqClass._id}`).then((res) => {
      // console.log(res.data);
      console.log(reqClass);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${reqClass.title} is a accepted`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
    const addClassForm = {
      Teacher: reqClass.name,
      classId: reqClass._id,
      className: reqClass?.title,
      teacherImg: user?.photoURL,
      Title: reqClass.title,
      Price: reqClass.price,
      ShortDescription: reqClass.description,
      status: "pending",
      Image: reqClass.image,
      email: user?.email,
      TotalEnrollment: 0
    };
    //
    const addedClass = await axiosSecure.post("/addClassToAllClasses", addClassForm);
    console.log(addedClass);
    
  };

  const handleRejectClass = (reqClass) => {
    console.log("update");

    console.log(reqClass);
    axiosSecure.patch(`/pendingClasses/${reqClass._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${reqClass.name} is rejected!'`,
          showConfirmButton: true,
          timer: 1000,
        });
      }
    });
  };



//  const { data: getDataForReview = [] } = useQuery({
//     queryKey: ["getDataForReview"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/getDataForReview/:${id}`);
//       return res.data;
//     },
//   });

// console.log(getDataForReview);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-center my-5">
          Total Request:{pendingClasses.length}{" "}
        </h2>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Email</th>
              <th>Description </th>
              <th>Title</th>
              <th>Status</th>
              <th>See Progress</th>
              <th>Approve </th>
              <th>Reject </th>
            </tr>
          </thead>
          <tbody>
            {pendingClasses.map((item, index) => (
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
                <td>{item?.email} </td>
                <td>{item?.description}</td>
                <td>{item?.title}</td>
                <td>{item?.status}</td>

                <td>

                  {item?.status === "accepted" && (
                    <Link to={`/dashboard/class/${item?._id}`}>
                      <button className="text-2xl text-sky-300">
                      <GiProgression />
                    </button>
                    </Link>
                  
                  )}
                </td>
                <td>
                  <div className="">
                    {item?.status === "pending" && (
                      <button
                        onClick={() => handleApproveClass(item)}
                        className="flex"
                      >
                        <FaCheck className="text-2xl text-green-500 mx-2"></FaCheck>
                      </button>
                    )}
                  </div>
                </td>
                <th>
                  {item?.status === "pending" && (
                    <button
                      onClick={() => handleRejectClass(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red-600 text-xl"></FaTrashAlt>
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReqClass;
