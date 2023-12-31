import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Feedback = () => {
const axiosSecure= useAxiosSecure()


  var settings = {
    dots: true,

    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
  };


  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get('/allReviews');
      console.log(res.data);
      return res.data;
    },
  });

console.log(reviews);






  return (
    <div className="lg:max-w-[900px] mx-auto bg-white rounded-lg  items-center">
      <div>
        <Slider {...settings}>
          <div className="lg:max-h-[300px] ">
            <h3 className="font-Caveat py-16 md:font-bold text-5xl text-green-950">
              <span className="text-7xl font-bold lg:text-5xl   "> “</span> {reviews[0]?.description}
              <span className="text-7xl font-bold lg:text-5xl">”</span>
              <div className=" justify-center w-full">
                <p className="justify-end flex w-full  -ml-10">-{reviews[0]?.reviewer}</p>
                <img
                  className="max-w-[70px]"
                  src={reviews[0]?.reviewerImg}
                  alt=""
                />

                <h2>Web development</h2>
              </div>
            </h3>
          </div>
          <div>
            <h2 className="font-Caveat py-16 md:font-bold text-5xl text-green-950">
              <span className="text-7xl font-bold lg:text-5xl   "> “</span>The hands-on projects and real-world applications solidified my understanding. Definitely worth every penny{" "}
              <span className="text-7xl font-bold lg:text-5xl">”</span>   <div className=" justify-center w-full">
                <p className="justify-end flex w-full  -ml-10">-Abir</p>
                <img
                  className="max-w-[70px]"
                  src="https://i.ibb.co/hLwB3n4/image.png"
                  alt=""
                />

                <h2>Motion Graphics</h2>
              </div>
            </h2>
          </div>

          <div className=" ">
            <h2 className="font-Caveat py-16 md:font-bold text-5xl text-green-950">
              {" "}
              <span className="text-7xl font-bold lg:text-5xl   "> “</span>This course exceeded my expectations! The depth of knowledge and practical exercises helped me grasp website development concepts effortlessly. ’{" "}
              <span className="text-7xl font-bold lg:text-5xl">”</span>
              <div className=" justify-center w-full">
                <p className="justify-end flex w-full  -ml-10">-Rayhan</p>
                <img
                  className="max-w-[70px]"
                  src="https://i.ibb.co/x6NbG0K/image.png"
                  alt=""
                />

                <h2>MERN Stack development</h2>
              </div>
            </h2>
          </div>

          <div className=" ">
            <h2 className="font-Caveat py-16 md:font-bold text-5xl text-green-950">
              <span className="text-7xl font-bold lg:text-5xl   "> “</span>Thank
              you for all your hard work and kindness! I do not know what I
              would have done without this service.{" "}
              <span className="text-7xl font-bold lg:text-5xl">”</span>   <div className=" justify-center w-full">
                <p className="justify-end flex w-full  -ml-10">-Rakib</p>
                <img
                  className="max-w-[70px]"
                  src="https://i.ibb.co/xHCtCZc/image.png"
                  alt=""
                />

                <h2>Web development</h2>
              </div>
            </h2>
          </div>
        
        </Slider>
<div className="flex w-full justify-center items-center ">

<button className="px-4 py-3 my-10 font-semibold bg-blue-200 tooltip tooltip-bottom" data-tip="Link is under Construction.">See All Reviews</button>

</div>
      </div>
    </div>
  );
};

export default Feedback;
