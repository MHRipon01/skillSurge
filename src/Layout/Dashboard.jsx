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
import { GiFaceToFace } from "react-icons/gi";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';




  const Dashboard = () => {
    //TODO: get isAdmin value from the db
    const [isAdmin] = useAdmin()
    // console.log(isAdmin);
    const [isTeacher] = useTeacher()
  const [isStudent] = useStudent()
    return (
      <div className="lg:flex">
        {/*  dashboard side bar */}
        <div className="lg:w-64 min-h-screen bg-blue-300">
          <ul className="menu p-4">
            {isAdmin &&
         
    <>
                <li>
                  <NavLink to="/">
                  <HomeIcon></HomeIcon>  Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                   <GroupIcon></GroupIcon>
                 Users
                  </NavLink>
                </li>
  
                <li>
                  <NavLink to="/dashboard/teacherRequest">
                  <SchoolIcon></SchoolIcon>
                Teacher Request 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                  <ManageAccountsIcon></ManageAccountsIcon>
                   Profile 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allPendingClasses">
                    <ClassIcon></ClassIcon>
                    All Classes
                  </NavLink>
                </li>
              </>
            
            }
           {isTeacher &&
              <>
            <li>
              <NavLink to="/">
                 <HomeIcon></HomeIcon> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addClass">
                <AddTaskIcon></AddTaskIcon> Add Class 
              </NavLink>
            </li>
  
            <li>
              <NavLink to="/dashboard/myClass">
             <MilitaryTechIcon></MilitaryTechIcon>
                 My Class  
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myEnrollClasses">
                <SubscriptionsIcon></SubscriptionsIcon> My Enrolled Class  
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/profile">
                <ManageAccountsIcon></ManageAccountsIcon> Profile 
              </NavLink>
            </li>
           
          </>
           } 
          

          {isStudent &&
              <>
            <li>
              <NavLink to="/">
              <HomeIcon></HomeIcon> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myEnrollClasses">
              <SubscriptionsIcon></SubscriptionsIcon> My Enrolled Class 
              </NavLink>
            </li>
  
            
            <li>
              <NavLink to="/dashboard/profile">
              <ManageAccountsIcon></ManageAccountsIcon> Profile 
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
  