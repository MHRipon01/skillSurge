import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Banner = () => {
  var settings = {
    dots: true,

    autoplay: true,
    speed: 2000,
    autoplaySpeed: 300,
    arrows:false
  };

  return (
    <div className="">
      <Slider {...settings}>
        <div className="lg:max-h-[300px] ">
          <img className=" h-[70vh] w-full  " 
            src="https://i.ibb.co/vVX7Kgx/image.png"
            alt=""
          />
        </div>
        <div >
          <img className=" h-[70vh] w-full  "  src="https://i.ibb.co/SykSDzs/image.png" alt="" />
        </div>
        <div>
          <img className=" h-[70vh] w-full   "  src="https://i.ibb.co/N3TwSxY/image.png" alt="" />
        </div>
        <div className=" ">
          <img  className=" h-[70vh] w-full  " src="https://i.ibb.co/KFJ3n3L/image.png" alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
