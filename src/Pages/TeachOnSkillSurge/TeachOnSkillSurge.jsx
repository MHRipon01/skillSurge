import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TeachOnSkillSurge = () => {
  const { user } = useContext(AuthContext);
  const [teacherData, setTeacherData] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  console.log(user);



  
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      //now send the menu item data to the server with the image url
      const reqForm = {
        name: data.name,
        photoURL: data.photoURL,
        category: data.category,
        experience: data.experience,
        title: data.title,
        role: "teacher",
        status: "pending",
        image: res.data.data.display_url,
        email: user?.email,
      };
      //
      const teacherRes = await axiosSecure.post("/teacherRequest", reqForm);
      console.log(teacherRes.data.reqResult.insertedId);
      if (teacherRes.data.reqResult.insertedId) {
        //show success popup
        reset();
        //disable button here
        setIsButtonDisabled(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your request has been sent to the admin`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
    console.log("with image url", res.data);
  };

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axiosPublic.get(`/beTeacher/${user?.email}`);
        console.log(response.data);
        setTeacherData(response.data);
        console.log();
      } catch (error) {
        console.error("Error fetching highlighted classes:", error);
      }
    };

    fetchTeacherData();
  }, [axiosPublic, user?.email]);

  console.log(teacherData);



  return (





    <div>
 {  
        teacherData?.role === 'teacher' && <>
        <div className=" w-full h-96 flex justify-center rounded-xl items-center bg-gradient-to-r from-blue-50 via-emerald-50 to-purple-50">
             <h2 className="text-4xl font-bold    text-center ">
        You are already a founder of the society. Keep brightening the youth!

        </h2> 
        </div>
      
        </>
    
        }

        {
           teacherData?.role === 'student' &&
           <form onSubmit={handleSubmit(onSubmit)}>
         <div className="form-control w-full my-6">
           <label className="label">
             <span className="label-text"> Name*</span>
           </label>
           <input
             type="text"
             placeholder=" Name"
             {...register("name", { required: true })}
             required
             className="input input-bordered w-full"
           />
         </div>
        
         <div className="flex gap-6">
           {/* category */}
           <div className="form-control w-full my-6">
             <label className="label">
               <span className="label-text">Category*</span>
             </label>
             <select
               defaultValue="default"
               {...register("category", { required: true })}
               className="select select-bordered w-full"
             >
               <option disabled value="default">
                 Select a category
               </option>
               <option value="Web Development">Web Development </option>
               <option value="Digital marketing">Digital marketing</option>
               <option value="Graphics Design">Graphics Design </option>
               <option value="UI/UX Design ">UI/UX Design </option>
               <option value="Front-End Development with React">
                 Front-End Development with React
               </option>
             </select>
           </div>
           <div className="form-control w-full my-6">
             <label className="label">
               <span className="label-text">Experience*</span>
             </label>
             <select
               defaultValue="default"
               {...register("experience", { required: true })}
               className="select select-bordered w-full"
             >
               <option disabled value="default">
                 Select a category
               </option>
               <option value="beginner">Beginner</option>
               <option value="moderate">Moderate</option>
               <option value="experienced">Experienced </option>
             </select>
           </div>
         </div>
         {/* title */}
         <div className="form-control w-full my-6">
           <label className="label">
             <span className="label-text">Title*</span>
           </label>
           <input
             type="text"
             placeholder="Title"
             {...register("title", { required: true })}
             className="input input-bordered w-full"
           />
         </div>
 
         <div className="form-control w-full my-6">
           <label className="label">
             <span className="label-text">Your Image*</span>
           </label>
           <input
             {...register("image", { required: true })}
             type="file"
             className="file-input w-full max-w-xs"
           />
         </div>
        
         {teacherData?.status === "rejected" && (
           <button className="btn" >
             Request again
           </button>
          
         ) 
         }
         {teacherData?.role === "student" && teacherData.status !== 'rejected' && (
           <button className="btn"
           disabled={isButtonDisabled}
           
           >
             Submit for review
           </button>
          
         ) 
         }
 
 
       
       </form>
        }

{
  teacherData?.role === 'admin' &&
  <>
  <div className=" w-full h-96 flex justify-center rounded-xl items-center bg-gradient-to-r from-blue-50 via-emerald-50 to-purple-50">
             <h2 className="text-4xl font-bold    text-center ">
       You&apos;re an admin. No need to change your role! 

        </h2> 
        </div>
  <div>
    <h2></h2>
  </div>
  </>
}





    
    </div>
  );
};

export default TeachOnSkillSurge;
