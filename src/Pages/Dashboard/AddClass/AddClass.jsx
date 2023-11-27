import { useContext, useState } from "react";
import { AuthContext } from "../../../Firebase/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.displayName, user?.email, user?.photoURL);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const navigate = useNavigate()
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
        name: user?.displayName,
        photoURL: data.photoURL,
        title: data.title,
        price: data.price,
        description: data.description,
        status: "pending",
        image: res.data.data.display_url,
        email: user?.email,
      };
      //
      const addedClass = await axiosSecure.post("/pendingClasses", reqForm);
      console.log(addedClass);
      if (addedClass.data) {
        //show success popup
        reset();
        setIsButtonDisabled(true)
       navigate('/dashboard/myClass')
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

  const { register, handleSubmit, reset } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text"> Name*</span>
          </label>
          <input
            type="text"
            placeholder=" Your Name"
            {...register("name")}
            defaultValue={user?.displayName}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="email"
            name="email"
            disabled
            defaultValue={user?.email}
            className="input input-bordered"
            //   required
          />
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

        {/* price */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
            type="number"
            placeholder="Price"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* description */}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description </span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24"
            placeholder="Say something about the class"
          ></textarea>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Class Image*</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full max-w-xs"
          />
        </div>

        <button className="btn" disabled={isButtonDisabled}>
          Submit Class
        </button>

        {/*  
         {teacherData?.role === "student" && teacherData.status !== 'rejected' && (
           <button className="btn"
           disabled={isButtonDisabled}
           
           >
             Submit for review
           </button> */}

        {/* )  */}
        {/* } */}
      </form>
    </div>
  );
};

export default AddClass;
