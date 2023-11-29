import { useContext } from "react";
import { AuthContext } from "../../../Firebase/AuthProvider";
import React from "react";
import Typography from "@mui/material/Typography";
import useAdmin from "../../../hooks/useAdmin";

const RoleHome = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = useAdmin();
  console.log(isAdmin);

  return (
    <div className="w-full text-center my-40">
      <Typography variant="h1">
        { isAdmin === true ? `Welcome, Admin ${user?.displayName}!` : `Hello, ${user?.displayName}!`}
      </Typography> 
    </div>
  );
};

export default RoleHome;

// function Greeting({ user }) {
//   return (

//   );
// }

// export default Greeting;
