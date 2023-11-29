import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const TotalStatistics = () => {

  const axiosPublic = useAxiosPublic()
  const [totalUserCount , setTotalUserCount] = useState()
  const [totalClassCount , setTotalClassCount] = useState()
  const [totalEnrollmentCount , setTotalEnrollmentCount] = useState()

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axiosPublic.get('/users/count');
        console.log(response.data.count);
        setTotalUserCount(response.data.count); 
        // console.log(totalUserCount);
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchAllUsers();
  }, [axiosPublic , totalUserCount]);

  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await axiosPublic.get('/classes/count');
        console.log(response.data.count);
        setTotalClassCount(response.data.count); 
        // console.log(totalUserCount);
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchAllClasses();
  }, [axiosPublic , ]);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const response = await axiosPublic.get('/enrollments/count');
        console.log(response.data.count);
        setTotalEnrollmentCount(response.data.count); 
        console.log();
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchEnrolledClasses();
  }, [axiosPublic , ]);


    return (
        <div>
            <div className="stats shadow  py-16 pt-10 mx-auto w-full">
  
  <div data-aos="zoom-in" className="stat place-items-center  ">
    <div className="stat-title">Total User</div>
    <div className="stat-value">{totalUserCount}</div>
    
  </div>
  
  <div data-aos="zoom-in-up" className="stat place-items-center">
    <div className="stat-title">Total Classes</div>
    <div className="stat-value text-secondary">{totalClassCount}</div>
    
  </div>
  
  <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="stat place-items-center">
    <div className="stat-title">Total Enrollment </div>
    <div className="stat-value">{totalEnrollmentCount}</div>
    
  </div>
  
</div>
        </div>
    );
};

export default TotalStatistics;