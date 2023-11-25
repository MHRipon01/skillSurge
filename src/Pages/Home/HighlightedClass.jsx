import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const HighlightedClass = () => {
  const axiosPublic = useAxiosPublic()
  const [highlightedClasses, setHighlightedClasses] = useState([]);

  useEffect(() => {
    const fetchHighlightedClasses = async () => {
      try {
        const response = await axiosPublic.get('/highlightedClasses');
        console.log(response.data);
        setHighlightedClasses(response.data); 
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchHighlightedClasses();
  }, [axiosPublic]);


    return (
     <div>
      <h3 className=" mt-9 text-4xl font-bold">Most Enrolled Classes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:my-4  ">
          
          {
            highlightedClasses.map((item, index) => <div key={index}
          className="relative h-full  flex   flex-col  md:mx-2  md:my-3   mx-2 my-3  text-gray-700   border-2 border-blue-600
             bg-white shadow-md    rounded-lg bg-clip-border"
        >
          <div className="relative mx-4 mt-4   text-gray-700 bg-white shadow-lg   rounded-xl bg-clip-border ">
            <img src={item?.Image} alt="profile-picture" />
          </div>
          <div className="p-6 ">
            <h4 className="block mb-2 font-sans md:text-xl lg:text-2xl  antialiased  font-semibold  leading-snug tracking-normal text-blue-gray-900">
              {item?.Title}
            </h4>
           <p>Total Enrollment: {item?.TotalEnrollment}</p>
         
            <p className="text-lg ">{item?.ShortDescription}</p>
            {/* <Link to={`/singleFood/${_id}`} className="flex w-full  justify-center">
            <button className=" w-fit px-3 py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 " >View Details</button>
            </Link> */}
            
          </div>
         
         
        </div>)
          }
             
        
      
        </div>
     </div>
        
    );
};

export default HighlightedClass;