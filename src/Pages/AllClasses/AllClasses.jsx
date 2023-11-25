import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [allClasses, setAllClasses] = useState();

  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await axiosPublic.get("/all-class");
        console.log(response.data);
        setAllClasses(response.data);
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchAllClasses();
  }, [axiosPublic]);

//   useEffect(() => {
//     const fetchSingleClass = async () => {
//       try {
//         const response = await axiosPublic.get("/singleClass/:id");
//         console.log(response.data);
//       } catch (error) {
//         console.log("line 31", error); 
//       }
//     };
//     fetchSingleClass()
//   }, [axiosPublic]);

  return (
    <div className="grid  grid-cols-1   md:grid-cols-3  ">
      {allClasses?.map((item) => (
        <div key={item._id} className="">
          <div>
            <div
              className="relative h-full  flex md:my-5 my-2 flex-col  md:mx-2  md:h-[550px]   mx-2  text-gray-700
             bg-white shadow-md   rounded-lg bg-clip-border"
            >
              <div className="relative mx-4 mt-4  text-gray-700 bg-white shadow-lg lg:h-60 rounded-xl bg-clip-border ">
                <img src={item?.Image} alt="" />
              </div>
              <div className="p-6 ">
                <h4 className="block mb-2 font-sans md:text-xl lg:text-2xl  antialiased  font-semibold  leading-snug tracking-normal text-blue-gray-900">
                  {item?.Title}
                </h4>
                <div className="flex gap-3 items-center">
                  <img
                    className="max-w-[50px] rounded-lg"
                    src={item?.teacherImg}
                    alt=""
                  />

                  <h3 className="md:pt-2 text-xl">{item?.Teacher}</h3>
                </div>
                <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text"></p>
                <h3 className="text-xl text-red-500 py-3 ">
                  {" "}
                  Price: ${item?.Price}{" "}
                </h3>

                <p className="font-semibold text-lg">
                  {item?.ShortDescription}
                </p>
                <p className="text-lg   ">
                  Total Enrollment:{item?.TotalEnrollment}{" "}
                </p>

                <Link
                  to={`/singleClass/${item._id}`}
                  className="flex w-full  justify-center"
                >
                  <button className=" w-fit px-3 py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">
                    Enroll
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllClasses;
