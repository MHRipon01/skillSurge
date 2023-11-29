import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  


  
  const [allClasses, setAllClasses] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize =10; // Number of items per page







  // useEffect(() => {
  //   const fetchAllClasses = async () => {
  //     try {
  //       const response = await axiosPublic.get("/all-class");
  //       console.log(response.data);
  //       setAllClasses(response.data);
  //     } catch (error) {
  //       console.error("Error fetching highlighted classes:", error);
  //     }
  //   };

  //   fetchAllClasses();
  // }, [axiosPublic]);


  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await axiosPublic.get(`/all-class?page=${page}&pageSize=${pageSize}`);
        console.log(response.data);
        setAllClasses(response.data); 
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchAllClasses();
  }, [axiosPublic, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };







  return (
    <div>
      <div className="grid  grid-cols-1   md:grid-cols-3  ">
        {/* {allClasses?.map((item) => (
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
      ))} */}

        {/* {allClasses?.map((item) => (
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
      ))} */}

        {allClasses?.data?.map((item, index) => (
          <Card key={item._id} sx={{ maxWidth: 410, marginY: "20px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item?.Image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item?.Title}
              </Typography>
              <div className="flex gap-3 items-center">
                <img
                  className="max-w-[50px] rounded-lg"
                  src={item?.teacherImg}
                  alt=""
                />

                <h3 className="md:pt-2 text-xl">{item?.Teacher}</h3>
              </div>
              <Typography variant="body3" color="text.secondary">
                {item?.ShortDescription}
              </Typography>

              <Typography gutterBottom variant="h6" component="div">
                Price: ${item?.Price}{" "}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                Total Enrollment:{item?.TotalEnrollment}{" "}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {item?.Title}
              </Typography>
            </CardContent>
            <CardActions>
              {" "}
              <Link
                to={`/singleClass/${item._id}`}
                className="flex w-full  justify-center"
              >
                <button className=" w-fit px-3 py-2 bg-blue-100 hover:bg-purple-400 hover:text-white rounded-lg my-5 ">
                  Enroll
                </button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
      
      <div className="text-center   flex items-center justify-end my-5   mr-12 ">

        <Pagination count={10}  page={page}
          onChange={handlePageChange}
           variant="outlined" shape="rounded" />
      </div>
    </div>
  );
};

export default AllClasses;
