import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const axiosSecure = useAxiosSecure();
  // const [userProfile , setUserProfile] = useState()

  // useEffect(() => {

  //     const fetchProfile = async () => {
  //       try {
  //         const response = await axiosSecure.get(`/users/${user?.email}`);
  //         console.log(response.data);
  //         setUserProfile(response.data)

  //       } catch (error) {
  //         console.log("line 19", error);
  //       }
  //     };
  //     fetchProfile()
  //   }, [axiosSecure,user?.email]);

  // const {name} = userProfile
  // console.log(name);

  const {
    data: userProfile = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    enabled: !!user?.email, // Enable the query if user.email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log("userProfile: ", userProfile);
  console.log("isLoading: ", isLoading);
  console.log("error: ", error);

  // const {name} = userProfile
  // console.log(name);

  console.log(userProfile);

  return (
    <div>
      prof
      {/* <div>
          <h2>{userProfile?.name} </h2>
      <h3> Role: {userProfile?.role}</h3>
      <div className="w-32">
        <img src={user?.photoURL} alt="" />
      </div>
      <h3>Email: {user?.email} </h3>
      <p>{userProfile?.phone}</p>
      <div>
      </div> */}
    
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-72 w-full object-cover md:w-72"
                src={user?.photoURL}
                alt="User profile"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Role: {userProfile?.role}
              </div>
              <p className="mt-4 text-2xl font-bold">
                Name:{userProfile?.name}
              </p>
              <p className="mt-2 text-gray-600">Email:{user?.email}</p>
              <p className="mt-2 text-gray-600">{userProfile?.phone}</p>
              {/* Add additional profile information as needed */}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Profile;
