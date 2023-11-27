import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useContext } from "react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const Register = () => {
    const axiosPublic= useAxiosPublic()
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then((result) => {
      // const loggedUser = result.user;
      // console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
      
       // create user entry in the database
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "student",
        img:data.photoURL
      }
     
     
      axiosPublic.post('/users' , userInfo)
      .then(res => {
        if(res.data.insertedId){
          console.log('user added to the db');
          //  reset();
          navigate('/')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your profile info updated",
            showConfirmButton: false,
            timer: 1000,
          });
         
        }   

      })
       .then(() => {
          console.log("user profile info updated");
      

        })
        .catch((error) => console.log(error));
    });
  };



    return (
        <div>
              <div>
      {/* <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet> */}
      <div className="hero min-h-screen bg-base-200 bg-[url('https://i.ibb.co/tpzYVg3/5153829.jpg')]">
        <div className="hero-content  flex-col lg:flex-row-reverse">
          <div className="text-center  lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            
          </div>
          <div className="card md:w-96 max-w-sm shadow-2xl bg-base-100">
            <form
             onSubmit={handleSubmit(onSubmit)}
             className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  name="name"
                  className="input input-bordered"
                  //   required
                />
                {errors.name && (
                  <span className="text-red-800">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                  //   required
                />
                {errors.photoURL && (
                  <span className="text-red-800">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  //   required
                />
                {errors.email && (
                  <span className="text-red-800">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                  //   required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <h3 className="px-6 ">
              Already have an account? <Link className="font-bold" to={"/login"}>Login </Link>{" "}
            </h3>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Register;