import  { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Firebase/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyClass = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: myPendingClasses = [], refetch } = useQuery({
    queryKey: ["myPendingClasses" , user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myPendingClasses/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
    console.log(myPendingClasses);

  const handleDeleteUser = (item) => {
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
        console.log(item._id);
        axiosSecure.delete(`/deleteClass/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your class has been deleted.",
              icon: "success",
            });
            axiosSecure
              .delete(`/deleteFromAllClass/${item._id}`)
              .then((res) => {
                console.log(res);
              });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="grid  grid-cols-1   md:grid-cols-3  ">
        {myPendingClasses?.map((item) => (
          <div key={item._id} className="">
            <div>
              <div
                className="relative h-full  flex md:my-5 my-2 flex-col  md:mx-2  md:h-[550px]   mx-2  text-gray-700
             bg-white shadow-md   rounded-lg bg-clip-border"
              >
                <div className="relative mx-4 mt-4  h-full  text-gray-700 bg-white shadow-lg lg:h-60 rounded-xl bg-clip-border ">
                  <img
                    className="max-h-[280px] w-[440px] h-fit "
                    src={item?.image}
                    alt=""
                  />
                </div>
                <div className="p-6 ">
                  <h4 className="block mb-2 font-sans md:text-xl lg:text-2xl  antialiased  font-semibold  leading-snug tracking-normal text-blue-gray-900">
                    {item?.title}
                  </h4>
                  <div className=" gap-3 items-center">
                    <h3 className="md:pt-2 text-xl">{user?.displayName}</h3>
                    <h3 className="md:pt-2 text-xl">{user?.email}</h3>
                  </div>
                  <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text"></p>
                  <h3 className="text-xl text-red-500 py-3 ">
                    {" "}
                    Price: ${item?.price}{" "}
                  </h3>

                  <p className="font-semibold text-lg">{item?.description}</p>
                  <p className="text-lg   ">Status: {item?.status} </p>

                  <div className="flex w-full gap-3 justify-center">
                    <Link to={`/dashboard/updateClass/${item._id}`}>
                      <button className=" w-fit px-3 py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">
                        Update
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDeleteUser(item)}
                      className=" w-fit px-3 py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 "
                    >
                      Delete
                    </button>
                    <Link to={`/dashboard/myClassDetails/${item._id}`}>
                      <button
                        className=" w-fit px-3 py-2 bg-blue-100  rounded-lg my-5 "
                        disabled={item?.status !== "accepted"}
                      >
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
