import {
    FaAd,
    FaBook,
    FaCalendar,
    FaEnvelope,
    FaHome,
    FaList,
    FaSearch,
    FaShoppingCart,
    FaUsers,
    FaUtensils,
    
  } from "react-icons/fa";
  import { NavLink, Outlet } from "react-router-dom";
  import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import useStudent from "../hooks/useStudent";
  
  const Dashboard = () => {
    //TODO: get isAdmin value from the db
    const [isAdmin] = useAdmin()
    // console.log(isAdmin);
    const [isTeacher] = useTeacher()
  const [isStudent] = useStudent()
    return (
      <div className="lg:flex">
        {/*  dashboard side bar */}
        <div className="lg:w-64 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            {isAdmin &&
         
    <>
                <li>
                  <NavLink to="/">
                    <FaHome></FaHome> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUtensils></FaUtensils>
                 Users
                  </NavLink>
                </li>
  
                <li>
                  <NavLink to="/dashboard/teacherRequest">
                    <FaList></FaList>
                Teacher Request 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaBook></FaBook>
                   Profile 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allPendingClasses">
                    <FaUsers></FaUsers>
                    All Classes
                  </NavLink>
                </li>
              </>
            
            }
           {isTeacher &&
              <>
            <li>
              <NavLink to="/dashboard/teacherHome">
                <FaHome></FaHome> Teacher Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addClass">
                <FaCalendar></FaCalendar>Add Class 
              </NavLink>
            </li>
  
            <li>
              <NavLink to="/dashboard/myClass">
                <FaShoppingCart></FaShoppingCart> My Class  
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myEnrollClasses">
                <FaShoppingCart></FaShoppingCart> My Enrolled Class  
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/review">
                <FaAd></FaAd> Profile 
              </NavLink>
            </li>
            <li>
              <NavLink to="/ ">
                <FaList></FaList> Home Page 
              </NavLink>
            </li>
          </>
           } 
          

          {isStudent &&
              <>
            <li>
              <NavLink to="/dashboard/teacherHome">
                <FaHome></FaHome> Student Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myEnrollClasses">
                <FaCalendar></FaCalendar>My Enrolled Class 
              </NavLink>
            </li>
  
            
            <li>
              <NavLink to="/dashboard/review">
                <FaAd></FaAd> Profile 
              </NavLink>
            </li>
            <li>
              <NavLink to="/ ">
                <FaList></FaList> Home Page 
              </NavLink>
            </li>
          </>
           } 
        
          
         
            
            <div className="divider"></div>
        
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  