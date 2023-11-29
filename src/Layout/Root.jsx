import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";

import ResponsiveAppBar from "../Components/MUINavbar/ResponsiveAppBar";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto overflow-x-hidden">
      {/* <Navbar></Navbar> */}
      <ResponsiveAppBar></ResponsiveAppBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
