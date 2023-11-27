import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Firebase/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';




const UpdateClass = () => {
    const {id} = useParams()
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
  
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    console.log(user?.displayName, user?.email, user?.photoURL);
     
    const { data: myClass = [], refetch } = useQuery({
      queryKey: ["myClass"],
      queryFn: async () => {
        console.log(id);
        const res = await axiosSecure.get(`/myPendingClass/${id}`);
        console.log(res.data);
        return res.data;
      },
    });
// console.log(myClass);






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
            title: data.title,
            price: data.price,
            description: data.description,
            // status: "pending",
            image: res.data.data.display_url,
            email: user?.email,
          };
          console.log(reqForm);
          const addedClass = await axiosSecure.patch(`/updateClass/${id}`, reqForm)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Class updated`,
                showConfirmButton: false,
                timer: 1000,
              });
            }

            axiosSecure.patch(`/updateClassInAllClasses/${id}` , reqForm)



          });
        }
        console.log("with image url", res.data);
      };


    return (
        <div>
            <h2>{id}</h2>

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
            defaultValue={myClass?.title}
            {...register("title")}
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
            defaultValue={myClass?.price}
            {...register("price")}
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
            defaultValue={myClass?.description}
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

        <button className="btn" >
          Update Class
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

export default UpdateClass;