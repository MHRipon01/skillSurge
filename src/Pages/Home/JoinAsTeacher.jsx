import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const JoinAsTeacher = () => {

  useEffect(() => {
    Aos.init({ 
      duration: 1200,  
    });
  }, []);




  return (
    <div>
      <div  data-aos="flip-down" className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.ibb.co/tmv0J0M/image.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Become an Instructor!</h1>
            <p className="py-6">
            Teaching is the profession that teaches all the other professions.
            </p>
            <Link to='/teachOnSkillSurge'>
             <button className="btn btn-primary">Start Teaching Today </button>
            </Link>
             </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsTeacher;
