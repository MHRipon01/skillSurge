import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Aos from "aos";





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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:my-4 my-5 ">
        
          {
            highlightedClasses.map((item, index) =>  <Card  data-aos="flip-down" key={item._id} sx={{ maxWidth: 510 , marginY:'20px' ,mx: 'auto' }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              
              image={item?.Image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item?.Title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
              Total Enrollment: {item?.TotalEnrollment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <p className="text-lg ">{item?.ShortDescription}</p>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"></Button>
              <Link to={`/singleClass/${item?._id}`}>  <Button  size="small">Details</Button> </Link>
             
            </CardActions>
          </Card>
        )
          }
             
        
      
        </div>
     </div>
        
    );
};

export default HighlightedClass;










































































{/* <div>
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
      
//     </div>
   
   
//   </div>)
//     }
       
  

//   </div>
// </div>
//    */}