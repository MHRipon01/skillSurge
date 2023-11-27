import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Firebase/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyClassDetails = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: classForAssignment = [], refetch } = useQuery({
    queryKey: ["myPendingClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myClassForAssignment/${id}`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(classForAssignment.title);

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const Title = form.get("title");
    const description = form.get("description");
    const deadline = form.get("deadline");
    console.log(Title, deadline, description);
    const formData = {
      title: Title,

      deadline: deadline,
      className: classForAssignment?.title,
      description: description,
      teacher: user?.displayName,
      teacherEmail: user?.email,
    };
    // console.log(formData);

    const addAssignment = await axiosSecure.post("/addAssignment", formData);
    console.log(addAssignment.data);
    if (addAssignment.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Assignment Added Successfully",
        icon: "success",
        confirmButtonText: "Okay",
      });
    }
    setShowModal(false);
  };
  async function fetchSubmissionCount() {
    try {
      const response = await axiosSecure.get(
        `/assignments/submissions-count/${classForAssignment?.title}`
      );
      const count = response.data.count;
      setSubmissionCount(count);
      console.log(count); // Accessing the count value
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  // Call the async function
  fetchSubmissionCount();

  async function fetchEnrollmentCount() {
    try {
      const response = await axiosSecure.get(
        `/totalEnrollment/${classForAssignment?.title}`
      );
      const enrollmentCount = response.data.count;
      setEnrollmentCount(enrollmentCount);
      console.log(enrollmentCount); // Accessing the count value
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  // Call the async function
  fetchEnrollmentCount();

  async function fetchAssignmentsCount() {
    try {
      const response = await axiosSecure.get(
        `/totalEnrollment/${classForAssignment?.title}`
      );
      const assignmentCount = response.data.count;
      setAssignmentCount(assignmentCount);
      console.log(assignmentCount); // Accessing the count value
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  // Call the async function
  fetchAssignmentsCount();
  console.log(enrollmentCount);
  console.log(submissionCount, assignmentCount);

  return (
    <div>
      <div>
        <h2 className="font-bold text-4xl text-center my-7">
          {" "}
          Class progress{" "}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-28 bg-blue-300">
            {" "}
            <h2 className="h-28 font-bold text-2xl flex justify-center items-center">
              Total enrollment:{enrollmentCount}{" "}
            </h2>
          </div>
          <div className="h-28 bg-purple-300  font-bold text-2xl flex justify-center items-center">
            Total assignment: {assignmentCount}{" "}
          </div>
          <div className="h-28 bg-red-300 font-bold text-2xl flex justify-center items-center">
            Today&apos;s Total Submission: {submissionCount}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-4xl text-center my-7">  Add Assignment </h2>
        <br />
        <div className="w-full font-semibold text-2xl text-center flex items-center  justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-300 w-fit "
          >
          Create {" "}
          </button>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Assignment </h3>

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
                <form onSubmit={handleAddAssignment}>
                  <div className="pl-4">
                    <div className="relative ">
                      <div className="flex flex-col gap-4 ">
                        <div className="relative w-full min-w-[200px]">
                          <label>Title:</label>{" "}
                          <input
                            className="border-black px-1 border-2 rounded "
                            name="title"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <div className="relative py-1 w-full min-w-[200px]">
                          <label>Deadline:</label>{" "}
                          <input
                            className="border-black px-1 border-2 rounded "
                            name="deadline"
                            type="date"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 ">
                        <div className="relative py-1 w-full min-w-[200px]">
                          <label>Description:</label>{" "}
                          <input
                            className="border-black px-1 border-2 rounded "
                            name="description"
                            required
                          />
                        </div>
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
    </div>
  );
};

export default MyClassDetails;
