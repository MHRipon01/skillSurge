import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Firebase/AuthProvider";
import Rating from "react-rating";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const EnrolledClassDetails = () => {
  const { user } = useContext(AuthContext);
  // console.log(user?.photoURL);
  //   const [assignments, setAssignments] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const { id } = useParams();
  const [reviewCount, setReviewCount] = useState(0);
  // const enrolledClass = useEnrolledClasses({id})
  const axiosSecure = useAxiosSecure();

  // console.log(enrolledClass);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // Extracts only

  const { data: enrolledClass = [] } = useQuery({
    queryKey: ["enrolledClass", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${id}`);
      return res.data;
    },
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", enrolledClass],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments?className=${enrolledClass[0]?.className}`
      );
      return res.data;
    },
  });

  // console.log(assignments);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const description = form.get("description");
    const formData = {
      className: enrolledClass[0]?.className,
      description: description,
      reviewer: user?.displayName,
      reviewCount: reviewCount,
      reviewerImg: user?.photoURL,
      reviewForClassId: enrolledClass[0]?._id,
    };
    console.log(formData);

    const addReview = await axiosSecure.post("/addReview", formData);
    console.log(addReview.data.reviewResult.insertedId);
    if (addReview.data.reviewResult.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Review Added Successfully",
        icon: "success",
        confirmButtonText: "Okay",
      });
    }
    setShowModal(false);
  };

  const handleSubmitAssignment = (e) => {
    // e.preventDefault();

    const submittedData = {
      className: enrolledClass[0]?.className,

      submitter: user?.displayName,

      submitterImg: user?.photoURL,
      submissionCount: 0,
      date: formattedDate,
    };
    console.log(submittedData);
    const submittedAssignment = axiosSecure.post(
      "/submitAssignment",
      submittedData
    );

    console.log(submittedAssignment);
    submittedAssignment;

    submittedAssignment
      .then((response) => {
        // Check if the response data exists and contains insertedId
        if (response.data && response.data.result.insertedId) {
          const insertedId = response.data.result.insertedId;
          // Now you can use insertedId here or perform any other actions
          console.log("Inserted ID:", insertedId);

          Swal.fire({
            title: "Success!",
            text: "Assignment submitted Successfully",
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((error) => {
        // Handle error case if needed
        console.error("Error submitting assignment:", error);
      });
  };

  return (
    <div>
      <div className="w-full text-center my-6">
        <button
          className="px-4 py-2 rounded bg-gray-50 font-bold text-3xl text-blue-300 hover:bg-[#e1b181] hover:text-[#f5f5f5]"
          onClick={() => setShowModal(true)}
        >
          TER
        </button>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Review </h3>

                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleAddReview}>
                  <div className="pl-4 mx-4">
                    <div className="relative ">
                      <div className="flex flex-col gap-4 ">
                        <div className="relative w-full min-w-[200px]">
                          <label>Description:</label>{" "}
                          <input
                            className="border-black px-1 border-2 rounded "
                            name="description"
                            required
                          />
                        </div>
                      </div>

                      {/* Rating here */}
                      <div className="relative w-full  min-w-[200px]">
                        <label>Rating:</label>{" "}
                        <Rating
                          initialRating={0} // Set initial rating value
                          emptySymbol={
                            <span className="text-gray-300 text-4xl">
                              &#9734;
                            </span>
                          } // Set empty star icon
                          fullSymbol={
                            <span className="text-yellow-400 text-4xl">
                              &#9733;
                            </span>
                          } // Set full star icon
                          onChange={(value) => {
                            // Handle the rating change, you can use this value in your form submission
                            console.log("Selected rating:", value);
                            setReviewCount(value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      type="submit"
                      className="bg-emerald-500  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Create
                    </button>
                    <button
                      className="bg-emerald-500  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div>
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description </th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments?.map((assignment, index) => (
              <tr key={assignment._id}>
                <th>{index + 1}</th>
                <td>{assignment?.title}</td>
                <td>{assignment?.description}</td>
                <td>{assignment?.deadline}</td>

                <td>
                  {" "}
                  <div>
                    <button
                      onClick={() => handleSubmitAssignment(assignment)}
                      className=" bg-sky-300  px-3 py-2 text-xl rounded hover:text-white hover:bg-purple-300"
                    >
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center   flex items-center justify-end my-5   mr-12 ">
        <Stack spacing={1}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
};

export default EnrolledClassDetails;
