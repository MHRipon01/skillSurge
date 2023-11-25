import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SingleClass = () => {
const axiosPublic = useAxiosPublic()
    const {id} = useParams()
    const [singleClass , setSingleClass] = useState()

    useEffect(() => {
        const fetchSingleClass = async () => {
          try {
            const response = await axiosPublic.get(`/singleClass/${id}`);
            console.log(response.data);
            setSingleClass(response.data)
            console.log(singleClass);
          } catch (error) {
            console.log("line 31", error); 
          }
        };
        fetchSingleClass()
      }, [axiosPublic]);
    
// useEffect( ()=>{
//      console.log(singleClass) ,[]

// })
   
    return (
        <div>
           <div>
            <div
              className="relative h-full  flex md:my-5 my-2 flex-col  md:mx-2     mx-2  text-gray-700
             bg-white shadow-md   rounded-lg bg-clip-border"
            >
              <div className="relative mx-4 mt-4  text-gray-700 bg-white shadow-lg  rounded-xl bg-clip-border w-full">
                <img className="  justify-center  flex items-center" src={singleClass?.Image}  alt="" />
              </div>
              <div className="p-6 ">
                <h4 className="block mb-2 font-sans md:text-xl lg:text-2xl  antialiased  font-semibold  leading-snug tracking-normal text-blue-gray-900">
                  {singleClass?.Title}
                </h4>
                <div className="flex gap-3 items-center text-center">
                  <img
                    className="max-w-[50px] rounded-lg"
                    src={singleClass?.teacherImg}
                    alt=""
                  />

                  <h3 className="md:pt-2 text-xl">{singleClass?.Teacher}</h3>
                </div>
                <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text"></p>
                <h3 className="text-xl text-red-500 py-3 ">
                  {" "}
                  Price: ${singleClass?.Price}{" "}
                </h3>

                <p className="font-semibold text-lg">
                  {singleClass?.ShortDescription}
                </p>
                <p className="text-lg   ">
                  Total Enrollment:{singleClass?.TotalEnrollment}{" "}
                </p>

                <Link
                  to={`/payment/${singleClass?._id}`}
                  className="flex w-full  justify-center"
                >
                  <button className=" w-fit px-5 text-2xl font-bold py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">
                    Pay
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
};

export default SingleClass;